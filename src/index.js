'use strict'
import { isBrowser } from 'browser-or-node'
import joli from '@blackblock/joli-string'
import greenlet from 'greenlet'
const isProduction = process.env.NODE_ENV === 'production'

const shouldAddSpace = (selector) =>
	selector[0] === '@' || selector[0] === ':' ? selector : ` ${selector}`

const create = function (config) {
	const renderer = {
		raw: '',
		pfx: '',
		client: isBrowser,
		hasher: joli,
		hashChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',
		selector: (parent, selector) => {
			return parent + shouldAddSpace(selector)
		},
		...config
	}

	renderer.hash = renderer.hasher(renderer.hashChars)

	if (renderer.client) {
		if (!renderer.sh) {
			renderer.sh = document.createElement('style')
			document.head.appendChild(renderer.sh)
		}

		if (!isProduction) {
			renderer.sh.setAttribute('data-nano-css-dev', '')
			renderer.shTest = document.createElement('style')
			renderer.shTest.setAttribute('data-nano-css-dev-tests', '')
			document.head.appendChild(renderer.shTest)
		}
	}

	if (renderer.client) {
		renderer.putRaw = async function (rawCssRule) {
			if (isProduction) {
				const sheet = renderer.sh.sheet
				// await console.log('from microtask')
				try {
					sheet.insertRule(rawCssRule, sheet.cssRules.length)
				} catch (error) {
					console.log(error)
				}
			} else {
				try {
					renderer.shTest.sheet.insertRule(
						rawCssRule,
						renderer.shTest.sheet.cssRules.length
					)
				} catch (error) {
					console.error(error)
				}
				renderer.sh.appendChild(document.createTextNode(rawCssRule))
			}
		}
	} else {
		renderer.putRaw = async function (rawCssRule) {
			renderer.raw += rawCssRule
		}
	}

	return renderer
}

export { create }
