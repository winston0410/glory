'use strict'

import { addPrefix } from '../helper'

const defaultConfig = {
	selectorToPrefix: {
		'::placeholder': [
			'::-webkit-input-placeholder',
			'::-moz-placeholder',
			':-ms-input-placeholder'
		]
	}
}

const addOn = function(renderer, config = defaultConfig) {
	const { selectorToPrefix } = config
	renderer.selectorToPrefix = selectorToPrefix

	if (renderer.keyframes) {
		const keyframes = renderer.keyframes
		renderer.keyframes = (decls, name) => keyframes(addPrefix(decls), name)
	}

	if (renderer.virtual) {
		renderer.prefixer = addPrefix
	}
}

export default addOn
