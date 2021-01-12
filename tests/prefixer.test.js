/* eslint-disable */
'use strict'

const env = require('./env')
const create = require('../index').create
const addonPrefixer = require('../addon/prefixer').addon
const addonNesting = require('../addon/nesting').addon
const { removeLineAndSpace } = require('./helper.js')

function createNano(config) {
	const nano = create(config)

	addonPrefixer(nano)

	return nano
}

describe('prefixer', function() {
	it('installs without crashing', function() {
		const nano = createNano()
		expect(nano).toBeDefined()
	})

	it('handles "user-select" correctly', function() {
		const nano = createNano()

		nano.putRaw = jest.fn()

		nano.put('.one', {
			'user-select': 'none'
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

	// it("doesn't kebab values", function() {
	// 	const nano = createNano()
	// 	const decl = {
	// 		'background-image':
	// 			"url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='48' height='36' viewBox='0 0 48 36' fill='rgb(28,28,28)'%3E%3Crect x='16' y='12' width='16' height='2' /%3E%3Crect x='16' y='17' width='16' height='2' /%3E%3Crect x='16' y='22' width='16' height='2' /%3E%3C/svg>\")"
	// 	}
	//
	// 	nano.putRaw = jest.fn()
	//
	// 	nano.put('.one', decl)
	//
	// 	const result = nano.putRaw.mock.calls[0][0].replace(/ +(?= )/g, '')
	// 	const expected =
	// 		".one{background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='48' height='36' viewBox='0 0 48 36' fill='rgb(28,28,28)'%3E%3Crect x='16' y='12' width='16' height='2' /%3E%3Crect x='16' y='17' width='16' height='2' /%3E%3Crect x='16' y='22' width='16' height='2' /%3E%3C/svg>\");}"
	// 	expect(result).toEqual(expected)
	// })
	//
	it('prefixes "placeholder" correctly', function() {
		const nano = createNano()
		nano.putRaw = jest.fn()

		nano.put('input::placeholder', {
			'font-weight': 300,
			'user-select': 'none'
		})

		const result = nano.putRaw.mock.calls.join(' ').replace(/ +(?= )/g, '')
		;[
			'input::-webkit-input-placeholder',
			'input::-moz-placeholder',
			'input:-ms-input-placeholder',
			'input:-moz-placeholder',
			'::placeholder'
		].forEach(function(key) {
			expect(result.includes(key)).toBe(true)
		})
	})
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
