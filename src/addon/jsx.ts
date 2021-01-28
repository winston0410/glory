'use strict'
import safeIsObj from 'safe-is-obj'
import { Renderer } from '../type'

const createComponent = (
	Tag: string,
	callback: (props: object) => object,
	renderer: Renderer
) =>
	function Component(props) {
		if (!Tag) return null
		if (callback) {
			const stylingObject = callback(props)

			if (safeIsObj(stylingObject)) {
				props.className = renderer.virtual(stylingObject)
			}
		}

		return renderer.h(props.as || Tag, props)
	}

const addOn = function(renderer: Renderer): void {
	renderer.jsx = (Tag: string, callback: (props: object) => object) => {
		if (!renderer.h)
			throw new Error(
				'You need to set jsx factory function as renderer.h before using renderer.jsx.'
			)

		return createComponent(Tag, callback, renderer)
	}
}

export default addOn
