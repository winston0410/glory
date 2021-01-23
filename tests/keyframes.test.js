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

describe('keyframes', function () {
	it('installs interface', function () {
		const nano = createNano()

		expect(typeof nano.keyframes).toBe('function')
	})

	describe('keyframes()', function () {
		it('returns animation name', function () {
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

		it('puts animation CSS', function () {
			const nano = create()

			addonKeyframes(nano, {
				prefixes: ['']
			})

			nano.putRaw = jest.fn()

			const name = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			if (env.isServer) {
				const result = nano.putRaw.mock.calls[0][0]
				console.log('check result', result)
				expect(result.includes('to{transform:rotate(360deg);}')).toBe(true)
				expect(nano.putRaw).toHaveBeenCalledTimes(1)
			}
		})

		it('puts animation CSS with all prefixes', function () {
			const nano = create()

			addonKeyframes(nano, {
				prefixes: ['-webkit-', '-moz-', '']
			})

			nano.putRaw = jest.fn()

			const name = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			if (env.isServer) {
				const result = nano.putRaw.mock.calls[0][0]
				expect(nano.putRaw).toHaveBeenCalledTimes(1)
				expect(result.includes('to{transform:rotate(360deg);}')).toBe(true)
				expect(result.includes('@-webkit-keyframes')).toBe(true)
				expect(result.includes('@-moz-keyframes')).toBe(true)
				expect(result.includes('@-o-keyframes')).toBe(false)
				expect(result.includes('@keyframes')).toBe(true)
			}
		})

		it('caches previous keyframes() result to prevent unnecessary operations', function () {
			const nano = create()

			addonKeyframes(nano, {
				prefixes: ['']
			})

			nano.putRaw = jest.fn()

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

			if (env.isServer) {
				expect(nano.putRaw).toHaveBeenCalledTimes(1)
			}
		})
	})

	//Test for putting @keyframe with nano.put is removed, as keyframes should be handeld by a separate function
})
