'use strict'

import { addPrefix } from '../helper'

const addOn = function(renderer) {
	if (renderer.keyframes) {
		const keyframes = renderer.keyframes
		renderer.keyframes = (decls, name) => keyframes(addPrefix(decls), name)
	}

	if (renderer.virtual) {
		renderer.prefixer = addPrefix
	}
}

export default addOn
