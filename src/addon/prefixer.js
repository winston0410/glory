'use strict'

import { addPrefix } from '../helper'

const addOn = function (renderer) {
	const put = renderer.put

	renderer.put = function withPrefixer(selector, decls, atRule) {
		return put(selector, addPrefix(decls), atRule)
	}

	if (renderer.keyframes) {
		const keyframes = renderer.keyframes
		renderer.keyframes = (decls, name) => {
			return keyframes(addPrefix(decls), name)
		}
	}
}

export default addOn
