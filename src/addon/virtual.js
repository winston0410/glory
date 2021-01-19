'use strict'

import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule
} from '../helper'
import safeIsObj from 'safe-is-obj'

const objectToClassNames = (callback, decls, selector = '', atRule = '') => {
	let classNames = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			for (const currentValue of value) {
				classNames += ` ${callback(assembleDecl(prop, currentValue))}`
			}
		} else if (safeIsObj(value)) {
			if (isAtRule(prop)) {
				classNames += objectToClassNames(callback, value, '', prop)
			} else {
				classNames += objectToClassNames(callback, value, prop)
			}
		} else {
			classNames += ` ${callback(assembleDecl(prop, value), selector, atRule)}`
		}
	}
	return classNames
}

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	renderer.atomic = function (rawDecl, selector = '', atRule = '') {
		const id = `${atRule}${selector}${rawDecl}`

		if (cache[id]) {
			return cache[id]
		}

		const className = assembleClassName(renderer)

		const rule = assembleRule(`.${className}${selector}`, rawDecl)

		cache[id] = className
		renderer.putRaw(atRule ? assembleRule(atRule, rule) : rule)

		return className
	}

	// Only media queries should be supported in virtual
	renderer.virtual = (decls) => objectToClassNames(renderer.atomic, decls)

	renderer.rule = renderer.virtual
}

export default addOn
