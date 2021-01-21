'use strict'
import { cssifyObject, assembleClassName, isAtRule } from '../helper.js'

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
	const hydrated = {}

	renderer.hydrate = function (sh) {
		const cssRules = sh.cssRules || sh.sheet.cssRules

		for (const rule of cssRules) {
			if (rule.media) {
				// for (const basicRule of rule.cssRules) {
				// 	hydrated[
				// 		`@media ${rule.media.mediaText} ${basicRule.selectorText}`
				// 	] = CSSRuleToObj(basicRule)
				// }
			} else {
				hydrated[rule.selectorText] = CSSRuleToObj(rule)
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) {
			renderer.hydrate(renderer.sh)
		}

		if (renderer.virtual) {
			const next = renderer.hasher(renderer.hashChars)
			const virtual = renderer.virtual
			renderer.virtual = function (decls) {
				// Refactor with assembleClassName later
				console.log('check hydrated', hydrated)
				const selector = `.${renderer.pfx}${next()}`
				console.log('check decls and selector', decls, selector)
				if (hydrated[selector]) {
					const { isEql, diff } = compare(hydrated[selector], decls)
					if (isEql) {
						return selector
					}
					return virtual(diff)
				}
				return virtual(decls)
			}
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
