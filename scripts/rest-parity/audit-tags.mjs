/* eslint-env node */
/* global globalThis */
// Cache tags on every fetch the REST services make.
//
//   npm run rest:tags          static — reads the sources, no network
//   npm run rest:tags -- --live  also calls each service and captures real tags
//
// Tags are the only thing that makes content refresh: a fetch with a missing or
// unmapped tag is a page that silently goes stale forever. A parity run cannot
// see that, because it only compares data.
//
// The static pass is the one to run habitually — it is instant and touches
// nothing. The live pass is for confirming the wrapper assembles what the
// call sites intend.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { importService, servicesDir } from "./paths.mjs";

const { contentTags, everyContentTag, tagsFor } = await importService(
	"rest/tags.js",
);
const mapped = new Set(Object.keys(contentTags));
const canonical = new Set(everyContentTag);

/* ------------------------------------------------------------------ static */

const restDir = join(servicesDir, "rest");
const files = [
	...readdirSync(restDir)
		.filter((f) => f.endsWith(".js"))
		.map((f) => ({ name: `rest/${f}`, src: readFileSync(join(restDir, f), "utf8") })),
	{ name: "Rest.service.js", src: readFileSync(join(servicesDir, "Rest.service.js"), "utf8") },
];

/** Strip block comments and line comments so doc examples are not mistaken for
 *  code. @param {string} src */
const decomment = (src) =>
	src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
		.replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + " ".repeat(m.length - p.length));

const helpers = ["RESTAPI", "restAll", "restByIds", "restRequest"];
const findings = [];

for (const { name, src } of files) {
	// The wrapper itself forwards its caller's options; nothing to check.
	if (name === "Rest.service.js") continue;
	const clean = decomment(src);
	const lines = clean.split("\n");

	for (let i = 0; i < lines.length; i++) {
		for (const helper of helpers) {
			if (!new RegExp(String.raw`(?<![\w.])${helper}\s*\(`).test(lines[i])) continue;

			// The call's text, to the balanced close paren.
			let depth = 0;
			let started = false;
			const chunk = [];
			for (let j = i; j < Math.min(i + 24, lines.length); j++) {
				chunk.push(lines[j]);
				for (const ch of lines[j]) {
					if (ch === "(") {
						depth++;
						started = true;
					} else if (ch === ")") depth--;
				}
				if (started && depth <= 0) break;
			}
			const text = chunk.join("\n");
			const at = `${name}:${i + 1}`;

			// Options may be written long-hand (`apiID: "posts"`), as a
			// shorthand property (`{ apiID }`, where the value came from a
			// config object), or spread in from the caller. All three count.
			// Template interpolations are stripped first: `?slug=${slug}` would
			// otherwise look exactly like a shorthand `{ slug }` property and
			// mask a fetch that never names its item.
			const opts = text.replace(/\$\{[^}]*\}/g, "");
			/** @param {string} key */
			const names = (key) =>
				new RegExp(String.raw`(^|[\s,{])${key}\s*[,:}]`).test(opts);

			const literal = /apiID:\s*"([^"]+)"/.exec(text);
			const dynamic = /apiID:\s*([a-zA-Z_$][\w$]*)/.exec(text) || names("apiID");
			const explicit = names("tags");
			const forwarded = /\.\.\.(rest|dataObj|options)\b/.test(text);

			if (literal && !mapped.has(literal[1])) {
				findings.push([at, `apiID "${literal[1]}" is not in contentTags — it will never match a webhook`]);
			}
			if (!literal && !dynamic && !explicit && !forwarded) {
				findings.push([at, "no apiID and no tags — this fetch can never be revalidated"]);
			}

			// A single-item read should name the item.
			const single = /\?slug=\$\{|&slug=\$\{/.test(text);
			const namesSlug = names("slug") || names("slugs");
			if (single && !namesSlug && !explicit) {
				findings.push([at, "reads one item by slug but passes no `slug`, so it gets only a collection tag"]);
			}

			// A by-id read should name the ids (restByIds does this centrally).
			const byId = /\?include=\$\{|&include=\$\{/.test(text);
			const namesIds = names("ids");
			if (byId && !namesIds && !explicit && !/restByIds/.test(text)) {
				findings.push([at, "reads items by id but passes no `ids`, so it gets only a collection tag"]);
			}
		}
	}
}

console.log(`static: ${files.length - 1} service files scanned`);
if (findings.length) {
	console.log(`\n${findings.length} problem(s):`);
	for (const [at, why] of findings) console.log(`  !! ${at}  ${why}`);
} else {
	console.log("static: every call site names a mapped content type or explicit tags");
}

/* --------------------------------------------------------------- vocabulary */

console.log(`\ncontent tags (${everyContentTag.length}): ${everyContentTag.join(", ")}`);
console.log("\nshapes a fetch can carry:");
for (const [label, opts] of [
	["collection", { apiID: "posts" }],
	["item by slug", { apiID: "services", slug: "advisory" }],
	["item by id", { apiID: "clients-logo", ids: [1092, 1213] }],
	["several collections", { apiID: "country", tags: ["region"] }],
]) {
	console.log(`  ${label.padEnd(20)} ${JSON.stringify(tagsFor(opts))}`);
}

/* -------------------------------------------------------------------- live */

if (!process.argv.includes("--live")) {
	console.log("\n(pass --live to also call every service and capture real tags)");
	process.exitCode = findings.length ? 1 : 0;
} else {
	const { liveCalls } = await import("./tag-live-calls.mjs");
	const seen = new Map();
	const realFetch = globalThis.fetch;
	let current = "";
	globalThis.fetch = async (url, options) => {
		const base = process.env.REST_API_URL || "";
		const short = String(url)
			.replace(base + "/", "")
			.replace(base.replace(/\/wp\/v2\/?$/, "") + "/", "");
		const [path, query = ""] = short.split("?");
		const keep = query
			.split("&")
			.filter((p) => /^(slug|include|categories|status|wpml_language)=/.test(p))
			.map((p) => (p.length > 44 ? p.slice(0, 44) + "…" : p))
			.join("&");
		const key = `${path}${keep ? "?" + keep : ""}`;
		if (!seen.has(key)) seen.set(key, { tags: new Set(), from: new Set() });
		for (const t of options?.next?.tags || []) seen.get(key).tags.add(t);
		seen.get(key).from.add(current);
		return realFetch(url, options);
	};

	for (const [module, fns] of liveCalls) {
		const mod = await importService(module);
		for (const [fn, args] of fns) {
			current = `${module.replace("rest/", "").replace(".service.js", "")}.${fn}`;
			if (typeof mod[fn] !== "function") {
				console.error(`  !! ${current} is not exported`);
				continue;
			}
			try {
				await mod[fn](...args);
			} catch (error) {
				console.error(`  !! ${current} threw: ${error?.message || error}`);
			}
		}
	}

	console.log(`\nlive: ${seen.size} distinct fetches`);
	let bad = 0;
	for (const [key, { tags, from }] of [...seen].sort(([a], [b]) => a.localeCompare(b))) {
		const list = [...tags].sort();
		const healthy = list.some((t) => canonical.has(t.split(/[:#]/)[0]));
		if (!healthy) bad++;
		console.log(`${healthy ? "ok" : "!!"} ${key}`);
		console.log(`     tags: ${list.join(", ") || "(none)"}`);
		console.log(`     from: ${[...from].join(", ")}`);
	}
	console.log(`\nlive: ${seen.size - bad}/${seen.size} fetches carry a canonical tag`);
	process.exitCode = findings.length || bad ? 1 : 0;
}
