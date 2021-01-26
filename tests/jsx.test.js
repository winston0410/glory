/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnJsx from '../src/addon/jsx'
import addOnVirtual from '../src/addon/virtual'
import { createElement } from 'react'

function createNano(config) {
	const nano = create(config)

	addOnVirtual(nano)
	addOnJsx(nano)

	return nano
}

describe('jsx()', function() {
	it('should become the method of the renderer', function() {
		const nano = createNano()
		expect(typeof nano.jsx).toBe('function')
	})

	describe('when jsx factory function is not set', function() {
		const nano = createNano({
			h: undefined
		})
		describe('when jsx() is called', function() {
			it('should throw', function() {
				expect(() => nano.jsx()).toThrow()
			})
		})
	})

	describe('when jsx factory function is set', function() {
		const nano = createNano({
			h: createElement
		})

		describe('when calling jsx()', function() {
			describe('when TagName is not provided as an argument', function() {
				const Component = nano.jsx()
				const putRawMock = jest.spyOn(nano, 'putRaw')

				it('should return a function that returns null', function() {
					expect(typeof Component()).toBe(null)
				})

				it('should not insert anything into the stylesheet', function() {
					expect(nano.putRaw).toHaveBeenCalledTimes(0)
				})
			})

			describe('when TagName is provided as an argument', function() {
				const Component = nano.jsx('h1')

				// console.log('check value', Component());

				it('should return a function that returns an object', function() {
					expect(typeof Component()).toBe('object')
				})

				describe('when styling callback is not provided as an argument', function() {
					it('should not insert anything into the stylesheet', function() {
						expect(nano.putRaw).toHaveBeenCalledTimes(0)
					})
				})
			})
		})

		// describe('when calling jsx() with an argument', function() {
		// 	describe('when the argument is not an object', function() {
		// 		const nano = createNano()
		// 		const putRawMock = jest.spyOn(nano, 'putRaw')
		//
		// 		const num = nano.jsx(1)
		// 		const str = nano.jsx('hello-world')
		// 		const arr = nano.jsx([])
		//
		// 		it('should return an empty string', function() {
		// 			expect(num).toBe('')
		// 			expect(str).toBe('')
		// 			expect(arr).toBe('')
		// 		})
		//
		// 		it('should not inject anything into the stylesheet', function() {
		// 			expect(putRawMock).toHaveBeenCalledTimes(0)
		// 		})
		// 	})
		//
		// 	describe('when the argument is an object', function() {})
		// })
	})
})
