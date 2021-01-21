'use strict'
import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule,
	cssifyArray,
	cssifyObject
} from '../helper'
import safeIsObj from 'safe-is-obj'

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
				const result = ` ${renderer.atomic(cssifyArray(prop, value))}`
				cache[id] = result
				classNames += result
			} else if (safeIsObj(value)) {
				if (isAtRule(prop)) {
					classNames += objectToClassNames(value, '', prop)
				} else {
					classNames += objectToClassNames(value, prop)
				}
			} else {
				let prefixedRawDecls = ''

				if (renderer.prefixer) {
					const prefixed = renderer.prefixer({ [prop]: value })
					prefixedRawDecls = cssifyObject(prefixed)
				} else {
					prefixedRawDecls = assembleDecl(prop, value)
				}

				const result = ` ${renderer.atomic(prefixedRawDecls, selector, atRule)}`
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
