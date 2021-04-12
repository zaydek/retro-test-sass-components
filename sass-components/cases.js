function isAlpha(ch) {
	return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")
}

function isDigit(ch) {
	return ch >= "0" && ch <= "9"
}

// kebabCase("HelloWorld") -> "hello-world"
// kebabCase("HelloWorld2") -> "hello-world-2"
// kebabCase("HelloWorld22") -> "hello-world-22"
//
function kebabCase(str) {
	let out = ""
	for (let x = 0; x < str.length; x++) {
		const ch = str[x]
		if (x > 0 && ch >= "A" && ch <= "Z") {
			out += "-" + ch.toLowerCase()
			continue
		} else if ((x > 0 && isDigit(ch)) && (x - 1 >= 0 && isAlpha(str[x - 1]))) {
			out += "-" + ch
			continue
		}
		out += ch.toLowerCase()
	}
	return out
}

// camelCase("hello-world") -> "helloWorld"
// camelCase("hello-world-2") -> "helloWorld2"
// camelCase("hello-world-22") -> "helloWorld22"
//
function camelCase(str) {
	const out = titleCase(str)
	return out.slice(0, 1).toLowerCase() + out.slice(1)
}

// titleCase("hello-world") -> "HelloWorld"
// titleCase("hello-world-2") -> "HelloWorld2"
// titleCase("hello-world-22") -> "HelloWorld22"
//
function titleCase(str) {
	return str.split("-").map(v => v.slice(0, 1).toUpperCase() + v.slice(1)).join("")
}

module.exports = { kebabCase, camelCase, titleCase }
