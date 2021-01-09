'use strict'

exports.addon = (renderer) => {
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
