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
	require('./buildKeyframe/reduce')(fakeData)
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
