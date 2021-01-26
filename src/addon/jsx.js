'use strict'
import {
	assembleClassName,
	assembleRule,
	assembleDecl,
	isAtRule,
	cssifyArray,
	cssifyObject,
	createCache,
	isEmptyObj
} from '../helper'
import safeIsObj from 'safe-is-obj'

const addOn = function(renderer) {
	renderer.jsx = (Tag, callback) => {
		if (!renderer.h) {
			throw new Error(
				'You need to set jsx factory function as renderer.h before using renderer.jsx.'
			)
		}

		const Component = (props) => {
			if (!Tag) return null
			return renderer.h(Tag, props, props.children)
		}

		return Component
	}
}

export default addOn
