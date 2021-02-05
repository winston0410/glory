'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()
// eslint-disable-next-line
const { create } = require('../../src/index')

const fakeDecl = {
	display: 'flex',
	paddingTop: '100px',
	color: ['blue', 'red', 'yellow'],
	':hover': {
		fontSize: '10px'
	}
}

const nano1 = create()
const nano2 = create()

require('./rendererCache').default(nano1)
require('./variableCache').default(nano2)

suite.add('Use renderer property as object cache', function () {
	nano1.virtual(fakeDecl)
})

suite.add('Use a variable as object cache', function () {
	nano2.virtual(fakeDecl)
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
