import { prefix as prefixAll } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'
import safeIsObj from 'safe-is-obj'

const assembleClassName = (renderer, name) =>
	renderer.pfx + (name || renderer.hash())

const addPrefix = pipe(
	Object.entries,
	map(([prop, value]) => [camelCaseProperty(prop), value]),
	Object.fromEntries,
	prefixAll
)

const isAtRule = (selector) => {
	return selector[0] === '@' && selector !== '@font-face'
}

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
				result += renderer.put(selector, value, prop)
			} else {
				result += renderer.put(renderer.selector(selector, prop), value, atRule)
			}
		} else {
			result += `${hyphenateProperty(prop)}:${value};`
		}
	}
	return result
}

export { assembleClassName, addPrefix, isAtRule, buildDecls }
