import safeIsObj from 'safe-is-obj'

const isAtRule = (selector) => {
	return selector[0] === '@' && selector !== '@font-face'
}

function buildDecls(renderer, selector, decls, atRule) {
	let index = 0
	const declTuple = Object.entries(decls)

	const recursion = (style) => {
		if (index === declTuple.length) return style
		const [prop, value] = declTuple[index]
		index++
		// console.log('check index', currentDecl)
		if (Array.isArray(value)) {
			const expandedRules = value.reduce((acc, currentValue) => {
				return acc + renderer.decl(prop, currentValue)
			}, '')
			return recursion(style + expandedRules)
		}

		if (safeIsObj(value)) {
			if (isAtRule(prop)) {
				renderer.put(selector, value, prop)
			} else {
				renderer.put(renderer.selector(selector, prop), value, atRule)
			}
			return recursion(style)
		}
		return recursion(style + renderer.decl(prop, value))
	}

	return recursion('')
}

module.exports = buildDecls
