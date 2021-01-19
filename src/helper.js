import { prefix as addPrefix } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'
import safeIsObj from 'safe-is-obj'

const assembleClassName = (renderer, name = '') => {
	return renderer.pfx + (name || renderer.hash())
}

const assembleDecl = (prop, value) => `${hyphenateProperty(prop)}:${value};`

const assembleRule = (name, rule) => `${name}{${rule}}`

const isAtRule = (selector) => selector[0] === '@' && selector !== '@font-face'

function cssifyObject(decls, callback) {
	let css = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			for (const currentValue of value) {
				css += assembleDecl(prop, currentValue)
			}
		} else if (safeIsObj(value)) {
			callback(prop, value)
		} else {
			css += assembleDecl(prop, value)
		}
	}
	return css
}

export {
	assembleClassName,
	addPrefix,
	isAtRule,
	cssifyObject,
	assembleRule,
	assembleDecl
}
