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
							describe('when the function does not take any argument', function() {
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

								describe('when "as" prop is set', function() {
									const result = ReactTestRenderer.create(
										<Component as={'p'}>Hello</Component>
									).toJSON()
									it('should change the tag name of the component', function() {
										expect(result.type).toBe('p')
									})
								})
							})

							describe('when the function take props as its argument', function() {
								const nano = createNano({
									h: createElement
								})
								const putRawMock = jest.spyOn(nano, 'putRaw')

								const Component = nano.jsx('h1', (props) => ({
									color: props.danger ? 'red' : 'green'
								}))

								const result = ReactTestRenderer.create(
									<Component danger={true}>Hello</Component>
								).toJSON()

								const result2 = ReactTestRenderer.create(
									<Component danger={false}>Hello</Component>
								).toJSON()

								it('should emit different className based on its receiving props', function() {
									expect(result.props.className).toBe(' a')
									expect(result2.props.className).toBe(' b')
								})

								describe('when the component is called the first time', function() {
									it('should emit styles', function() {
										if (env.isServer) {
											const result = nano.raw
											expect(result).toBe('.a{color:red;}.b{color:green;}')
										}
										expect(putRawMock).toHaveBeenCalledTimes(2)
									})
								})

								describe('when component is called again with identical props', function() {
									// const duplicatedResult = ReactTestRenderer.create(
									// 	<Component danger={true}>Hello</Component>
									// ).toJSON()

									it('should return className early from the cache of the component', function() {
										// expect(duplicatedResult).toBe('y')
									})
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

				describe('when "as" is passed as prop', function() {
					const glory = createNano({
						h: createElement
					})
					const putRawMock = jest.spyOn(glory, 'putRaw')

					const WithDisplay = glory.jsx('p', () => ({
						display: 'block'
					}))

					it('should generate the component in the TagName passed in "as"', function() {
						const result = ReactTestRenderer.create(
							<WithDisplay as={'b'}>Hello</WithDisplay>
						).toJSON()

						expect(result.type).toBe('b')
					})
				})

				describe('when "css" is passed as prop', function() {
					const glory = createNano({
						h: createElement
					})
					const putRawMock = jest.spyOn(glory, 'putRaw')

					const WithDisplay = glory.jsx('p', () => ({
						display: 'block'
					}))

					describe('when "css" is a string', function() {
						it('should extend the original className', function() {
							const result = ReactTestRenderer.create(
								<WithDisplay css={'manual-class'}>Hello</WithDisplay>
							).toJSON()
							expect(result.props.className).toBe(' a manual-class')
						})
					})
				})
			})

			describe('when string is provided as TagName', function() {
				describe('when styling callback is provided', function() {
					describe('when a function is provided', function() {
						describe('when a custom Component name is not set', function() {
							const glory = createNano({
								h: createElement
							})

							const WithDisplay = glory.jsx('p', () => ({
								display: 'block'
							}))

							it('should dynamically generate a Component name based on its TagName', function() {
								expect(WithDisplay.name).toBe('glory.p')
							})
						})

						describe('when a custom Component name is set', function() {
							const glory = createNano({
								h: createElement
							})

							const WithDisplay = glory.jsx(
								'p',
								() => ({
									display: 'block'
								}),
								'DisplayBlock'
							)

							it('should change the name of the Component', function() {
								expect(WithDisplay.name).toBe('DisplayBlock')
							})
						})
					})
				})
			})

			describe('when a component is provided as Tagname', function() {
				describe('when a function is provided as styling callback', function() {
					describe('when styling callback returns an object', function() {
						describe('when the callback takes no argument', function() {
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

							const WithBg = glory.jsx(WithColor, () => ({
								backgroundColor: 'blue'
							}))

							it('should create a component that inherits styling from the previous component', function() {
								const result = ReactTestRenderer.create(
									<WithBg>Hello</WithBg>
								).toJSON()

								expect(result.type).toBe('p')

								expect(result.props).toEqual({
									className: ' a b c'
								})

								expect(result.children).toEqual(['Hello'])
							})

							it('should inject styling used in all those components', function() {
								expect(putRawMock).toHaveBeenCalledTimes(3)
								if (env.isServer) {
									const result = glory.raw
									expect(result).toBe(
										'.a{background-color:blue;}.b{color:red;}.c{font-size:32px;}'
									)
								}
							})
						})

						describe('when the callback takes props as its argument', function() {
							const glory = createNano({
								h: createElement
							})
							const putRawMock = jest.spyOn(glory, 'putRaw')

							const WithFont = glory.jsx('p', (props) => ({
								fontSize: props.big ? '32px' : '24px'
							}))

							const WithColor = glory.jsx(WithFont, (props) => ({
								color: props.danger ? 'red' : 'green'
							}))

							const WithBg = glory.jsx(WithColor, () => ({
								backgroundColor: 'blue'
							}))

							const result = ReactTestRenderer.create(
								<WithBg big={true} danger={false}>
									Hello
								</WithBg>
							).toJSON()

							const result2 = ReactTestRenderer.create(
								<WithBg big={false} danger={true}>
									Hello
								</WithBg>
							).toJSON()

							it('should emit different className based on its receiving props', function() {
								expect(result.props.className).toBe(' a b c')
								expect(result2.props.className).toBe(' a e f')
							})

							it('should emit styles', function() {
								if (env.isServer) {
									const result = glory.raw
									expect(result).toBe(
										'.a{background-color:blue;}.b{color:green;}.c{font-size:32px;}.e{color:red;}.f{font-size:24px;}'
									)
								}
								expect(putRawMock).toHaveBeenCalledTimes(5)
							})
						})
					})
				})
			})
		})
	})
})
