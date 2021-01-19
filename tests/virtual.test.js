/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonRule from '../src/addon/rule'
import addonVirtual from '../src/addon/virtual'
import addonKeyframes from '../src/addon/keyframes'

function createNano(config) {
	const nano = create(config)

	addonRule(nano)
	addonVirtual(nano)

	return nano
}

describe('virtual', function () {
	it('installs interface', function () {
		const nano = createNano()

		expect(typeof nano.atomic).toBe('function')
		expect(typeof nano.virtual).toBe('function')
	})

	describe('atomic()', function () {
		it('injects raw styles', function () {
			const nano = createNano({
				pfx: '_'
			})

			const className = nano.atomic('color:red;', '')

			expect(className).toBe('_a')

			if (env.isServer) {
				expect(nano.raw).toBe('._a{color:red;}')
			}
		})

		it('increments ID', function () {
			const nano = createNano({
				pfx: '_'
			})

			expect(nano.atomic('color:red;')).toBe('_a')
			expect(nano.atomic('color:blue;')).toBe('_b')
			expect(nano.atomic('color:green;')).toBe('_c')

			if (env.isServer) {
				expect(nano.raw).toBe(
					'._a{color:red;}._b{color:blue;}._c{color:green;}'
				)
			}
		})

		it('caches basic declarations', function () {
			const nano = createNano({
				pfx: '_'
			})

			expect(nano.atomic('color:red;')).toBe('_a')
			expect(nano.atomic('color:red;')).toBe('_a')
		})

		it('at-rules', function () {
			const nano = createNano({
				pfx: '_'
			})

			nano.atomic('color:red;', '', '@media screen')

			if (env.isServer) {
				expect(nano.raw).toBe('@media screen{._a{color:red;}}')
			}
		})

		it('caches at-rules', function () {
			const nano = createNano({
				pfx: '_'
			})

			const className = nano.atomic('color:red;', '', '@media screen')

			const cachedClassName = nano.atomic('color:red;', '', '@media screen')

			expect(className).toBe(cachedClassName)
		})

		it('handles pesudo-classes', function () {
			const nano = createNano({
				pfx: '_'
			})

			expect(nano.atomic('color:red;', ':hover', '@media screen')).toBe('_a')

			if (env.isServer) {
				expect(nano.raw).toBe('@media screen{._a:hover{color:red;}}')
			}
		})

		it('prefixes class names', function () {
			const nano = createNano({
				pfx: 'foo-'
			})

			expect(nano.atomic('color:red;')).toBe('foo-a')
		})
	})

	describe('virtual()', function () {
		it('injects CSS', function () {
			const nano = createNano({
				pfx: '_'
			})
			const className = nano.virtual({
				color: 'red'
			})

			expect(className).toBe(' _a')
			if (env.isServer) {
				expect(nano.raw).toBe('._a{color:red;}')
			}
		})

		it('makes styles atomic', function () {
			const nano = createNano({
				pfx: '_'
			})
			const className = nano.virtual({
				color: 'red',
				background: 'black',
				textAlign: 'center'
			})

			expect(className).toBe(' _a _b _c')

			if (env.isServer) {
				expect(nano.raw.includes('color:red')).toBe(true)
				expect(nano.raw.includes('background:black')).toBe(true)
				expect(nano.raw.includes('text-align:center')).toBe(true)
			}
		})

		it('allows nesting', function () {
			const nano = createNano({
				pfx: '_'
			})
			const className = nano.virtual({
				color: 'red',
				':hover': {
					color: 'blue'
				}
			})

			expect(className).toBe(' _a _b')

			if (env.isServer) {
				expect(nano.raw.includes('._a')).toBe(true)
				expect(nano.raw.includes('._b')).toBe(true)
				expect(nano.raw.includes(':hover')).toBe(true)
				expect(nano.raw.includes('color:red')).toBe(true)
				expect(nano.raw.includes('color:blue')).toBe(true)
			}
		})

		it('multiple styles', function () {
			const nano = createNano()

			nano.atomic = jest.fn()

			const className = nano.virtual({
				color: 'tomato',
				border: '1px solid red',
				margin: '10px auto',
				padding: '0',
				':focus': {
					color: 'blue'
				},
				'@media screen': {
					textAlign: 'right',
					cursor: 'pointer'
				}
			})

			expect(nano.atomic).toHaveBeenCalledTimes(7)
		})

		it('extrapolates array values', function () {
			const nano = createNano()

			nano.atomic = jest.fn()

			const className = nano.virtual({
				color: ['blue', 'red']
			})

			expect(nano.atomic).toHaveBeenCalledTimes(2)
			expect(nano.atomic).toHaveBeenCalledWith('color:blue;')
			expect(nano.atomic).toHaveBeenCalledWith('color:red;')
		})
	})
})
