'use strict'
import safeIsObj from 'safe-is-obj'

const createComponent = (Tag, callback, renderer) =>
	function Component(props = {}) {
		if (!Tag) return null
		if (callback) {
			const stylingObject = callback(props)

			if (safeIsObj(stylingObject)) {
				props.className = renderer.virtual(stylingObject)
			}
		}

		return renderer.h(props.as || Tag, props)
	}

const addOn = function(renderer) {
	renderer.jsx = (Tag, callback) => {
		if (!renderer.h)
			throw new Error(
				'You need to set jsx factory function as renderer.h before using renderer.jsx.'
			)

		return createComponent(Tag, callback, renderer)
	}
}

export default addOn
