/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnAsync from '../src/addon/async'
import addOnKeyframes from '../src/addon/keyframes'
import addOnVirtual from '../src/addon/virtual'

describe('async()', function() {
	it('should turn functions from sync to async', async function() {
		const nano = create()
		addOnVirtual(nano)
		addOnKeyframes(nano)

		expect(nano.keyframes.constructor.name).toBe('Function')
		expect(nano.virtual.constructor.name).toBe('Function')

		addOnAsync(nano)

		expect(nano.keyframes.constructor.name).toBe('AsyncFunction')
		expect(nano.virtual.constructor.name).toBe('AsyncFunction')
	})

	describe('when using an async keyframes()', function() {
		it('should insert the keyframe into the stylesheet', async function() {
			const nano = create()
			addOnKeyframes(nano)
			addOnAsync(nano)

			const putRawMock = jest.spyOn(nano, 'putRaw')
			const name = await nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			if (env.isServer) {
				expect(nano.raw.includes('to{transform:rotate(360deg);}')).toBe(true)
			}

			expect(putRawMock).toHaveBeenCalledTimes(1)
		})
	})

	describe('when using an async virtual()', function() {
		it('should inject CSS into stylesheet', async function() {
			const nano = create()
			addOnVirtual(nano)
			addOnAsync(nano)

			const putRawMock = jest.spyOn(nano, 'putRaw')

			const className = await nano.virtual({
				color: 'red'
			})

			if (env.isServer) {
				expect(nano.raw).toBe('.a{color:red;}')
			}
			expect(putRawMock).toHaveBeenCalledTimes(1)
		})
	})
})
