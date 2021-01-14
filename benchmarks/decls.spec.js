'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const fakeClassName = '.foo2'

const fakeDecl = {
	color: 'red',
	textDecoration: 'underline',
	'border-radius': '5px'
}

suite.add('Recursion with manual index increase', function () {
	require('./buildDecls/recursion')(fakeClassName, fakeDecl)
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
