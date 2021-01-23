import { prefix as addPrefix } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'
import safeIsObj from 'safe-is-obj'

const assembleClassName = (renderer, name = '') =>
	renderer.pfx + (name || renderer.hash())

const assembleDecl = (prop, value) => `${hyphenateProperty(prop)}:${value};`

const assembleRule = (name, rule) => `${name}{${rule}}`

const assembleKeyframe = (list) => {
	let result = ''
	for (const key in list) {
		result +=
			typeof list[key] === 'string'
				? `${key}:${list[key]};`
				: `${key}{${assembleKeyframe(list[key])}}`
	}
	return result
}

const isAtRule = (selector) => selector[0] === '@' && selector !== '@font-face'

const cssifyArray = (prop, value) => {
	let concatedDecl = ''
	for (const currentValue of value) {
		concatedDecl += assembleDecl(prop, currentValue)
	}
	return concatedDecl
}

const cssifyObject = (decls, callback) => {
	let css = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			css += cssifyArray(prop, value)
		} else if (safeIsObj(value) && callback) {
			callback(prop, value)
		} else {
			css += assembleDecl(prop, value)
		}
	}
	return css
}

const createCache = (renderer, name) => {
	if (!renderer[name]) {
		renderer[name] = {}
	}
}

export {
	assembleClassName,
	addPrefix,
	isAtRule,
	cssifyObject,
	cssifyArray,
	assembleRule,
	assembleDecl,
	assembleKeyframe,
	createCache
}
