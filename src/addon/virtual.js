'use strict'

import { assembleClassName, assembleRule } from '../helper'

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	renderer.atomic = function (selectorTemplate, rawDecl, atRule) {
		if (cache[`${atRule}${rawDecl}`]) {
			return cache[`${atRule}${rawDecl}`]
		}

		const className = assembleClassName(renderer)

		const rule = assembleRule(`.${className}`, rawDecl)

		const style = atRule ? assembleRule(atRule, rule) : rule

		cache[`${atRule}${rawDecl}`] = className
		renderer.putRaw(style)

		return className
	}

	renderer.virtual = function (selectorTemplate, decls, atRule) {
		let classNames = ''

		for (const prop in decls) {
			const value = decls[prop]
			classNames += ` ${renderer.atomic('', `${prop}:${value};`, '')}`
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
