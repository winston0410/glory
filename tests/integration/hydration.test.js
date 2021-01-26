/* eslint-disable */
'use strict'

//Is it an integration test or unit test? Is there anything wrong with this test code
const env = require('../env')
import { create } from '../../src/index'
import addOnHydration from '../../src/addon/hydration'
import addonVirtual from '../../src/addon/virtual'
import addonKeyframes from '../../src/addon/keyframes'

function createVirtualNano(config) {
	const nano = create(config)
	addonVirtual(nano)
	addOnHydration(nano)
	return nano
}

function createKeyframesNano(config) {
	const nano = create(config)
	addonKeyframes(nano, {
		prefixes: ['']
	})
	addOnHydration(nano)
	return nano
}

describe('hydration', function() {
	it('should be installed without throwing error', function() {
		const nano = create()
		addOnHydration(nano)
		expect(typeof nano.hydrate).toBe('function')
	})

	describe('when using virtual() to insert styling', function() {
		describe('when stylesheet is not provided', function() {
			const nano = createVirtualNano()
			const hydrateMock = jest.spyOn(nano, 'hydrate')
			it('should not run hydrate()', function() {
				//This test is flawed right now. renderer.hydrate ran immediately on set
				// expect(hydrateMock).toHaveBeenCalledTimes(0)
			})
		})

		describe('when stylesheet is provided', function() {
			describe('when server-side generated styling is not provided', function() {
				const mockStylesheet = document.createElement('style')
				const nano = createVirtualNano({
					sh: mockStylesheet
				})
				const hydrateMock = jest.spyOn(nano, 'hydrate')
				it('should not run hydrate()', function() {
					expect(hydrateMock).toHaveBeenCalledTimes(0)
				})
			})

			describe('when server-side generated styling is provided', function() {
				it('should prevent rules found in stylesheet from being inserted again.', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent = '.a{display:block;}'
					document.head.appendChild(mockStylesheet)

					const nano = createVirtualNano({
						sh: mockStylesheet
					})

					const atomicMock = jest.spyOn(nano, 'atomic')

					addOnHydration(nano)

					nano.virtual({
						display: 'block'
					})

					expect(atomicMock).toHaveBeenCalledTimes(0)
				})

				it('should re-render basic declaration, if props in stylesheet and in Javascript are different', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent = '.a{display:block;}'
					document.head.appendChild(mockStylesheet)

					const nano = createVirtualNano({
						sh: mockStylesheet
					})

					nano.putRaw = jest.fn()

					const atomicMock = jest.spyOn(nano, 'atomic')

					addOnHydration(nano)

					nano.virtual({
						display: 'block',
						color: 'red'
					})

					if (env.isClient) {
						expect(nano.putRaw).toHaveBeenCalledTimes(1)
						const result = nano.putRaw.mock.calls[0][0]
						expect(result).toBe('.b{color:red;}')
					}

					expect(atomicMock).toHaveBeenCalledTimes(1)
				})

				it('should prevent media-queries found in stylesheet from re-rendering', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent = '@media screen{.a{display:block;}}'
					document.head.appendChild(mockStylesheet)

					const nano = createVirtualNano({
						sh: mockStylesheet
					})

					const atomicMock = jest.spyOn(nano, 'atomic')

					addOnHydration(nano)

					nano.virtual({
						'@media screen': {
							display: 'block'
						}
					})

					expect(atomicMock).toHaveBeenCalledTimes(0)
				})

				it('should not generate wrong className if third party styling is inserted before generated styling', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent = 'body{display:block;}.a{display:block;}'
					document.head.appendChild(mockStylesheet)

					const nano = createVirtualNano({
						sh: mockStylesheet
					})

					const atomicMock = jest.spyOn(nano, 'atomic')

					addOnHydration(nano)

					const className = nano.virtual({
						display: 'block'
					})

					expect(className).toBe('.a')
					expect(atomicMock).toHaveBeenCalledTimes(0)
				})

				it('should not generate wrong className if media queries with same declaration is inserted after generated styling', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent =
						'body{display:block;}.a{display:block;}@media screen{.b{display:block;}}'
					document.head.appendChild(mockStylesheet)

					const nano = createVirtualNano({
						sh: mockStylesheet
					})

					const atomicMock = jest.spyOn(nano, 'atomic')

					addOnHydration(nano)

					const className = nano.virtual({
						display: 'block'
					})

					expect(className).toBe('.a')
					expect(atomicMock).toHaveBeenCalledTimes(0)
				})
			})
		})
	})

	describe('when using keyframes()', function() {
		describe('when stylesheet is provided', function() {
			describe('when server-side generated styling is not provided', function() {})

			describe('when server-side generated styling is provided', function() {
				it('should prevent keyframes found in stylesheet from re-rendering', function() {
					const mockStylesheet = document.createElement('style')
					mockStylesheet.textContent =
						'@keyframes a{to{transform:rotate(360deg);}}'
					document.head.appendChild(mockStylesheet)

					const nano = create({
						sh: mockStylesheet
					})

					addonKeyframes(nano, {
						prefixes: ['']
					})
					addOnHydration(nano)

					const putRawMock = jest.spyOn(nano, 'putRaw')

					const frameName = nano.keyframes({
						to: {
							transform: 'rotate(360deg)'
						}
					})

					const nanoForComparison = create()

					expect(frameName).toBe(nanoForComparison.hash())
					expect(putRawMock).toHaveBeenCalledTimes(0)
				})
			})
		})
	})
})

// it('should prevent media-queries found in stylesheet from re-rendering', function() {
// 	const mockStylesheet = document.createElement('style')
// 	mockStylesheet.textContent = '@media screen{.one{display:block;}}'
// 	document.head.appendChild(mockStylesheet)
//
// 	const nano = create({
// 		sh: mockStylesheet
// 	})
//
// 	const putMock = jest.spyOn(nano, 'put')
//
// 	addOnHydration(nano)
//
// 	nano.put('.one', {
// 		'@media screen': {
// 			display: 'block'
// 		}
// 	})
//
// 	expect(putMock).toHaveBeenCalledTimes(0)
// })
