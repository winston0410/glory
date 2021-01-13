'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var addon_helper = require('./helper.js')
require('../index-6dcda881.js')
require('../rambda.esm-7335a530.js')

const addOn = function (renderer) {
	renderer.rule = function (css, name) {
		const className = addon_helper.assembleClassName(renderer, name)
		renderer.put(`.${className}`, css)
		return `${className}`
	}
}

exports.default = addOn
