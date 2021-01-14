import { hyphenateProperty } from 'css-in-js-utils'
import { is, isEmpty } from 'rambda'
import safeIsObj from 'safe-is-obj'

function buildDecls(renderer, selector, decls, atRule) {
	let result = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			const expandedRules = value.reduce(
				(acc, currentValue) => acc + renderer.decl(prop, currentValue),
				''
			)
			result += expandedRules
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
