/* eslint-disable */
'use strict'

const env = require('./env')
const create = require('../index').create

function findCssRuleAndDelete(selector) {
	const sheets = document.styleSheets

	for (let i = 0; i < sheets.length; i++) {
		const sheet = sheets[i]

		if (!sheet.cssRules) continue

		for (let j = 0; j < sheet.cssRules.length; j++) {
			const rule = sheet.cssRules[j]

			if (rule.selectorText === selector) {
				sheet.deleteRule(j)

				return rule
			}
		}
	}

	return null
}

describe('nano-css', function() {
	it('exists', function() {
		expect(typeof create).toBe('function')
	})

	it('can create renderer', function() {
		const nano = create()

		expect(typeof nano).toBe('object')
		//Not sure if they should be delete or not
		// expect(typeof nano.putRaw).toBe('function')
		// expect(typeof nano.put).toBe('function')
	})

	it('default prefix is "_"', function() {
		expect(create().pfx).toBe('_')
	})

	it('default assign function is Object.assign', function() {
		expect(create().assign).toBe(Object.assign)
	})

	it('has no default hyperscript function', function() {
		expect(create().h).toBe(undefined)
	})

	it('can set configuration', function() {
		const assign = function() {
			return Object.assign.apply(Object, arguments)
		}
		const h = function() {}
		const stringify = function() {}
		const nano = create({
			pfx: 'hello-',
			h: h,
			assign: assign,
			stringify: stringify
		})

		expect(nano.pfx).toBe('hello-')
		expect(nano.h).toBe(h)
		expect(nano.assign).toBe(assign)
		expect(nano.stringify).toBe(stringify)
	})
})
