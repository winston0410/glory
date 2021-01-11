/* eslint-disable */
'use strict'

const env = require('./env')
const create = require('../index').create
// const addonArray = require('../addon/array').addon

function createNano(config) {
	const nano = create(config)
	return nano
}

describe('prefixer', function() {
	it('installs without crashing', function() {
		const nano = createNano()
		expect(nano).toBeDefined()
	})

	it('handles array values correctly', function() {
		const nano = createNano()

		nano.putRaw = jest.fn()

		nano.put('.one', {
			display: ['flex', '-webkit-flex']
		})

		expect(nano.putRaw).toHaveBeenCalledTimes(1)
		const result = nano.putRaw.mock.calls[0][0].replace(/[\s\n]+/g, '')

		expect(result).toBe('.one{display:flex;display:-webkit-flex;}')
	})
})
