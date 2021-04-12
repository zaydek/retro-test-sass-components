const cases = require("./cases")

const gre = /sass\.global\((?:"([^"]+)"|'([^']+)'|`([^`]+)`|`((?:\n.*?)+)`)\)/g
const cre = /(?:(?:const|let|var)\s+([a-zA-Z$-_]+)\s+=\s+)?sass\.(?!global)([a-zA-Z$-_]+)\((?:"([^"]+)"|'([^']+)'|`([^`]+)`|`((?:\n.*?)+)`)\)/g

function hash(count) {
	return Math.random().toString(36).slice(2, 2 + count)
}

function none(_) { return "" }
function preserve(raw) { return raw }

function extractMetadata(input, { prefix, className }) {
	prefix ??= "sass"
	className ??= "kebab"

	const transform = {
		"none": none,
		"preserve": preserve,
		"kebab": cases.kebabCase,
		"camel": cases.camelCase,
		"title": cases.titleCase,
	}[className]

	const gmatches = []
	const cmatches = []

	let gmatch = null
	while ((gmatch = gre.exec(input))) {
		gmatches.push({
			raw: gmatch[1] ?? gmatch[2] ?? gmatch[3] ?? gmatch[4],
		})
	}

	let cmatch = null
	while ((cmatch = cre.exec(input))) {
		let className = prefix + "-" + hash(4)
		if (transform !== none) {
			className += (cmatch[1] === null ? "" : "__" + transform(cmatch[1]))
		}
		cmatches.push({
			className,
			tagName: cmatch[2],
			raw: cmatch[3] ?? cmatch[4] ?? cmatch[5] ?? cmatch[6],
		})
	}

	return [gmatches, cmatches]
}

