'use strict'

import { addPrefix } from './helper'

const addOn = function (renderer) {
	const put = renderer.put

	renderer.put = function withPrefixer(selector, decls, atRule) {
		put(selector, addPrefix(decls), atRule)
	}
}

export default addOn
