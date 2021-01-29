/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnAsync from '../src/addon/async'
import addOnKeyframes from '../src/addon/keyframes'
import addOnVirtual from '../src/addon/virtual'

describe('async()', function() {
	it('should turn functions from sync to async', function() {
		const nano = create()
		addOnVirtual(nano)
		addOnKeyframes(nano)

		expect(nano.keyframes.constructor.name).toBe('Function')
		expect(nano.virtual.constructor.name).toBe('Function')

		addOnAsync(nano)

		expect(nano.keyframes.constructor.name).toBe('AsyncFunction')
		expect(nano.virtual.constructor.name).toBe('AsyncFunction')
	})
})
