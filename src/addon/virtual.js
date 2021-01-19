'use strict'

import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule
} from '../helper'
import safeIsObj from 'safe-is-obj'

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	renderer.atomic = function (rawDecl, selector = '', atRule) {
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
	renderer.virtual = function (decls) {
		let classNames = ''

		for (const prop in decls) {
			const value = decls[prop]
			if (safeIsObj(value)) {
				if (isAtRule(prop)) {
					// renderer.atomic('', assembleDecl(prop, value), '')
				} else {
					// console.log('check prop', prop)
					// classNames += renderer.atomic(prop, value)
				}
			} else {
				classNames += ` ${renderer.atomic('', assembleDecl(prop, value), '')}`
			}
		}

		return classNames
	}

	renderer.rule = renderer.virtual
}

export default addOn
