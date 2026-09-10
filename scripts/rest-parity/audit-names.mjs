// Checks that every ACF field name shapeAcf produces is a name the app
// actually reads. An unmatched name is a field the sections cannot see —
// the class of bug that hid `financingMA`, `fourStepProcess` and the
// blank-named `insights` group.
//
//   npm run rest:audit
//
// It samples live REST responses, so it stays honest as the CMS changes.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { srcDir, importService } from "./paths.mjs";

const { shapeAcf } = await importService("rest/shape.js");

/** Post types worth sampling — every one with an ACF group behind a page. */
const endpoints = [
	"services", "whoareyou", "howwehelp", "products", "softwares", "country",
	"event", "podcast", "video", "team", "offices", "early-career", "program",
	"pages", "posts", "testimonial", "clients-logo", "post-author", "post-speaker",
];

/** Keys mediaNode introduces; ours, not CMS field names. */
const ourKeys = new Set([
	"node", "altText", "mediaItemUrl", "title", "caption", "mimeType",
]);

/** Every identifier-like token in the app's source. @param {string} dir @param {string[]} out */
function readAll(dir, out = []) {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) readAll(path, out);
		else if (/\.(js|jsx)$/.test(entry)) out.push(readFileSync(path, "utf8"));
	}
	return out;
}
const known = new Set(readAll(srcDir).join("\n").match(/[A-Za-z_$][A-Za-z0-9_$]*/g) || []);

const seen = new Map();
/** @param {any} value @param {string} endpoint */
function walk(value, endpoint) {
	if (Array.isArray(value)) return value.forEach((item) => walk(item, endpoint));
	if (!value || typeof value !== "object") return;
	for (const [key, nested] of Object.entries(value)) {
		if (!ourKeys.has(key)) {
			if (!seen.has(key)) seen.set(key, new Set());
			seen.get(key).add(endpoint);
		}
		walk(nested, endpoint);
	}
}

const base = process.env.REST_API_URL;
if (!base) throw new Error("REST_API_URL is not set — run with --env-file=.env.local");

for (const endpoint of endpoints) {
	let posts;
	try {
		const res = await fetch(`${base}/${endpoint}?per_page=3&_fields=slug,acf`);
		if (!res.ok) {
			console.warn(`  skipped ${endpoint}: ${res.status}`);
			continue;
		}
		posts = await res.json();
	} catch (error) {
		console.warn(`  skipped ${endpoint}: ${error.message}`);
		continue;
	}
	for (const post of Array.isArray(posts) ? posts : [posts]) {
		if (post?.acf && typeof post.acf === "object") walk(shapeAcf(post.acf), endpoint);
	}
}

const unreachable = [...seen.entries()].filter(([name]) => !known.has(name)).sort();
console.log(`\nshaped ACF names checked: ${seen.size}`);
console.log(`names the app never reads: ${unreachable.length}`);
for (const [name, origins] of unreachable) {
	console.log(`  ${name.padEnd(30)} <- ${[...origins].join(", ")}`);
}
console.log(
	unreachable.length
		? "\nEach line is either an unused CMS field or a name shape.js should map —\n" +
			"check whether the sections read a different name for the same content."
		: "\nEvery shaped field name is read somewhere in src/.",
);
