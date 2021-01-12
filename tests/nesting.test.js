/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../index'
import addonNesting from '../addon/nesting'

function createNano(config) {
	const nano = create(config)

	addonNesting(nano)

	return nano
}

describe('nesting', function () {
	it('installs without crashing', function () {
		const nano = createNano()
	})

	it('prepends selectors if no & operand', function () {
		const nano = createNano()

		nano.putRaw = jest.fn()

		nano.put('.foo', {
			'.one,.two': {
				color: 'tomato'
			}
		})

		expect(nano.putRaw.mock.calls[0][0].includes('.foo .one,.foo .two')).toBe(
			true
		)
	})

	it('expands & operand after', function () {
		const nano = createNano()

		nano.putRaw = jest.fn()

		nano.put('.one, #two', {
			'.foo &': {
				color: 'tomato'
			}
		})

		const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')

		expect(result.includes('.foo .one,.foo #two')).toBe(true)
	})

	it('expands & operand before', function () {
		const nano = createNano()

		nano.putRaw = jest.fn()
		nano.put('.foo', {
			'&:hover': {
				color: 'tomato'
			},
			'& .bar': {
				color: 'tomato'
			}
		})

		const css1 = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')
		const css2 = nano.putRaw.mock.calls[1][0].replace(/ +(?= )/g, '')

		expect(css1.includes('.foo:hover')).toBe(true)
		expect(css2.includes('.foo .bar')).toBe(true)
	})

	it('expands multiple & operands', function () {
		const nano = createNano()

		nano.putRaw = jest.fn()
		nano.put('.foo', {
			'& + &': {
				color: 'tomato'
			}
		})

		const css1 = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')

		expect(css1.includes('.foo + .foo')).toBe(true)
	})
})
