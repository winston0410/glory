'use strict'

// const styleObjToString = (decls, styleString) => {
//
// }

// const style = Object.entries(decls).reduce((acc, declObj) => {
// 	return renderer.decl(declObj[0], declObj[1], selector, atrule)
// }, '')

// console.log('check style', style)

const { isBrowser } = require('browser-or-node')
const joli = require('@blackblock/joli-string')
const R = require('rambda')

const KEBAB_REGEX = /[A-Z]/g

const generator = joli({
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
})

const isProduction = process.env.NODE_ENV !== 'production'

const declToRule = (selector, str) =>
	isProduction ? `${selector}{${str}}` : `\n${selector} {\n${str}}\n`

exports.create = function(config) {
	const renderer = {
		raw: '',
		pfx: '_',
		client: isBrowser,
		assign: Object.assign,
		kebab: (prop) => prop.replace(KEBAB_REGEX, '-$&').toLowerCase(),
		decl: (key, value) => `${renderer.kebab(key)}:${value};`,
		hash: (obj) => generator.next().value,
		selector: function(parent, selector) {
			console.log('check selector', parent, selector)
			return parent + (selector[0] === ':' ? '' : ' ') + selector
		},
		putRaw: function(rawCssRule) {
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

		renderer.putRaw = function(rawCssRule) {
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

	function fromObjectToString(selector, decls, atrule) {
		return Object.entries(decls).reduce((acc, declObj) => {
			if (R.is(Object, declObj[1])) {
				const nestingSelector = renderer.selector(selector, declObj[0])
				renderer.put(nestingSelector, declObj[1], atrule)
				return acc
			}
			// console.log('check data', acc, declObj)
			return acc + renderer.decl(declObj[0], declObj[1], selector, atrule)
		}, '')
	}

	renderer.put = function(selector, decls, atrule) {
		const declInString = fromObjectToString(selector, decls, atrule)

		const ruleInString = declToRule(selector, declInString)

		if (!R.isEmpty(ruleInString)) {
			renderer.putRaw(atrule ? `${atrule}{${ruleInString}}` : ruleInString)
		}
	}

	renderer.putAt = renderer.put

	return renderer
}

// for (let i = 0; i < postponed.length; i++) {
// 	prop = postponed[i]
//
// 	if (prop[0] === '@' && prop !== '@font-face') {
// 		renderer.putAt(selector, decls[prop], prop)
// 	} else {
// 		renderer.put(renderer.selector(selector, prop), decls[prop], atrule)
// 	}
// }
