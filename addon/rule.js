'use strict'
import { assembleClassName } from './helper'

const addOn = function (renderer) {
	renderer.rule = function (css, name) {
		const className = assembleClassName(renderer, name)
		renderer.put(`.${className}`, css)
		return `${className}`
	}
}

export default addOn
