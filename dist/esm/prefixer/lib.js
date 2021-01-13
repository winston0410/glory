import { c as curry } from '../rambda.esm-0bcedf0c.js'

// ::Placeholder is not handled by inline-prefix-style,
// https://github.com/robinweser/inline-style-prefixer/issues/104
const placeholderPrefixList = [
	'::-webkit-input-placeholder',
	'::-moz-placeholder',
	':-ms-input-placeholder',
	':-moz-placeholder'
]

const prefixSelector = curry((prefixTarget, prefixList, selector) => {
	if (!selector.test(prefixTarget)) {
		return
	}

	console.log('call put for generate more decl')
})

const prefixPlaceholder = prefixSelector('::placeholder', placeholderPrefixList)

export { prefixPlaceholder }
