/* eslint-disable */
'use strict'

import { create } from '../index'
import addonRule from '../addon/rule'
import joli from '@blackblock/joli-string'

const generator = joli({
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
})

function createNano(config) {
	const nano = create(config)

	addonRule(nano)

	return nano
}

describe('rule()', function () {
	it('installs rule() method', function () {
		const nano = create()

		expect(typeof nano.rule).toBe('undefined')

		addonRule(nano)

		expect(typeof nano.rule).toBe('function')
	})

	it('puts CSS styles', function () {
		const nano = createNano({
			pfx: 'test-'
		})

		nano.put = jest.fn()

		const classNames = nano.rule(
			{
				color: 'red'
			},
			'foobar'
		)

		expect(nano.put).toHaveBeenCalledTimes(1)
		expect(nano.put).toHaveBeenCalledWith('.test-foobar', { color: 'red' })
		expect(classNames).toBe('test-foobar')
	})

	it('generates class name automatically if not specified', function () {
		const nano = createNano({
			pfx: 'test-'
		})

		nano.put = jest.fn()

		const css = { color: 'red' }
		const classNames = nano.rule(css)
		const computed = 'test-' + generator.next().value

		expect(nano.put).toHaveBeenCalledTimes(1)
		expect(nano.put).toHaveBeenCalledWith(`.${classNames}`, css)
		expect(classNames).toBe(computed)
	})
})
