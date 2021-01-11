'use strict'

const prefixAll = require('inline-style-prefixer/static')

const CAMEL_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g

const matchCallback = function(match) {
	return match.slice(1).toUpperCase()
}

exports.addon = function(renderer) {
	const decl = renderer.decl
	const origPut = renderer.put

	renderer.camel = function(prop) {
		return prop.replace(CAMEL_REGEX, matchCallback)
	}

	renderer.prefix = function(prop, value) {
		let obj = {}
		obj[renderer.camel(prop)] = value
		obj = prefixAll(obj)

		const result = {}

		for (let propPrefixed in obj) {
			value = obj[propPrefixed]
			if (propPrefixed.slice(0, 2) === 'ms') {
				propPrefixed = `M${propPrefixed.slice(1)}`
			}
			propPrefixed = renderer.kebab(propPrefixed)

			if (value instanceof Array) {
				result[propPrefixed] = value.join(`;${propPrefixed}:`)
			} else {
				result[propPrefixed] = value
			}
		}

		return result
	}

	renderer.decl = function(prop, value) {
		const result = renderer.prefix(prop, value)

		let returned = ''
		Object.keys(result).forEach(function(key) {
			const str = decl(key, value)
			returned += str
		})

		return returned
	}

	function newPut(selector, decls, atrule) {
		const indexed = selector.indexOf('::placeholder')
		if (indexed > -1) {
			const split = selector.split(',')
			if (split.length > 1) {
				split.forEach(function(sp) {
					newPut(sp.trim(), decls, atrule)
				})
				return
			}
			const bareSelect = selector.substring(0, indexed)
			;[
				'::-webkit-input-placeholder',
				'::-moz-placeholder',
				':-ms-input-placeholder',
				':-moz-placeholder'
			].forEach(function(ph) {
				origPut(bareSelect + ph, decls, atrule)
			})
		}
		origPut(selector, decls, atrule)
	}

	renderer.put = newPut
}
