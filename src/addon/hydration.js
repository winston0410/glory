'use strict'
import parseCSS from 'style-to-object'

const compare = (original, updated) => {
	const eql = {}
	const diff = {}

	for (const key in updated) {
		if (updated[key] === original[key]) {
			eql[key] = original[key]
		} else {
			diff[key] = updated[key]
		}
	}

	return {
		eql,
		diff,
		hasDiff: Object.keys(diff).length > 0
	}
}

const addOn = function (renderer) {
	const hydrated = {}

	renderer.hydrate = function (sh) {
		const cssRules = sh.cssRules || sh.sheet.cssRules

		for (const rule of cssRules) {
			if (rule.media) {
				// console.log('check rule', rule)
				// hydrated[`@media ${rule.media.mediaText}`] = '1'
			} else {
				hydrated[rule.selectorText] = parseCSS(rule.style.cssText)
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
