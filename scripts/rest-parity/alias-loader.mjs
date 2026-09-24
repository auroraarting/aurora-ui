// Resolves Next.js-style imports outside Next, so the service modules can be
// imported by the parity scripts: the "@/…" path alias, and the
// extension-less relative specifiers Next allows but plain Node does not.
import { existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), "../../src");

/** First of base, base.js, base/index.js that exists. @param {string} base */
const firstExisting = (base) =>
	[base, `${base}.js`, `${base}/index.js`].find((path) => existsSync(path));

/** Node resolve hook. @param {string} specifier @param {any} context @param {Function} next */
export async function resolve(specifier, context, next) {
	if (specifier.startsWith("@/")) {
		const hit = firstExisting(resolvePath(root, specifier.slice(2)));
		if (hit) return next(pathToFileURL(hit).href, context);
	}
	if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
		const from = dirname(fileURLToPath(context.parentURL));
		const hit = firstExisting(resolvePath(from, specifier));
		if (hit) return next(pathToFileURL(hit).href, context);
	}
	return next(specifier, context);
}
