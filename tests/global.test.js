/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonGlobal from '../src/addon/global'

function createGlory(config) {
	const glory = create(config)
	addonGlobal(glory)
	return glory
}

describe('global()', function() {
	describe('when the provided declaration is not an object', function() {
		const glory = createGlory()

		const putRawMock = jest.spyOn(glory, 'putRaw')

		const returnValue = glory.global([], ['a', 'p'])

		it('should return null', function() {
			expect(returnValue).toBe(null)
		})

		it('should not insert any style to global', function() {
			expect(putRawMock).toHaveBeenCalledTimes(0)
		})
	})

	describe('when a declaration object is provided', function() {
		const glory = createGlory()

		const putRawMock = jest.spyOn(glory, 'putRaw')

		const returnValue = glory.global(
			{
				color: 'red',
				fontSize: '20px'
			},
			['a', 'p']
		)

		it('should return null', function() {
			expect(returnValue).toBe(null)
		})

		it('should inject styling to global', function() {
			if (env.isServer) {
				expect(glory.raw).toBe('a,p{color:red;font-size:20px;}')
			}
			expect(putRawMock).toHaveBeenCalledTimes(1)
		})
	})
})
