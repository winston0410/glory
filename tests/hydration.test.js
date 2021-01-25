/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnHydration from '../src/addon/hydration'

function createNano(config) {
	const nano = create(config)
	addOnHydration(nano)
	return nano
}

describe('hydration', function() {
	it('should be installed without throwing error', function() {
		const nano = createNano()
		expect(typeof nano.hydrate).toBe('function')
	})

	describe('when stylesheet is not provided', function() {
		const nano = createNano()
		addOnHydration(nano)
		const hydrateMock = jest.spyOn(nano, 'hydrate')
		it('should not throw', function() {
			expect(() => addOnHydration(nano)).not.toThrow()
		})

		it('should not run hydrate()', function() {
			expect(hydrateMock).toHaveBeenCalledTimes(0)
		})
	})

	describe('when stylesheet is provided', function() {
		describe('when server-side generated styling is not provided', function() {
			const mockStylesheet = document.createElement('style')
			const nano = createNano({
				sh: mockStylesheet
			})
			const hydrateMock = jest.spyOn(nano, 'hydrate')
			it('should run hydrate()', function() {
				// expect(hydrateMock).toHaveBeenCalledTimes(1)
			})

			it('should not throw', function() {})
		})

		describe('when server-side generated styling is provided', function() {
			const mockStylesheet = document.createElement('style')
			mockStylesheet.textContent = '.a{display:block;}'
			const nano = createNano({
				sh: mockStylesheet
			})
			const hydrateMock = jest.spyOn(nano, 'hydrate')
			it('should run hydrate()', function() {
				// expect(hydrateMock).toHaveBeenCalledTimes(1)
			})
		})
	})
})
