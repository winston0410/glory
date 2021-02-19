'use strict'
import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule,
	cssifyArray,
	cssifyObject,
	createCache,
	isEmptyObj
} from '../helper'
import safeIsObj from 'safe-is-obj'
import { Renderer, ClassName } from '../type'

const addOn = function(renderer: Renderer): void {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	createCache(renderer, 'cache')

	const objectToClassNames = (
		decls: object,
		selector = '',
		atRule = ''
	): ClassName => {
		let classNames = ''
		for (const prop in decls) {
			const value = decls[prop]
			const id = `${atRule}${selector}${prop}:${value};`

			if (renderer.cache[id]) {
				classNames += renderer.cache[id]
				renderer.hash() // Run this to make className consistant for SSR hydration
				continue
			}

			if (Array.isArray(value)) {
				classNames += renderer.cache[id] = ` ${renderer.atomic(
					cssifyArray(prop, value)
				)}`
			} else if (safeIsObj(value)) {
				if (isAtRule(prop)) {
					classNames += objectToClassNames(value, '', prop)
					continue
				}
				classNames += objectToClassNames(value, prop)
			} else {
				const prefixedRawDecls = renderer.prefixer
					? cssifyObject(renderer.prefixer({ [prop]: value }))
					: assembleDecl(prop, value)

				classNames += renderer.cache[id] = ` ${renderer.atomic(
					prefixedRawDecls,
					selector,
					atRule
				)}`
			}
		}
		return classNames
	}

	renderer.atomic = function(
		rawDecl: string,
		selector = '',
		atRule = ''
	): ClassName {
		const className = assembleClassName(renderer)

		let rule = ''

		if (renderer.selectorToPrefix) {
			if (renderer.selectorToPrefix.hasOwnProperty(selector)) {
				for (const prefixedSelector of renderer.selectorToPrefix[selector]) {
					rule += assembleRule(`.${className}${prefixedSelector}`, rawDecl)
				}
			}
		}

		rule += assembleRule(`.${className}${selector}`, rawDecl)

		renderer.putRaw(atRule ? assembleRule(atRule, rule) : rule)

		return className
	}

	// Only media queries should be supported in virtual
	renderer.virtual = (decls: object): ClassName => {
		if (!decls || !safeIsObj(decls)) return ''
		if (isEmptyObj(decls)) return ''
		return objectToClassNames(decls)
	}
}

export default addOn
