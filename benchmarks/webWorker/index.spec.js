'use strict'
const { Benchmark } = require('benchmark')
const Worker = require('tiny-worker')
const suite = new Benchmark.Suite()
const add = require('./add.js')
const C = require('comlink')
const workerAdd = C.wrap(new Worker('add.js'))

suite.add('Use main thread', function () {
	add(3, 9)
})

suite.add('Use worker thread', function () {
	workerAdd(3, 9)
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
