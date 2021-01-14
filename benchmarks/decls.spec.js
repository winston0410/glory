'use strict'
// require('@babel/register')({
// 	plugins: ['@babel/plugin-transform-modules-commonjs']
// })
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()
// eslint-disable-next-line
const { create } = require('../src/index')

const fakeClassName = '.foo2'

const fakeDecl = {
	color: 'red',
	textDecoration: 'underline',
	'border-radius': '5px'
}

const nano = create()

// const fakeRenderer = {
// 	put: () => {
//
// 	},
// 	selector: () => {
//
// 	},
// }

suite.add('Recursion with manual index increase', function () {
	require('./buildDecls/recursion')(nano, fakeClassName, fakeDecl)
})

suite.add('Recursion with for in loop', function () {
	require('./buildDecls/forInLoop')(nano, fakeClassName, fakeDecl)
})

suite.on('cycle', function (event) {
	if (event.error) {
		console.log(event.error)
	}
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
