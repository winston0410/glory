import { hyphenateProperty } from 'css-in-js-utils'
import { is, isEmpty } from 'rambda'
import safeIsObj from 'safe-is-obj'

const isAtRule = (selector) => {
	return selector[0] === '@' && selector !== '@font-face'
}

function buildDecls(renderer, selector, decls, atRule) {
	let result = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			for (const currentValue of value) {
				result += renderer.decl(prop, currentValue)
			}
		} else if (safeIsObj(value)) {
			if (isAtRule(prop)) {
				renderer.put(selector, value, prop)
			} else {
				result += renderer.put(renderer.selector(selector, prop), value, atRule)
			}
		} else {
			result += `${hyphenateProperty(prop)}:${value};`
		}
	}
	return result
}

module.exports = buildDecls
