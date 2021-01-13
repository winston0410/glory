'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var index = require('../index-6dcda881.js')
var rambda_esm = require('../rambda.esm-7335a530.js')

var _typeof =
	typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
		? function (obj) {
				return typeof obj
		  }
		: function (obj) {
				return obj &&
					typeof Symbol === 'function' &&
					obj.constructor === Symbol &&
					obj !== Symbol.prototype
					? 'symbol'
					: typeof obj
		  }

/* global window self */

var isBrowser =
	typeof window !== 'undefined' && typeof window.document !== 'undefined'

/* eslint-disable no-restricted-globals */
var isWebWorker =
	(typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' &&
	self.constructor &&
	self.constructor.name === 'DedicatedWorkerGlobalScope'
/* eslint-enable no-restricted-globals */

var isNode =
	typeof process !== 'undefined' &&
	process.versions != null &&
	process.versions.node != null

var isBrowser_1 = isBrowser

function hyphenateProperty(property) {
	return index.hyphenateStyleName(property)
}

var __commonJS = (callback, module) => () => {
	if (!module) {
		module = { exports: {} }
		callback(module.exports, module)
	}
	return module.exports
}

// src/generateChar.js
var require_generateChar = __commonJS((exports, module) => {
	function generateChar(chars, currentPass) {
		const str = []
		const recursion = (passingCount) => {
			if (passingCount < chars.length) {
				str.unshift(chars[passingCount])
				return str.join('')
			}
			const charIndex = Math.floor(passingCount / chars.length) - 1
			const remainder = passingCount % chars.length
			str.unshift(chars[remainder])
			return recursion(charIndex)
		}
		return recursion(currentPass)
	}
	module.exports = generateChar
})

// src/index.js
var require_src = __commonJS((exports, module) => {
	var generateChar = require_generateChar()
	function* uniqueStrGenerator(options) {
		let i = 0
		while (true) {
			yield generateChar(options.chars, i)
			i++
		}
	}
	module.exports = uniqueStrGenerator
})
var joli = require_src()

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

const create = function (config) {
	const renderer = {
		raw: '',
		pfx: '',
		client: isBrowser_1,
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

			if (rambda_esm.is(Object, value)) {
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

		if (rambda_esm.isEmpty(declInString)) {
			return
		}

		const withSelector = addSelector(selector, declInString)

		const withAtRule = atRule ? addAtRule(withSelector, atRule) : withSelector

		renderer.putRaw(withAtRule)
	}

	return renderer
}

exports.create = create
