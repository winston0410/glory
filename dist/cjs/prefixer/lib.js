'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var rambda_esm = require('../rambda.esm-7335a530.js')

// ::Placeholder is not handled by inline-prefix-style,
// https://github.com/robinweser/inline-style-prefixer/issues/104
const placeholderPrefixList = [
	'::-webkit-input-placeholder',
	'::-moz-placeholder',
	':-ms-input-placeholder',
	':-moz-placeholder'
]

const prefixSelector = rambda_esm.curry(
	(prefixTarget, prefixList, selector) => {
		if (!selector.test(prefixTarget)) {
			return
		}

		console.log('call put for generate more decl')
	}
)

const prefixPlaceholder = prefixSelector('::placeholder', placeholderPrefixList)

exports.prefixPlaceholder = prefixPlaceholder
