import { prefix as addPrefix } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import safeIsObj from 'safe-is-obj'
import { Renderer } from './type'

const assembleClassName = (renderer: Renderer, name = '') =>
	renderer.pfx + (name || renderer.hash())

const assembleDecl = (prop: string, value: string): string =>
	`${hyphenateProperty(prop)}:${value};`

const assembleRule = (name: string, rule: string) => `${name}{${rule}}`

const assembleKeyframe = (list: Object): string => {
	let result = ''
	for (const key in list) {
		result +=
			typeof list[key] === 'string'
				? `${key}:${list[key]};`
				: `${key}{${assembleKeyframe(list[key])}}`
	}
	return result
}

const isAtRule = (selector: string) =>
	selector[0] === '@' && selector !== '@font-face'

const cssifyArray = (prop: string, value: string[]): string => {
	let concatedDecl = ''
	for (const currentValue of value) {
		concatedDecl += assembleDecl(prop, currentValue)
	}
	return concatedDecl
}

const cssifyObject = (decls: Object, callback: Function) => {
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

const createCache = (renderer: Renderer, name: string) => {
	if (!renderer[name]) {
		renderer[name] = {}
	}
}

const isEmptyObj = (obj: Object) => Object.keys(obj).length === 0

const isProduction = process.env.NODE_ENV === 'production'

export {
	assembleClassName,
	addPrefix,
	isAtRule,
	cssifyObject,
	cssifyArray,
	assembleRule,
	assembleDecl,
	assembleKeyframe,
	createCache,
	isEmptyObj,
	isProduction
}
