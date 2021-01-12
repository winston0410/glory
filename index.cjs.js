'use strict'

const { isBrowser } = require('browser-or-node')
const joli = require('@blackblock/joli-string')
const R = require('rambda')
const { hyphenateProperty } = require('css-in-js-utils')

const generator = joli({
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
})

const isProduction = process.env.NODE_ENV !== 'production'

const addSelector = (selector, str) => {
	return isProduction ? `${selector}{${str}}` : `\n${selector} {\n${str}}\n`
}

const isAtRule = (selector) => {
	return selector[0] === '@' && selector !== '@font-face'
}

const shouldAddSpace = (selector) => {
	if (selector[0] === '@' || selector[0] === ':') {
		return selector
	}

	return ` ${selector}`
}

// hyphenateProperty(prop)

exports.create = function (config) {
	const renderer = {
		raw: '',
		pfx: '_',
		client: isBrowser,
		decl: (key, value) => `${hyphenateProperty(key)}:${value};`,
		hash: (obj) => generator.next().value,
		selector: function (parent, selector) {
			return parent + shouldAddSpace(selector)
		},
		putRaw: function (rawCssRule) {
			renderer.raw += rawCssRule
		},
		...config
	}

	if (renderer.client) {
		if (!renderer.sh) {
			document.head.appendChild((renderer.sh = document.createElement('style')))
		}

		if (process.env.NODE_ENV !== 'production') {
			renderer.sh.setAttribute('data-nano-css-dev', '')

			// Test style sheet used in DEV mode to test if .insetRule() would throw.
			renderer.shTest = document.createElement('style')
			renderer.shTest.setAttribute('data-nano-css-dev-tests', '')
			document.head.appendChild(renderer.shTest)
		}

		renderer.putRaw = function (rawCssRule) {
			// .insertRule() is faster than .appendChild(), that's why we use it in PROD.
			// But CSS injected using .insertRule() is not displayed in Chrome Devtools,
			// that's why we use .appendChild in DEV.
			if (process.env.NODE_ENV === 'production') {
				const sheet = renderer.sh.sheet

				// Unknown pseudo-selectors will throw, this try/catch swallows all errors.
				try {
					sheet.insertRule(rawCssRule, sheet.cssRules.length)
					// eslint-disable-next-line no-empty
				} catch (error) {}
			} else {
				// Test if .insertRule() works in dev mode. Unknown pseudo-selectors will throw when
				// .insertRule() is used, but .appendChild() will not throw.
				try {
					renderer.shTest.sheet.insertRule(
						rawCssRule,
						renderer.shTest.sheet.cssRules.length
					)
				} catch (error) {
					if (config.verbose) {
						console.error(error)
					}
				}

				// Insert pretty-printed CSS for dev mode.
				renderer.sh.appendChild(document.createTextNode(rawCssRule))
			}
		}
	}

	const addAtRule = (rule, atRule) => {
		return `${atRule}{${rule}}`
	}

	function walkDecls(selector, decls, atRule) {
		let index = 0
		const declTuple = Object.entries(decls)

		const recursion = (style) => {
			if (index === declTuple.length) return style
			const [prop, value] = declTuple[index]
			index++
			// console.log('check index', currentDecl)
			if (Array.isArray(value)) {
				const expandedRules = value.reduce((acc, currentValue) => {
					return acc + renderer.decl(prop, currentValue)
				}, '')
				return recursion(style + expandedRules)
			}

			if (R.is(Object, value)) {
				if (isAtRule(prop)) {
					renderer.put(selector, value, prop)
				} else {
					renderer.put(renderer.selector(selector, prop), value, atRule)
				}
				return recursion(style)
			}
			return recursion(style + renderer.decl(prop, value))
		}

		return recursion('')
	}

	renderer.put = async function (selector, decls, atRule) {
		const declInString = walkDecls(selector, decls, atRule)

		if (R.isEmpty(declInString)) {
			return
		}

		const withSelector = addSelector(selector, declInString)

		const withAtRule = atRule ? addAtRule(withSelector, atRule) : withSelector

		renderer.putRaw(withAtRule)
	}

	return renderer
}
