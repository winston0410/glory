/* eslint-disable */
'use strict'

import { create } from '../src/index'
import addOnCache from '../src/addon/cache'
import addOnRule from '../src/addon/rule'
import addOnDrule from '../src/addon/drule'

function createNano(config) {
	const nano = create(config)

	addOnCache(nano)
	addOnRule(nano)
	addOnDrule(nano)

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

	it('puts CSS styles', function () {
		const nano = createNano({
			pfx: 'test-'
		})

		nano.put = jest.fn()

		nano.drule(
			{
				color: 'red'
			},
			'foobar'
		)

		expect(nano.put).toHaveBeenCalledTimes(1)
		expect(nano.put).toHaveBeenCalledWith('.test-foobar', { color: 'red' })
		// expect(classNames).toBe('test-foobar')
	})

	it('changes dynamically by callback', function () {
		const nano = createNano({
			pfx: 'test-'
		})

		nano.put = jest.fn()
	})
})
