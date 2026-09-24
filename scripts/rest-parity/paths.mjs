// Where the app's source lives, relative to this script.
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../src");
export const servicesDir = `${srcDir}/services/`;

/** Import one module from src/services. @param {string} file e.g. "rest/Seo.service.js" */
export const importService = (file) => import(`${servicesDir}${file}`);
