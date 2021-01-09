'use strict'
const { isBrowser } = require('browser-or-node')
const joli = require('@blackblock/joli-string')

const KEBAB_REGEX = /[A-Z]/g

const generator = joli({
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
})

exports.create = function(config = {}) {
	const renderer = {
		raw: '',
		pfx: '_',
		client: isBrowser,
		assign: Object.assign,
		kebab: (prop) => prop.replace(KEBAB_REGEX, '-$&').toLowerCase(),
		decl: (key, value) => `${renderer.kebab(key)}:${value};`,
		hash: (obj) => generator.next().value,
		selector: function(parent, selector) {
			console.log('selector function running', parent, selector)
			return parent + (selector[0] === ':' ? '' : ' ') + selector
		},
		...config
	}

	if (!renderer.client) {
		return renderer
	}

	if (renderer.sh) {
		return renderer
	}

	document.head.appendChild((renderer.sh = document.createElement('style')))

	if (process.env.NODE_ENV !== 'production') {
		renderer.sh.setAttribute('data-nano-css-dev', '')

		// Test style sheet used in DEV mode to test if .insetRule() would throw.
		renderer.shTest = document.createElement('style')
		renderer.shTest.setAttribute('data-nano-css-dev-tests', '')
		document.head.appendChild(renderer.shTest)
	}

	return renderer
}
