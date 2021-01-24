/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonKeyframes from '../src/addon/keyframes'

function createNano(config) {
	const nano = create(config)
	addonKeyframes(nano)
	return nano
}

describe('keyframes()', function () {
	it('should become the method of the renderer', function () {
		const nano = createNano()
		expect(typeof nano.keyframes).toBe('function')
	})

	describe('when calling keyframes() with declarations', function () {
		describe('when prefixes is not provided', function () {
			const nano = createNano()
			const putRawMock = jest.spyOn(nano, 'putRaw')
			const name = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			it('should return the name of the keyframe', function () {
				expect(typeof name).toBe('string')
				expect(name.length > 0).toBe(true)
			})

			it('should return a name based on the hash function', function () {
				const nanoForCoparison = createNano()
				expect(name).toBe(nanoForCoparison.hash())
			})

			it('should insert the keyframe into the stylesheet', function () {
				if (env.isServer) {
					expect(nano.raw.includes('to{transform:rotate(360deg);}')).toBe(true)
				}

				expect(putRawMock).toHaveBeenCalledTimes(1)
			})

			it('should insert the keyframe to stylesheet with all prefixes', function () {
				if (env.isServer) {
					const result = nano.raw
					expect(result.includes('@-webkit-keyframes')).toBe(true)
					expect(result.includes('@-moz-keyframes')).toBe(true)
					expect(result.includes('@-o-keyframes')).toBe(true)
					expect(result.includes('@keyframes')).toBe(true)
				}
			})

			describe('when keyframes() is called with duplicated declarations', function () {
				it('should not insert identical keyframe into the stylesheet', function () {
					nano.keyframes({
						to: {
							transform: 'rotate(360deg)'
						}
					})

					expect(nano.putRaw).toHaveBeenCalledTimes(1)
				})
			})
		})

		describe('when prefixes is provided', function () {
			it('should insert the keyframe to stylesheet with the provided prefixes only', function () {
				const nano = create()

				addonKeyframes(nano, {
					prefixes: ['-webkit-', '-moz-', '']
				})

				const name = nano.keyframes({
					to: {
						transform: 'rotate(360deg)'
					}
				})

				if (env.isServer) {
					const result = nano.raw
					expect(result.includes('@-webkit-keyframes')).toBe(true)
					expect(result.includes('@-moz-keyframes')).toBe(true)
					expect(result.includes('@-o-keyframes')).toBe(false)
					expect(result.includes('@keyframes')).toBe(true)
				}
			})
		})
	})

	describe('when calling keyframes() without any argument', function () {
		const nano = createNano()
		const putRawMock = jest.spyOn(nano, 'putRaw')
		const name = nano.keyframes()

		it('should return an empty string', function () {
			expect(name).toBe('')
		})

		it('should not insert anything into the stylesheet', function () {
			expect(nano.putRaw).toHaveBeenCalledTimes(0)
		})
	})
})
