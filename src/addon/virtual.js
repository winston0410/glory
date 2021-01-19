'use strict'

import { assembleClassName, assembleRule, assembleDecl } from '../helper'
import safeIsObj from 'safe-is-obj'

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	renderer.atomic = function (selector, rawDecl, atRule) {
		const id = `${atRule}${selector}${rawDecl}`

		if (cache[id]) {
			return cache[id]
		}

		const className = assembleClassName(renderer, selector)

		const rule = assembleRule(`.${className}`, rawDecl)

		const style = atRule ? assembleRule(atRule, rule) : rule

		cache[id] = className
		renderer.putRaw(style)

		return className
	}

	renderer.virtual = function (selectorTemplate, decls, atRule) {
		let classNames = ''

		for (const prop in decls) {
			const value = decls[prop]
			if (safeIsObj(value)) {
				// console.log('check value', prop, value)
				// classNames += ` ${renderer.atomic(prop, assembleDecl(prop, value), '')}`
			} else {
				classNames += ` ${renderer.atomic('', assembleDecl(prop, value), '')}`
			}
		}
		// for (let i = 0; i < rawDecls.length; i++) {
		// 	const d = rawDecls[i]
		// 	if (d)
		// 		classNames += ` ${renderer.atomic(selectorTemplate, d, atrule)}`
		// }

		return classNames
	}

	renderer.rule = function (decls) {
		return renderer.virtual('&', decls)
	}
}

export default addOn
