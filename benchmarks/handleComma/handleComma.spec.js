'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const fakeData = [
    '.foo',
    '.one,.two'
]

suite.add('Map join', function () {
	require('./mapJoin')(...fakeData)
})

suite.add('Replace regex', function () {
	require('./replaceRegex')(...fakeData)
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
