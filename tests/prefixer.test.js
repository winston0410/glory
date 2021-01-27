/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonVirtual from '../src/addon/virtual'
import addonKeyframes from '../src/addon/keyframes'
import addonPrefixer from '../src/addon/prefixer'
const { removeLineAndSpace } = require('./helper.js')
import { prefix } from 'inline-style-prefixer'

function createVirtualNano(config) {
	const nano = create(config)
	addonVirtual(nano)
	addonPrefixer(nano)
	return nano
}

describe('installing prefixer', function() {
	it('should installs without crashing', function() {
		const nano = create()
		addonPrefixer(nano)
		expect(nano).toBeDefined()
	})

	describe('using virtual() interface', function() {
		it('should prefix user-select correctly', function() {
			const nano = createVirtualNano()

			nano.putRaw = jest.fn()

			nano.virtual({
				userSelect: 'none'
			})

			const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')

			const userSelectPrefix = [
				'-ms-user-select',
				'-moz-user-select',
				'-webkit-user-select',
				'user-select'
			]

			userSelectPrefix.forEach(function(key) {
				expect(result.includes(key)).toBe(true)
			})
		})

		it('should not kebab values', function() {
			const nano = createVirtualNano()
			const decl = {
				backgroundImage:
					"url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='48' height='36' viewBox='0 0 48 36' fill='rgb(28,28,28)'%3E%3Crect x='16' y='12' width='16' height='2' /%3E%3Crect x='16' y='17' width='16' height='2' /%3E%3Crect x='16' y='22' width='16' height='2' /%3E%3C/svg>\")"
			}

			nano.putRaw = jest.fn()

			nano.virtual(decl)

			const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')
			const expected =
				"{background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='48' height='36' viewBox='0 0 48 36' fill='rgb(28,28,28)'%3E%3Crect x='16' y='12' width='16' height='2' /%3E%3Crect x='16' y='17' width='16' height='2' /%3E%3Crect x='16' y='22' width='16' height='2' /%3E%3C/svg>\");}"
			expect(result.includes(expected)).toBe(true)
		})

		it('should prefix transform correctly', function() {
			const nano = createVirtualNano()
			const decl = {
				transform: 'translateX(2em) rotate(0.5turn)'
			}

			const mockDecl = {
				transform: 'translateX(2em)'
			}

			nano.putRaw = jest.fn()

			nano.virtual(decl)

			const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')
			const expected =
				'{-webkit-transform: translateX(2em);-ms-transform: translateX(2em);transform:translateX(2em);}'
			// expect(result.includes(expected)).toBe(true)
		})

		it('should prefix ::placeholder', function() {
			const nano = createVirtualNano()

			nano.virtual({
				'::placeholder': {
					fontWeight: 300,
					userSelect: 'none'
				}
			})

			if (env.isServer) {
				const result = nano.raw
				expect(result.includes('::-webkit-input-placeholder')).toBe(true)
				expect(result.includes('::-moz-placeholder')).toBe(true)
				expect(result.includes(':-ms-input-placeholder')).toBe(true)
				expect(result.includes('::placeholder')).toBe(true)
			}
		})
	})

	describe('using keyframes() interface', function() {
		const nano = create()
		addonKeyframes(nano)
		addonPrefixer(nano)

		const mockKeyframe = {
			'from, 20%, 53%, 80%, to': {
				transform: 'translate3d(0,0,0)'
			},
			'40%, 43%': {
				transform: 'translate3d(0, -30px, 0)'
			},
			'70%': {
				transform: 'translate3d(0, -15px, 0)'
			},
			'90%': {
				transform: 'translate3d(0, -4px, 0)'
			}
		}

		it('should prefix style correctly', function() {
			const frameName = nano.keyframes(mockKeyframe)

			if (env.isServer) {
				const result = nano.raw
				// console.log('check result', result)
				//Add test here later
			}
		})
	})
})
