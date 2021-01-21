'use strict'
import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule
} from '../helper'
import safeIsObj from 'safe-is-obj'

const concatAssembledDecl = (prop, value) => {
	let concatedDecl = ''
	for (const currentValue of value) {
		concatedDecl += assembleDecl(prop, currentValue)
	}
	return concatedDecl
}

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	const objectToClassNames = (decls, selector = '', atRule = '') => {
		let classNames = ''
		for (const prop in decls) {
			const value = decls[prop]
			const id = `${atRule}${selector}${prop}${value}`

			if (cache[id]) {
				classNames += cache[id]
				continue
			}

			if (Array.isArray(value)) {
				const result = ` ${renderer.atomic(concatAssembledDecl(prop, value))}`
				cache[id] = result
				classNames += result
			} else if (safeIsObj(value)) {
				if (isAtRule(prop)) {
					classNames += objectToClassNames(value, '', prop)
				} else {
					classNames += objectToClassNames(value, prop)
				}
			} else {
				const result = ` ${renderer.atomic(
					assembleDecl(prop, value),
					selector,
					atRule
				)}`
				cache[id] = result
				classNames += result
			}
		}
		return classNames
	}

	renderer.atomic = function (rawDecl, selector = '', atRule = '') {
		const className = assembleClassName(renderer)

		const rule = assembleRule(`.${className}${selector}`, rawDecl)

		renderer.putRaw(atRule ? assembleRule(atRule, rule) : rule)

		return className
	}

	// Only media queries should be supported in virtual
	renderer.virtual = (decls) => objectToClassNames(decls)

	renderer.rule = renderer.virtual
}

export default addOn
