/* eslint-disable */
'use strict'

import { create } from '../index'
import addOnCache from '../addon/cache'
import addOnRule from '../addon/rule'
import addOnDrule from '../addon/drule'

function createNano(config) {
	const nano = create(config)

	addonRule(nano)

	return nano
}

describe('drule()', function () {
	it('installs drule() method', function () {
		const nano = create()

		expect(typeof nano.drule).toBe('undefined')

		addOnCache(nano)
		addOnRule(nano)
		addOnDrule(nano)

		expect(typeof nano.drule).toBe('function')
	})
})
