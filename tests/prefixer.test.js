/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonVirtual from '../src/addon/virtual'
import addonPrefixer from '../src/addon/prefixer'
const { removeLineAndSpace } = require('./helper.js')
import { prefix } from 'inline-style-prefixer'

function createVirtualNano(config) {
	const nano = create(config)
	addonVirtual(nano)
	addonPrefixer(nano)
	return nano
}

describe('installing prefixer', function () {
	it('should installs without crashing', function () {
		const nano = create()
		addonPrefixer(nano)
		expect(nano).toBeDefined()
	})

	describe('using virtual() interface', function () {
		it('handles "user-select" correctly', function () {
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

			userSelectPrefix.forEach(function (key) {
				expect(result.includes(key)).toBe(true)
			})
		})

		it("doesn't kebab values", function () {
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

		it('prefixes transform correctly', function () {
			const nano = createVirtualNano()
			const decl = {
				transform: 'translateX(2em) rotate(0.5turn)'
			}

			const mockDecl = {
				transform: 'translateX(2em)'
			}

			// console.log('prefixer result', prefix(mockDecl))

			nano.putRaw = jest.fn()

			nano.virtual(decl)

			const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')
			const expected =
				'{-webkit-transform: translateX(2em);-ms-transform: translateX(2em);transform:translateX(2em);}'
			expect(result.includes(expected)).toBe(true)
		})
	})

	describe('using keyframes() interface', function () {
		//Add test here later
	})
	//
	// it('prefixes "placeholder" correctly', function() {
	// 	const nano = createNano()
	// 	nano.putRaw = jest.fn()
	//
	// 	nano.put('input::placeholder', {
	// 		fontWeight: 300,
	// 		userSelect: 'none'
	// 	})
	//
	// 	const result = nano.putRaw.mock.calls.join(' ').replace(/ +(?= )/g, '')
	//
	// 	const prefixList = [
	// 		'input::-webkit-input-placeholder',
	// 		'input::-moz-placeholder',
	// 		'input:-ms-input-placeholder',
	// 		'input:-moz-placeholder',
	// 		'::placeholder'
	// 	]
	//
	// 	prefixList.forEach(function(key) {
	// 		expect(result.includes(key)).toBe(true)
	// 	})
	// })

	//
	// it('prefixes "placeholder" in nested rules correctly', function() {
	// 	const nano = createNano()
	// 	addonNesting(nano)
	// 	nano.putRaw = jest.fn()
	//
	// 	nano.put('input[type=email]', {
	// 		'&::placeholder': {
	// 			color: '#393939',
	// 			fontWeight: 300
	// 		}
	// 	})
	//
	// 	const result = nano.putRaw.mock.calls.join(' ').replace(/ +(?= )/g, '')
	// 	;[
	// 		'::-webkit-input-placeholder',
	// 		'::-moz-placeholder',
	// 		':-ms-input-placeholder',
	// 		':-moz-placeholder',
	// 		'::placeholder'
	// 	].forEach(function(key) {
	// 		expect(result.includes(key)).toBe(true)
	// 	})
	// })
	//
	// it('prefixes "placeholder" in compound rules correctly', function() {
	// 	const nano = createNano()
	// 	nano.putRaw = jest.fn()
	//
	// 	nano.put(
	// 		'input[type=email]::placeholder, input[type=password]::placeholder, input[type=text]::placeholder',
	// 		{
	// 			color: '#393939',
	// 			fontWeight: 300
	// 		}
	// 	)
	//
	// 	const calls = nano.putRaw.mock.calls
	// 	expect(calls).toHaveLength(15)
	//
	// 	const result = nano.putRaw.mock.calls.join(' ').replace(/ +(?= )/g, '')
	// 	const rawResult =
	// 		'input[type=email]::-webkit-input-placeholder{color:#393939;font-weight:300;} input[type=email]::-moz-placeholder{color:#393939;font-weight:300;} input[type=email]:-ms-input-placeholder{color:#393939;font-weight:300;} input[type=email]:-moz-placeholder{color:#393939;font-weight:300;} input[type=email]::placeholder{color:#393939;font-weight:300;} input[type=password]::-webkit-input-placeholder{color:#393939;font-weight:300;} input[type=password]::-moz-placeholder{color:#393939;font-weight:300;} input[type=password]:-ms-input-placeholder{color:#393939;font-weight:300;} input[type=password]:-moz-placeholder{color:#393939;font-weight:300;} input[type=password]::placeholder{color:#393939;font-weight:300;} input[type=text]::-webkit-input-placeholder{color:#393939;font-weight:300;} input[type=text]::-moz-placeholder{color:#393939;font-weight:300;} input[type=text]:-ms-input-placeholder{color:#393939;font-weight:300;} input[type=text]:-moz-placeholder{color:#393939;font-weight:300;} input[type=text]::placeholder{color:#393939;font-weight:300;}'
	//
	// 	expect(result).toEqual(rawResult)
	// })
})
