'use strict'

const addOn = function (renderer) {
	renderer.rule = function (css, name) {
		const className = renderer.pfx + (name || renderer.hash(css))
		renderer.put(`.${className}`, css)
		return ` ${className}`
	}
}

export default addOn
