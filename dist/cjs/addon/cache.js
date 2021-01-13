'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const addOn = (renderer) => {
	const cache = {}

	renderer.cache = (css) => {
		if (!css) return

		const key = renderer.hash(css)

		if (!cache[key]) {
			cache[key] = renderer.rule(css, key)
		}

		return cache[key]
	}
}

exports.default = addOn
