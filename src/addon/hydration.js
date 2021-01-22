'use strict'
import {
	cssifyObject,
	assembleClassName,
	isAtRule,
	createCache
} from '../helper.js'

const compare = (original, updated) => {
	const diff = {}

	for (const key in updated) {
		if (updated[key] !== original[key]) {
			diff[key] = updated[key]
		}
	}

	return {
		diff,
		isEql: Object.keys(diff).length === 0
	}
}

const CSSRuleToObj = (rule) => {
	const obj = {}
	for (let i = 0; i < rule.style.length; i++) {
		const prop = rule.style[i]
		obj[prop] = rule.style[prop]
	}
	return obj
}

const addOn = function (renderer) {
	createCache(renderer)

	renderer.hydrate = function (sh) {
		const cssRules = sh.cssRules || sh.sheet.cssRules

		for (const rule of cssRules) {
			if (rule.media) {
				for (const basicRule of rule.cssRules) {
					renderer.cache[
						`@media ${rule.media.mediaText}${cssifyObject(
							CSSRuleToObj(basicRule)
						)}`
					] = basicRule.selectorText
				}
			} else {
				renderer.cache[cssifyObject(CSSRuleToObj(rule))] = rule.selectorText
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) {
			renderer.hydrate(renderer.sh)
		}
		if (renderer.ksh) {
			renderer.hydrate(renderer.ksh)
		}
	}
}

export default addOn

// if (renderer.put) {
// 	const put = renderer.put
// 	renderer.put = function(selector, decls, atRule) {
// 		if (selector in hydrated) {
// 			const { isEql, diff } = compare(hydrated[selector], decls)
// 			if (!isEql) {
// 				return put(selector, diff, atRule)
// 			}
// 		} else {
// 			return put(selector, decls, atRule)
// 		}
// 	}
// }
//
// if (renderer.rule) {
// 	const next = renderer.hasher(renderer.hashChars)
// 	const rule = renderer.rule
// 	renderer.rule = function(decls) {
// 		// Refactor with assembleClassName later
// 		const selector = `.${renderer.pfx}${next()}`
// 		if (hydrated[selector]) {
// 			const { isEql, diff } = compare(hydrated[selector], decls)
// 			if (isEql) {
// 				return selector
// 			}
// 			return rule(diff)
// 		}
// 		return rule(decls)
// 	}
// }
