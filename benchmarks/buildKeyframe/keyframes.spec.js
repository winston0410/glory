'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const fakeData = {
	a: {
		b: 'c',
		d: 'e'
	}
}

suite.add('Recursion with reduce', function () {
	require('./reduce')(fakeData)
})

suite.add('Recursion with for-loop', function () {
	require('./forLoop')(fakeData)
})

suite.add('Pure for loop with function', function () {
	require('./forInLoopWithFn')(fakeData)
})

suite.add('Pure for loop without function', function () {
	require('./forInLoopWithoutFn')(fakeData)
})

suite.add('Recursion with array pop and push', function () {
	require('./array')(fakeData)
})

suite.add('JSON.stringify', function () {
	JSON.stringify(fakeData)
		.replace(/,/g, ';')
		.replace(/:(?={)/g, '')
		.replace(/"/g, '')
})

suite.add('fast-stringify', function () {
	require('fast-stringify')(fakeData)
		.replace(/,/g, ';')
		.replace(/:(?={)/g, '')
		.replace(/"/g, '')
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
