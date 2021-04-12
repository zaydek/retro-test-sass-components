/**
 * @type {import("esbuild").Plugin}
 */
const sassComponents = opts => ({
	name: "sass-components",
	setup(build) {
		const fs = require("fs")
		const sass = require("sass")
		const sassComponents = require("./sass-components")

		const importers = new Set()

		build.onResolve({ filter: /^sass-components$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "sass-components-ns",
			}
		})

		build.onLoad({ filter: /.*/, namespace: "sass-components-ns" }, async args => {
			// Parse metadata
			const gmatches = []
			const cmatches = []
			for (const importer of [...importers]) {
				const input = await fs.promises.readFile(importer)
				const [
					gmatches_,
					cmatches_,
				] = sassComponents.extractMetadata(input, opts)
				gmatches.push(...gmatches_)
				cmatches.push(...cmatches_)
			}

			// Generate contents
			const {
				global,
				styles,
				contents,
			} = sassComponents.generateContents(gmatches, cmatches)

			// Render Sass
			const result = sass.renderSync({
				data: `
					${global}
					${styles}
				`
			})

			return {
				// Import Sass and export contents
				contents: `
					import "data:text/css,${encodeURI(result.css.toString())}"
					${contents}
				`,
				loader: "jsx",
			}
		})
	},
})

module.exports = {
	target: ["es2017"],
	plugins: [
		sassComponents({
			className: "none"
		}),
	],
}
