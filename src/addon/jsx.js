'use strict'
import { isProduction } from '../helper'
import safeIsObj from 'safe-is-obj'

const addOn = function(renderer) {
	renderer.jsx = (Tag, callback, name) => {
		if (!renderer.h) {
			throw new Error(
				'You need to set jsx factory function as renderer.h before using renderer.jsx.'
			)
		}

		function Component(props = {}) {
			if (!Tag) return null
			if (callback) {
				console.log('check callback', callback)
				if (typeof callback !== 'function') {
					throw new TypeError('callback is not a function')
				}

				const stylingObject = callback(props)

				if (safeIsObj(stylingObject)) {
					props.className = renderer.virtual(stylingObject)
				}
			}

			return renderer.h(props.as || Tag, props)
		}

		if (!isProduction) {
			if (name) {
				Component.displayName = name
			}
		}

		return Component
	}
}

export default addOn
