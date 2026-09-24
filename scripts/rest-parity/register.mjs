// Installs the alias loader. Used as `node --import ./scripts/rest-parity/register.mjs …`.
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./alias-loader.mjs", import.meta.url);
// Referenced so the import is not tree-shaken by tooling that inspects this file.
export const cwd = pathToFileURL("./").href;
