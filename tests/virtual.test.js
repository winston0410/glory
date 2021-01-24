/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonVirtual from '../src/addon/virtual'
import addonKeyframes from '../src/addon/keyframes'

function createNano(config) {
	const nano = create(config)
	addonVirtual(nano)
	return nano
}

describe('virtual', function () {
	it('should install without crashing', function () {
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

		it('handles at-rules', function () {
			const nano = createNano({
				pfx: '_'
			})

			nano.atomic('color:red;', '', '@media screen')

			if (env.isServer) {
				expect(nano.raw).toBe('@media screen{._a{color:red;}}')
			}
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

		it('should add prefix to className, when pfx is provided', function () {
			const nano = createNano({
				pfx: 'foo-'
			})

			expect(nano.atomic('color:red;')).toBe('foo-a')
		})
	})

	describe('when virtual() is called with declarations', function () {
		it('should inject CSS into stylesheet', function () {
			const nano = createNano({
				pfx: '_'
			})

			const putRawMock = jest.spyOn(nano, 'putRaw')

			const className = nano.virtual({
				color: 'red'
			})

			if (env.isServer) {
				expect(nano.raw).toBe('._a{color:red;}')
			}
			expect(putRawMock).toHaveBeenCalledTimes(1)
		})

		it('should make declarations atomic', function () {
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

		it('should makes declarations in media-queries atomic', function () {
			const nano = createNano({
				pfx: '_'
			})
			const className = nano.virtual({
				'@media screen': {
					color: 'red',
					background: 'black',
					textAlign: 'center'
				}
			})

			expect(className).toBe(' _a _b _c')

			if (env.isServer) {
				expect(nano.raw).toBe(
					'@media screen{._a{color:red;}}@media screen{._b{background:black;}}@media screen{._c{text-align:center;}}'
				)
				// Should optimize output of virtual() to this without harming performance.
				// expect(nano.raw).toBe(
				// 	'@media screen{._a{color:red;}._b{background:black;}._c{text-align:center;}}'
				// )
			}
		})

		describe('when virtual() is called with duplicated declarations', function () {
			const nano = createNano({
				pfx: '_'
			})

			const putRawMock = jest.spyOn(nano, 'putRaw')

			const className = nano.virtual({
				color: 'red'
			})

			const cachedClassName = nano.virtual({
				color: 'red'
			})

			it('should not insert those duplicated into the stylesheet', function () {
				expect(putRawMock).toHaveBeenCalledTimes(1)
			})

			it('should return the className of the existing rule', function () {
				expect(className).toBe(cachedClassName)
			})
		})

		describe('when virtual() is called with duplicated declarations in media-queries', function () {
			const nano = createNano({
				pfx: '_'
			})

			const putRawMock = jest.spyOn(nano, 'putRaw')

			const className = nano.virtual({
				'@media screen': {
					color: 'red'
				}
			})

			const cachedClassName = nano.virtual({
				'@media screen': {
					color: 'red'
				}
			})

			it('should not insert those duplicated into the stylesheet', function () {
				expect(putRawMock).toHaveBeenCalledTimes(1)
			})

			it('should return the className of the existing rule', function () {
				expect(className).toBe(cachedClassName)
			})
		})

		it('should support nesting', function () {
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
				const result = nano.raw
				console.log('get result', result)
				expect(nano.raw.includes('._a')).toBe(true)
				expect(nano.raw.includes('._b')).toBe(true)
				expect(nano.raw.includes(':hover')).toBe(true)
				expect(nano.raw.includes('color:red')).toBe(true)
				expect(nano.raw.includes('color:blue')).toBe(true)
			}
		})

		it('should handle values in array in a single className', function () {
			const nano = createNano({
				pfx: '_'
			})

			const atomic = jest.spyOn(nano, 'atomic')

			const className = nano.virtual({
				display: ['flex', '-webkit-flex']
			})

			expect(className).toBe(' _a')
			expect(atomic).toHaveBeenCalledTimes(1)
			expect(atomic).toHaveBeenCalledWith('display:flex;display:-webkit-flex;')

			if (env.isServer) {
				expect(nano.raw).toBe('._a{display:flex;display:-webkit-flex;}')
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
	})
})
