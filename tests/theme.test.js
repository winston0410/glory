/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import themeAddon from '../src/addon/theme'

const createNano = () => {
	const nano = create()
	themeAddon(nano)
	return nano
}

describe('theme()', function() {
	it('should set methods for getting and setting theme in renderer', function() {
		const nano = createNano()

		expect(typeof nano.getTheme).toBe('function')
		expect(typeof nano.setTheme).toBe('function')
		expect(typeof nano.selectTheme).toBe('function')
	})

	describe('setTheme()', function() {
		it('should set a theme in store', function() {
			const nano = createNano()

			const darkTheme = {
				xl: '20',
				'2xl': '30'
			}

			nano.setTheme('dark', darkTheme)

			nano.selectTheme('dark')

			nano.getTheme((theme) => {
				expect(theme).toStrictEqual(darkTheme)
			})
		})
	})

	describe('selectTheme()', function() {
		describe('when called with an existing theme name', function() {
			it('should select the current theme from store', function() {
				const nano = createNano()

				const darkTheme = {
					color: 'black'
				}

				const lightTheme = {
					color: 'white'
				}

				nano.setTheme('dark', darkTheme)

				nano.setTheme('light', lightTheme)

				nano.selectTheme('dark')

				nano.getTheme((theme) => {
					expect(theme).toStrictEqual(darkTheme)
				})

				nano.selectTheme('light')

				nano.getTheme((theme) => {
					expect(theme).toStrictEqual(lightTheme)
				})
			})
		})

		describe('when called with a non-existing theme name', function() {
			it('should', function() {})
		})
	})

	describe('getTheme()', function() {
		it('should expose current theme in callback', function() {
			const nano = createNano()

			const darkTheme = {
				color: 'black'
			}

			nano.setTheme('dark', darkTheme)

			nano.selectTheme('dark')

			nano.getTheme((theme) => {
				expect(theme).toStrictEqual(darkTheme)
			})
		})
	})
})
