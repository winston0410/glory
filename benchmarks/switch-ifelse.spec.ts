'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const input:string = 'hello'

suite.add('switch', function() {
	switch (input) {
		case 'hello':
			return 'world'
			break
		case 'hi':
			return 'bye'
			break
		case 'foo':
			return 'bar'
			break
		default:
			return 'nothing'
	}
})

suite.add('if...else', function() {
	if (input === 'hello') return 'world'
	else if (input === 'hi') return 'bye'
	else if (input === 'foo') return 'bar'
	else return 'nothing'
})

const objDict = {
	hello: 'world',
	hi: 'bye',
	foo: 'bar'
}

suite.add('object literal', function() {
	objDict[input]
})

suite.on('cycle', function(event) {
	console.log(String(event.target))
})

suite.on('complete', function() {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
