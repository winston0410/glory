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

describe('installing keyframes()', function () {
	it('should become the method of the renderer', function () {
		const nano = createNano()
		expect(typeof nano.keyframes).toBe('function')
	})

	describe('when calling keyframes()', function () {
		it('should return the name of the keyframe', function () {
			const nano = createNano()
			const name = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			const nanoForCoparison = createNano()

			expect(typeof name).toBe('string')
			expect(name).toBe(nanoForCoparison.hash())
			expect(name.length > 0).toBe(true)
		})

		it('should insert the keyframe into the stylesheet', function () {
			const nano = create()

			addonKeyframes(nano, {
				prefixes: ['']
			})

			const putRawMock = jest.spyOn(nano, 'putRaw')

			const name = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			if (env.isServer) {
				expect(nano.raw.includes('to{transform:rotate(360deg);}')).toBe(true)
			}

			expect(putRawMock).toHaveBeenCalledTimes(1)
		})

		describe('when prefixes is not provided', function () {
			it('should insert the keyframe to stylesheet with all prefixes', function () {
				const nano = create()

				addonKeyframes(nano)

				const name = nano.keyframes({
					to: {
						transform: 'rotate(360deg)'
					}
				})

				if (env.isServer) {
					const result = nano.raw
					expect(result.includes('@-webkit-keyframes')).toBe(true)
					expect(result.includes('@-moz-keyframes')).toBe(true)
					expect(result.includes('@-o-keyframes')).toBe(true)
					expect(result.includes('@keyframes')).toBe(true)
				}
			})
		})

		describe('when prefixes is provided', function () {
			it('should insert the keyframe to stylesheet with the provided prefixes', function () {
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

		describe('when keyframes() is called with duplicated declarations', function () {
			it('should not insert identical keyframe into the stylesheet', function () {
				const nano = create()

				addonKeyframes(nano)

				const putRawMock = jest.spyOn(nano, 'putRaw')

				nano.keyframes({
					to: {
						transform: 'rotate(360deg)'
					}
				})

				nano.keyframes({
					to: {
						transform: 'rotate(360deg)'
					}
				})

				expect(nano.putRaw).toHaveBeenCalledTimes(1)
			})
		})
	})
})
