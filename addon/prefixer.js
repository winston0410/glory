'use strict'

import { prefix as prefixAll } from 'inline-style-prefixer'
import { camelCaseProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'

const addOn = function (renderer) {
	const put = renderer.put

	renderer.put = function withPrefixer(selector, decls, atRule) {
		const prefixedDecl = pipe(
			Object.entries,
			map(([prop, value]) => [camelCaseProperty(prop), value]),
			Object.fromEntries,
			prefixAll
		)(decls)

		console.log('check prefix result', prefixedDecl)

		put(selector, prefixedDecl, atRule)
	}
}

export default addOn
