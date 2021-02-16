/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnJsx from '../src/addon/jsx'
import addOnVirtual from '../src/addon/virtual'
import React, { createElement } from 'react'
import safeIsObj from 'safe-is-obj'
import ReactTestRenderer from 'react-test-renderer'
import { isValidElementType } from 'react-is'

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

				const returnValue = ReactTestRenderer.create(<Component />).toJSON()
				it('should return a component that returns null', function() {
					expect(isValidElementType(Component)).toBe(true)
					expect(returnValue).toBe(null)
				})

				it('should not insert anything into the stylesheet', function() {
					expect(putRawMock).toHaveBeenCalledTimes(0)
				})
			})

			describe('when string is provided as TagName', function() {
				const nano = createNano({
					h: createElement
				})
				const putRawMock = jest.spyOn(nano, 'putRaw')
				const Component = nano.jsx('h1')

				it('should return a framework component', function() {
					expect(isValidElementType(Component)).toBe(true)
				})

				describe('when styling callback is not provided', function() {
					it('should not insert anything into the stylesheet', function() {
						expect(putRawMock).toHaveBeenCalledTimes(0)
					})
				})
			})

			describe('when string is provided as TagName', function() {
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
								expect(typeof result.props.className).toBe('string')
								expect(result.props.className.length).toBeGreaterThan(0)
							})

							it('should inject styling into stylesheet', function() {
								expect(putRawMock).toHaveBeenCalledTimes(1)
							})

							describe('when as prop is set', function() {
								const result = ReactTestRenderer.create(
									<Component as={'p'}>Hello</Component>
								).toJSON()
								it('should change the tag name of the component', function() {
									expect(result.type).toBe('p')
								})
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
							// expect(() => nano.jsx('h2', 'Hello')).toThrow()
							// expect(() => nano.jsx('h1', 123)).toThrow()
							// expect(() => nano.jsx('h1', [])).toThrow()
						})
					})
				})
			})

			describe('when a component is provided as Tagname', function (){
				describe('when a function is provided as styling callback', function (){
					describe('when styling callback returns an object', function (){

						const glory = createNano({
							h: createElement
						})
						const putRawMock = jest.spyOn(glory, 'putRaw')

						const WithFont = glory.jsx('p', () => ({
							fontSize: '32px'
						}))

						const WithColor = glory.jsx(WithFont, () => ({
							color: 'red'
						}))

						it('should create a component that inherits styling from the previous component', function (){
							const result = ReactTestRenderer.create(
								<WithColor>Hello</WithColor>
							).toJSON()

							console.log('check result', result)

							expect(result.type).toBe('p')
							expect(result.props).toEqual({
								className: ' a b'
							})
							expect(result.children).toEqual(['Hello'])
						})
					})
				})
			})
		})
	})
})
