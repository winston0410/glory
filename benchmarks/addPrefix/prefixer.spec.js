'use strict'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()
// eslint-disable-next-line
import { prefix as prefixAll } from 'inline-style-prefixer'
const { create } = require('../../src/index')

const fakeClassName = '.foo2'

const fakeDecl = {
	display: 'flex',
	'padding-top': '100px'
}

const nano = create()

suite.add('Allow both kebab-case and camelCase as prop', function () {
	require('./both')(fakeDecl)
})

suite.add('Only allow camelCase as prop', function () {
	prefixAll(fakeDecl)
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
