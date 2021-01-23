/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnHydration from '../src/addon/hydration'
import addOnRule from '../src/addon/rule'
import addonVirtual from '../src/addon/virtual'
import addonKeyframes from '../src/addon/keyframes'

function createRuleNano(config) {
	const nano = create(config)
	addOnRule(nano)
	addOnHydration(nano)
	return nano
}

function createVirtualNano(config) {
	const nano = create(config)
	addonVirtual(nano)
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

describe('hydration', function () {
	describe('when using put() or rule()', function () {
		it('should prevent basic declaration found in stylesheet from re-rendering', function () {
			const mockStylesheet = document.createElement('style')
			mockStylesheet.textContent = '.one{display:block;}'
			document.head.appendChild(mockStylesheet)

			const nano = createRuleNano({
				sh: mockStylesheet
			})

			const putMock = jest.spyOn(nano, 'put')

			nano.put('.one', {
				display: 'block'
			})

			expect(putMock).toHaveBeenCalledTimes(0)
		})

		it('should re-render basic declaration, if props in stylesheet and in Javascript are different', function () {
			const mockStylesheet = document.createElement('style')
			mockStylesheet.textContent = '.one{display:block;}'
			document.head.appendChild(mockStylesheet)

			const nano = createRuleNano({
				sh: mockStylesheet
			})

			const putMock = jest.spyOn(nano, 'put')

			nano.put('.one', {
				display: 'block',
				color: 'red'
			})

			expect(putMock).toHaveBeenCalledTimes(1)
		})
	})

	describe('when using virtual()', function () {
		it('should prevent basic declaration found in stylesheet from re-rendering', function () {
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

		it('should re-render basic declaration, if props in stylesheet and in Javascript are different', function () {
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

		it('should prevent media-queries found in stylesheet from re-rendering', function () {
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

		it('should not generate wrong className if third party styling is inserted before generated styling', function () {
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

	describe('when using keyframes()', function () {
		it('should prevent keyframes found in stylesheet from re-rendering', function () {
			const mockStylesheet = document.createElement('style')
			mockStylesheet.textContent = '@keyframes a{to{transform:rotate(360deg);}}'
			document.head.appendChild(mockStylesheet)

			// console.log(mockStylesheet.cssRules || mockStylesheet.sheet.cssRules)

			const nano = create({
				ksh: mockStylesheet
			})

			addonKeyframes(nano, {
				prefixes: ['']
			})
			addOnHydration(nano)

			const keyframesMock = jest.spyOn(nano, 'keyframes')

			const frameName = nano.keyframes({
				to: {
					transform: 'rotate(360deg)'
				}
			})

			const nanoForComparison = create()

			expect(frameName).toBe(nanoForComparison.hash())
			// expect(keyframesMock).toHaveBeenCalledTimes(0)
		})
	})
})
