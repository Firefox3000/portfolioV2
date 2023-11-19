/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: "none",
	printWidth: 100,
	plugins: ["prettier-plugin-astro", "prettier-plugin-svelte", "prettier-plugin-tailwind"],
	overrides: [
		{ "files": "*.svelte", "options": { "parser": "svelte" } },
		{
			"files": "*.astro",
			"options": {
				"parser": "astro"
			}
		}
	],
	astroAllowShorthand: true,
}
