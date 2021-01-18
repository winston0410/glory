'use strict'

const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()
// eslint-disable-next-line
const { create } = require('../../src/index')

const fakeClassName = '.foo2'

const fakeDecl = {
	color: 'red',
	textDecoration: 'underline',
	'border-radius': '5px',
	display: ['block', 'flex'],
	'.foo': {
		color: 'red'
	},
	'@media screen': {
		color: 'blue'
	}
}

const nano = create()

suite.add('Recursion with manual index increase', function () {
	require('./recursion')(nano, fakeClassName, fakeDecl)
})

suite.add('Recursion with for in loop', function () {
	require('./forInLoop')(nano, fakeClassName, fakeDecl)
})

suite.add('Handle array value with for...in loop', function () {
	require('./handleArrayWithForInLoop')(nano, fakeClassName, fakeDecl)
})

suite.add('use macro task', function () {
	require('./useMacroTask')(nano, fakeClassName, fakeDecl)
})

suite.on('cycle', function (event) {
	if (event.target.error) {
		console.log(event.error)
	}
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
