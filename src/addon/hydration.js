'use strict'
const compare = (original, updated) => {
	const diff = {}

	for (const key in updated) {
		if (updated[key] !== original[key]) {
			diff[key] = updated[key]
		}
	}

	return {
		diff,
		hasDiff: Object.keys(diff).length > 0
	}
}

const ruleToObj = (rule) => {
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
				// hydrated[rule.selectorText] = ruleToObj(rule)
			} else {
				hydrated[rule.selectorText] = ruleToObj(rule)
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) renderer.hydrate(renderer.sh)

		const put = renderer.put

		renderer.put = function (selector, decls, atRule) {
			if (selector in hydrated) {
				const compareResult = compare(hydrated[selector], decls)
				if (compareResult.hasDiff) {
					put(selector, compareResult.diff, atRule)
				}
			} else {
				put(selector, decls, atRule)
			}
		}
	}
}

export default addOn