function generateContents(gmatches, cmatches) {
	let global = ""
	for (const gmatch of gmatches) {
		global += `
			${gmatch.raw}
		`
	}

	let styles = ""
	for (const cmatch of cmatches) {
		styles += `
			@at-root {
				.${cmatch.className} {
					${cmatch.raw}
				}
			}
		`
	}

	return {
		global,
		styles,

		// https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/domElements.js
		contents: `
			function sass(raw) {
				return {
					${cmatches.map(cmatch => `${JSON.stringify(cmatch.raw)}: (() => {
						const comp = function ({ className, ...props }) {
							return React.createElement(${JSON.stringify(cmatch.tagName)}, {
								className: [${JSON.stringify(cmatch.className)}, className]
									.filter(Boolean)
									.join(" "),
								...props
							})
						}
						Object.assign(comp, {
							tagName: ${JSON.stringify(cmatch.tagName)},
							className: ${JSON.stringify(cmatch.className)},
						})
						return comp
					})()`)},
				}[raw]
			}

			export default {
				// No-op
				global(raw) {},

				a(raw)              { return sass(raw) },
				abbr(raw)           { return sass(raw) },
				address(raw)        { return sass(raw) },
				area(raw)           { return sass(raw) },
				article(raw)        { return sass(raw) },
				aside(raw)          { return sass(raw) },
				audio(raw)          { return sass(raw) },
				b(raw)              { return sass(raw) },
				base(raw)           { return sass(raw) },
				bdi(raw)            { return sass(raw) },
				bdo(raw)            { return sass(raw) },
				big(raw)            { return sass(raw) },
				blockquote(raw)     { return sass(raw) },
				body(raw)           { return sass(raw) },
				br(raw)             { return sass(raw) },
				button(raw)         { return sass(raw) },
				canvas(raw)         { return sass(raw) },
				caption(raw)        { return sass(raw) },
				cite(raw)           { return sass(raw) },
				code(raw)           { return sass(raw) },
				col(raw)            { return sass(raw) },
				colgroup(raw)       { return sass(raw) },
				data(raw)           { return sass(raw) },
				datalist(raw)       { return sass(raw) },
				dd(raw)             { return sass(raw) },
				del(raw)            { return sass(raw) },
				details(raw)        { return sass(raw) },
				dfn(raw)            { return sass(raw) },
				dialog(raw)         { return sass(raw) },
				div(raw)            { return sass(raw) },
				dl(raw)             { return sass(raw) },
				dt(raw)             { return sass(raw) },
				em(raw)             { return sass(raw) },
				embed(raw)          { return sass(raw) },
				fieldset(raw)       { return sass(raw) },
				figcaption(raw)     { return sass(raw) },
				figure(raw)         { return sass(raw) },
				footer(raw)         { return sass(raw) },
				form(raw)           { return sass(raw) },
				h1(raw)             { return sass(raw) },
				h2(raw)             { return sass(raw) },
				h3(raw)             { return sass(raw) },
				h4(raw)             { return sass(raw) },
				h5(raw)             { return sass(raw) },
				h6(raw)             { return sass(raw) },
				head(raw)           { return sass(raw) },
				header(raw)         { return sass(raw) },
				hgroup(raw)         { return sass(raw) },
				hr(raw)             { return sass(raw) },
				html(raw)           { return sass(raw) },
				i(raw)              { return sass(raw) },
				iframe(raw)         { return sass(raw) },
				img(raw)            { return sass(raw) },
				input(raw)          { return sass(raw) },
				ins(raw)            { return sass(raw) },
				kbd(raw)            { return sass(raw) },
				keygen(raw)         { return sass(raw) },
				label(raw)          { return sass(raw) },
				legend(raw)         { return sass(raw) },
				li(raw)             { return sass(raw) },
				link(raw)           { return sass(raw) },
				main(raw)           { return sass(raw) },
				map(raw)            { return sass(raw) },
				mark(raw)           { return sass(raw) },
				marquee(raw)        { return sass(raw) },
				menu(raw)           { return sass(raw) },
				menuitem(raw)       { return sass(raw) },
				meta(raw)           { return sass(raw) },
				meter(raw)          { return sass(raw) },
				nav(raw)            { return sass(raw) },
				noscript(raw)       { return sass(raw) },
				object(raw)         { return sass(raw) },
				ol(raw)             { return sass(raw) },
				optgroup(raw)       { return sass(raw) },
				option(raw)         { return sass(raw) },
				output(raw)         { return sass(raw) },
				p(raw)              { return sass(raw) },
				param(raw)          { return sass(raw) },
				picture(raw)        { return sass(raw) },
				pre(raw)            { return sass(raw) },
				progress(raw)       { return sass(raw) },
				q(raw)              { return sass(raw) },
				rp(raw)             { return sass(raw) },
				rt(raw)             { return sass(raw) },
				ruby(raw)           { return sass(raw) },
				s(raw)              { return sass(raw) },
				samp(raw)           { return sass(raw) },
				script(raw)         { return sass(raw) },
				section(raw)        { return sass(raw) },
				select(raw)         { return sass(raw) },
				small(raw)          { return sass(raw) },
				source(raw)         { return sass(raw) },
				span(raw)           { return sass(raw) },
				strong(raw)         { return sass(raw) },
				style(raw)          { return sass(raw) },
				sub(raw)            { return sass(raw) },
				summary(raw)        { return sass(raw) },
				sup(raw)            { return sass(raw) },
				table(raw)          { return sass(raw) },
				tbody(raw)          { return sass(raw) },
				td(raw)             { return sass(raw) },
				textarea(raw)       { return sass(raw) },
				tfoot(raw)          { return sass(raw) },
				th(raw)             { return sass(raw) },
				thead(raw)          { return sass(raw) },
				time(raw)           { return sass(raw) },
				title(raw)          { return sass(raw) },
				tr(raw)             { return sass(raw) },
				track(raw)          { return sass(raw) },
				u(raw)              { return sass(raw) },
				ul(raw)             { return sass(raw) },
				var(raw)            { return sass(raw) },
				video(raw)          { return sass(raw) },
				wbr(raw)            { return sass(raw) },

				// SVG
				circle(raw)         { return sass(raw) },
				clipPath(raw)       { return sass(raw) },
				defs(raw)           { return sass(raw) },
				ellipse(raw)        { return sass(raw) },
				foreignObject(raw)  { return sass(raw) },
				g(raw)              { return sass(raw) },
				image(raw)          { return sass(raw) },
				line(raw)           { return sass(raw) },
				linearGradient(raw) { return sass(raw) },
				marker(raw)         { return sass(raw) },
				mask(raw)           { return sass(raw) },
				path(raw)           { return sass(raw) },
				pattern(raw)        { return sass(raw) },
				polygon(raw)        { return sass(raw) },
				polyline(raw)       { return sass(raw) },
				radialGradient(raw) { return sass(raw) },
				rect(raw)           { return sass(raw) },
				stop(raw)           { return sass(raw) },
				svg(raw)            { return sass(raw) },
				text(raw)           { return sass(raw) },
				tspan(raw)          { return sass(raw) },
			}
		`
	}
}


module.exports = {
	extractMetadata,
	generateContents,
}
