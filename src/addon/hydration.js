'use strict'
// import {
// cssifyObject
// } from '../helper.js'

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
				// console.log('check rule', rule)
				// hydrated[`@media ${rule.media.mediaText}`] = '1'
				// hydrated[rule.selectorText] = CSSRuleToObj(rule)
			} else {
				hydrated[rule.selectorText] = CSSRuleToObj(rule)
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) {
			renderer.hydrate(renderer.sh)
		}

		if (renderer.put) {
			const put = renderer.put
			renderer.put = function (selector, decls, atRule) {
				if (selector in hydrated) {
					const { isEql, diff } = compare(hydrated[selector], decls)
					if (!isEql) {
						return put(selector, diff, atRule)
					}
				} else {
					return put(selector, decls, atRule)
				}
			}
		}

		if (renderer.virtual) {
			const virtual = renderer.virtual
			renderer.virtual = function (decls) {
				// console.log(
				// 	'check hydrated cache',
				// 	hydrated,
				// 	typeof hydrated['.a'],
				// 	compare(hydrated['.a'], decls)
				// )
				// console.log('check decls', decls)
				// if (decls) {
				// 	const { isEql, diff} = compare(hydrated[selector], decls)
				// }
				return virtual(decls)
			}
		}
	}
}

export default addOn
