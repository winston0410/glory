'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var addon_helper = require('./helper.js')
require('../index-6dcda881.js')
require('../rambda.esm-7335a530.js')

const addOn = function (renderer) {
	const put = renderer.put

	renderer.put = function withPrefixer(selector, decls, atRule) {
		return put(selector, addon_helper.addPrefix(decls), atRule)
	}

	if (renderer.keyframes) {
		const keyframes = renderer.keyframes
		renderer.keyframes = (decls, name) => {
			return keyframes(addon_helper.addPrefix(decls), name)
		}
	}
}

exports.default = addOn
