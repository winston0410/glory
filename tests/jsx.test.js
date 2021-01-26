/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnJsx from '../src/addon/jsx'
import addOnVirtual from '../src/addon/virtual'
import React, { createElement } from 'react'
import safeIsObj from 'safe-is-obj'
import ReactTestRenderer from 'react-test-renderer'

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
		describe('when calling jsx()', function() {
			describe('when TagName is not provided as an argument', function() {
				const nano = createNano({
					h: createElement
				})
				const putRawMock = jest.spyOn(nano, 'putRaw')
				const Component = nano.jsx()

				it('should return a function that returns null', function() {
					//Cannot use typeof here as typeof null = object
					expect(Component()).toBe(null)
				})

				it('should not insert anything into the stylesheet', function() {
					expect(putRawMock).toHaveBeenCalledTimes(0)
				})
			})

			describe('when TagName is provided as an argument', function() {
				const nano = createNano({
					h: createElement
				})
				const putRawMock = jest.spyOn(nano, 'putRaw')
				const Component = nano.jsx('h1')

				//TODO: Fix render result

				// const returnValue = Component()
				//
				// it('should return a function that returns an object for rendering in framework', function() {
				// 	expect(safeIsObj(returnValue)).toBe(true)
				// })

				describe('when styling callback is not provided', function() {
					it('should not insert anything into the stylesheet', function() {
						expect(putRawMock).toHaveBeenCalledTimes(0)
					})
				})
			})

			describe('when TagName is provided as an argument', function() {
				describe('when styling callback is provided', function() {
					describe('when a function is provided', function() {
						describe('when the function returns an object', function() {
							const nano = createNano({
								h: createElement
							})
							const putRawMock = jest.spyOn(nano, 'putRaw')

							const Component = nano.jsx('h1', (props) => ({
								color: 'red'
							}))

							const result = ReactTestRenderer.create(
								<Component>Hello</Component>
							).toJSON()

							it('should add className to the component', function() {
								expect(result.props.className).toBeDefined()
								expect(typeof result.props.className).toBe('string')
							})

							it('should inject styling into stylesheet', function() {
								expect(putRawMock).toHaveBeenCalledTimes(1)
							})
						})

						describe('when the function does not return an object', function() {
							const nano = createNano({
								h: createElement
							})
							const putRawMock = jest.spyOn(nano, 'putRaw')
							const Str = nano.jsx('h1', () => {
								return 'hello'
							})
							const Num = nano.jsx('h1', () => {
								return 123124
							})
							const Arr = nano.jsx('h1', () => {
								return []
							})
							it('should not inject styling into stylesheet', function() {
								expect(putRawMock).toHaveBeenCalledTimes(0)
							})
						})
					})

					describe('when value in type other than function is provided', function() {
						const nano = createNano({
							h: createElement
						})

						it('should throw error', function() {
							// expect(() => nano.jsx('h1', 'Hello')).toThrow()
							// expect(() => nano.jsx('h1', 123)).toThrow()
							// expect(() => nano.jsx('h1', [])).toThrow()
						})
					})
				})
			})
		})
	})
})
