'use strict'
import { isBrowser } from 'browser-or-node'
import { hyphenateProperty } from 'css-in-js-utils'
import joli from '@blackblock/joli-string'
import { isEmpty } from 'rambda'
import safeIsObj from 'safe-is-obj'
import { isAtRule } from './helper'
const generator = joli({
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
})

const isProduction = process.env.NODE_ENV !== 'production'

const addSelector = (selector, str) => {
	return isProduction ? `${selector}{${str}}` : `\n${selector} {\n${str}}\n`
}

const shouldAddSpace = (selector) => {
	if (selector[0] === '@' || selector[0] === ':') {
		return selector
	}

	return ` ${selector}`
}

function buildDecls(renderer, selector, decls, atRule) {
	let result = ''
	for (const prop in decls) {
		const value = decls[prop]
		if (Array.isArray(value)) {
			const expandedRules = value.reduce(
				(acc, currentValue) => acc + renderer.decl(prop, currentValue),
				''
			)
			result += expandedRules
		} else if (safeIsObj(value)) {
			if (isAtRule(prop)) {
				result += renderer.put(selector, value, prop)
			} else {
				result += renderer.put(renderer.selector(selector, prop), value, atRule)
			}
		} else {
			result += `${hyphenateProperty(prop)}:${value};`
		}
	}
	return result
}

const create = function (config) {
	const renderer = {
		raw: '',
		pfx: '',
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

	renderer.put = function (selector, decls, atRule) {
		const declInString = buildDecls(renderer, selector, decls, atRule)

		if (isEmpty(declInString)) {
			return ''
		}

		const withSelector = addSelector(selector, declInString)

		const withAtRule = atRule ? addAtRule(withSelector, atRule) : withSelector

		renderer.putRaw(withAtRule)

		return ''
	}

	return renderer
}

export { create }
