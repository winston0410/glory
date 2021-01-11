/* eslint-disable */
'use strict'

const env = require('./env')
const create = require('../index').create
const addonRule = require('../addon/rule').addon
const addonCache = require('../addon/cache').addon
const addonJsx = require('../addon/jsx').addon

function createNano(config) {
	const nano = create(config)

	addonRule(nano)
	addonCache(nano)
	addonJsx(nano)

	return nano
}

describe('jsx()', function () {
	it('installs interface', function () {
		const nano = createNano()

		expect(typeof nano.jsx).toBe('function')
	})

	it('creates a styling block', function () {
		const nano = createNano()
		const Comp = nano.jsx('button', { color: 'red' })

		expect(typeof Comp).toBe('function')
	})
})
