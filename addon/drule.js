'use strict'

const addOn = function (renderer) {
	renderer.drule = function (styles, block) {
		const className = renderer.rule(styles, block)

		const closure = function (dynamicStyles) {
			if (!dynamicStyles) {
				return className
			}

			const dynamicClassName = renderer.cache(dynamicStyles)

			return className + dynamicClassName
		}

		closure.toString = function () {
			return className
		}

		return closure
	}
}

export default addOn
