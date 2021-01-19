import { hyphenateProperty } from 'css-in-js-utils'
import { is, isEmpty } from 'rambda'
import safeIsObj from 'safe-is-obj'
import { isAtRule, assembleDecl } from '../../src/helper'

function buildDecls(renderer, selector, decls, atRule) {
	let result = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			const expandedRules = value.reduce(
				(acc, currentValue) => acc + assembleDecl(prop, currentValue),
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
			result += assembleDecl(prop, value)
		}
	}
	return result
}

module.exports = buildDecls
