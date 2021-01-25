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

	describe('when virtual() is called with an argument', function () {
		describe('when the argument is not an object', function () {
			const nano = createNano()
			const putRawMock = jest.spyOn(nano, 'putRaw')

			const num = nano.virtual(1)
			const str = nano.virtual('hello-world')
			const arr = nano.virtual([])

			it('should return an empty string', function () {
				expect(num).toBe('')
				expect(str).toBe('')
				expect(arr).toBe('')
			})

			it('should not inject anything into the stylesheet', function () {
				expect(putRawMock).toHaveBeenCalledTimes(0)
			})
		})

		describe('when the argument is an object', function () {
			describe('when that object is empty', function () {
				const nano = createNano()
				const putRawMock = jest.spyOn(nano, 'putRaw')
				const obj = nano.virtual({})

				it('should return an empty string', function () {
					expect(obj).toBe('')
				})

				it('should not inject anything into the stylesheet', function () {
					expect(putRawMock).toHaveBeenCalledTimes(0)
				})
			})

			describe('when that object is not empty', function () {
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

				describe('when a nesting object is passed in as value of a declaration', function () {
					const nano = createNano({
						pfx: '_'
					})
					const className = nano.virtual({
						color: 'red',
						':hover': {
							color: 'blue'
						}
					})
					it('should create atomic css', function () {
						expect(className).toBe(' _a _b')
					})

					it('should make the prop of that nesting object declaration to be the selector', function () {
						if (env.isServer) {
							const result = nano.raw
							expect(nano.raw.includes('._b:hover{color:blue;}')).toBe(true)
						}
					})
				})

				describe('when an array is passed in as value of a declaration', function () {
					const nano = createNano({
						pfx: '_'
					})

					const atomic = jest.spyOn(nano, 'atomic')

					const className = nano.virtual({
						display: ['flex', '-webkit-flex']
					})

					it('should expand value of that array using the same prop', function () {
						if (env.isServer) {
							expect(nano.raw.includes('display:flex;')).toBe(true)
							expect(nano.raw.includes('display:-webkit-flex;')).toBe(true)
						}
					})

					it('should handle values of that array in a single rule and className', function () {
						expect(className).toBe(' _a')
						expect(atomic).toHaveBeenCalledTimes(1)
					})
				})

				it('should handle multiple styles', function () {
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
	})

	describe('when virtual() is called without declarations', function () {
		const nano = createNano()
		const putRawMock = jest.spyOn(nano, 'putRaw')
		const name = nano.virtual()

		it('should return an empty string', function () {
			expect(name).toBe('')
		})

		it('should not insert anything into the stylesheet', function () {
			expect(nano.putRaw).toHaveBeenCalledTimes(0)
		})
	})
})
