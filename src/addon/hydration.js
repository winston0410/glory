'use strict'

const addOn = function (renderer) {
	const hydrated = {}

	renderer.hydrate = function (sh) {
		const cssRules = sh.cssRules || sh.sheet.cssRules

		for (const rule of cssRules) {
			if (rule.media) {
				// console.log('check rule', rule)
				// hydrated[`@media ${rule.media.mediaText}`] = '1'
			} else {
				console.log('check rule prop', rule.cssText)
				// console.log('check rule prop', rule)
				hydrated[rule.selectorText] = '1'
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) renderer.hydrate(renderer.sh)

		const put = renderer.put

		renderer.put = function (selector, css, atRule) {
			console.log('check value', selector, css, atRule)
			if (selector in hydrated) {
				// eslint-disable-next-line
				console.info('Hydrated selector: ' + selector)
				return
			}

			put(selector, css, atRule)
		}
	}
}

export default addOn
