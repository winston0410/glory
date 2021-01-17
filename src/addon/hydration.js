'use strict'

const addOn = function (renderer) {
	const hydrated = {}

	renderer.hydrate = function (sh) {
		const cssRules = sh.cssRules || sh.sheet.cssRules

		// console.log('check cssRules', cssRules)

		for (const rule of cssRules) {
			if (rule.media) {
				// console.log(rule.media.mediaText)
			} else {
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
