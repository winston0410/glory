/* eslint-disable */
'use strict'

import { create } from '../src/index'
import addOnCache from '../src/addon/cache'
import addOnRule from '../src/addon/rule'

function createNano(config) {
	const nano = create(config)

	addOnCache(nano)
	addOnRule(nano)

	return nano
}

describe('drule()', function () {
	it('installs drule() method', function () {
		const nano = create()

		expect(typeof nano.cache).toBe('undefined')

		addOnCache(nano)
		addOnRule(nano)

		expect(typeof nano.cache).toBe('function')
	})
})
