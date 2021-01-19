'use strict'

import { assembleClassName, wrapRule } from '../helper'

const addOn = function (renderer) {
	// Setting the cache outside this function may result in more persistant but unexpected behaviors
	const cache = {}

	renderer.atomic = function (selectorTemplate, rawDecl, atRule) {
		if (cache[`${atRule}${rawDecl}`]) {
			return cache[`${atRule}${rawDecl}`]
		}

		const className = assembleClassName(renderer)

		const rule = wrapRule(`.${className}`, rawDecl)

		const style = atRule ? wrapRule(atRule, rule) : rule

		cache[`${atRule}${rawDecl}`] = className
		renderer.putRaw(style)

		return className
	}

	renderer.virtual = function (selectorTemplate, decls, atrule) {
		selectorTemplate = selectorTemplate || '&'

		let classNames = ''

		for (const prop in decls) {
			const value = decls[prop]

			if (prop.indexOf('keyframes') > -1) {
				renderer.putAt('', value, prop)
				continue
			}

			if (value instanceof Object && !(value instanceof Array)) {
				if (prop[0] === '@') {
					classNames += renderer.virtual(selectorTemplate, value, prop)
				} else {
					classNames += renderer.virtual(
						renderer.selector(selectorTemplate, prop),
						value,
						atrule
					)
				}
			} else {
				const rawDecl = renderer.decl(prop, value)
				const rawDecls = rawDecl.split(';')

				for (let i = 0; i < rawDecls.length; i++) {
					const d = rawDecls[i]
					if (d)
						classNames += ` ${renderer.atomic(selectorTemplate, d, atrule)}`
				}
			}
		}

		return classNames
	}

	renderer.rule = function (decls) {
		return renderer.virtual('&', decls)
	}
}

export default addOn
