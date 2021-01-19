import { prefix as prefixAll } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'
import safeIsObj from 'safe-is-obj'

const assembleClassName = (renderer, name) => {
	return renderer.pfx + (name || renderer.hash())
}

const assembleDecl = (prop, value) => `${hyphenateProperty(prop)}:${value};`

const assembleRule = (name, rule) => `${name}{${rule}}`

const addPrefix = prefixAll

const isAtRule = (selector) => {
	return selector[0] === '@' && selector !== '@font-face'
}

function buildDecls(renderer, selector, decls, atRule) {
	let result = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			for (const currentValue of value) {
				result += assembleDecl(prop, currentValue)
			}
		} else if (safeIsObj(value)) {
			if (isAtRule(prop)) {
				result += renderer.put(selector, value, prop)
			} else {
				result += renderer.put(renderer.selector(selector, prop), value, atRule)
			}
		} else {
			result += assembleDecl(prop, value)
		}
	}
	return result
}

export { assembleClassName, addPrefix, isAtRule, buildDecls, assembleRule }
