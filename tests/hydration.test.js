/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnHydration from '../src/addon/hydration'

describe('hydration', function () {
	it('should prevent basic declaration found in stylesheet from re-rendering', function () {
		const mockStylesheet = document.createElement('style')
		mockStylesheet.textContent = '.one{display:block;}'
		document.head.appendChild(mockStylesheet)

		const nano = create({
			sh: mockStylesheet
		})

		const putMock = jest.spyOn(nano, 'put')

		addOnHydration(nano)

		nano.put('.one', {
			display: 'block'
		})

		expect(putMock).toHaveBeenCalledTimes(0)
	})

	// it('should re-render basic declaration, if props in stylesheet and in Javascript are different', function() {
	// 	const mockStylesheet = document.createElement('style')
	// 	mockStylesheet.textContent = '.one{display:block;}'
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
	// 		display: 'block',
	// 		color: 'red'
	// 	})
	//
	// 	// expect(putMock).toHaveBeenCalledTimes(1)
	// })

	it('should prevent media-queries found in stylesheet from re-rendering', function () {
		const mockStylesheet = document.createElement('style')
		mockStylesheet.textContent =
			'@media screen{.one{display:block;}}.two{color:#be132d;}'
		document.head.appendChild(mockStylesheet)

		const nano = create({
			sh: mockStylesheet
		})

		const putMock = jest.spyOn(nano, 'put')

		addOnHydration(nano)

		nano.put('.one', {
			'@media screen': {
				display: 'block'
			}
		})

		expect(putMock).toHaveBeenCalledTimes(0)
	})

	// it('should prevent keyframes found in stylesheet from re-rendering', function() {
	//
	// })
})
