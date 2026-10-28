import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import jsdoc from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
	{ ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"] },
	...nextCoreWebVitals,
	js.configs.recommended,
	react.configs.flat.recommended,
	...tseslint.configs.recommended,
	react.configs.flat["jsx-runtime"],
	{
		plugins: { jsdoc },
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			indent: ["error", "tab"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "variable",
					format: ["camelCase", "PascalCase"],
				},
				{
					selector: "function",
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
				},
			],
			"react/prop-types": ["off"],
			"react/jsx-max-props-per-line": [
				"error",
				{ maximum: 1, when: "multiline" },
			],
			"no-multiple-empty-lines": ["error", { max: 1 }],
			"jsdoc/require-jsdoc": [
				"error",
				{
					require: {
						FunctionDeclaration: true,
						MethodDefinition: false,
						ClassDeclaration: false,
						ArrowFunctionExpression: true,
						FunctionExpression: false,
					},
				},
			],
		},
	},
];
