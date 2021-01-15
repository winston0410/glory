'use strict'
import { create } from 'nano-css'
import { css } from '@emotion/css'
import { create as createCamoflage } from '../src/index'
import PrefixerCamouflage from '../src/addon/prefixer'
import RuleCamouflage from '../src/addon/rule'
import { css as gooberCss } from 'goober'
const { addon: Rule } = require('nano-css/addon/rule')
const { addon: Cache } = require('nano-css/addon/cache')
const { addon: Prefixer } = require('nano-css/addon/prefixer')
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const mockStyle = {
	backgroundColor: 'hotpink',
	'&:hover': {
		color: 'darkgreen'
	}
}

suite.add('nano-css', function () {
	const nano = create()

	Rule(nano)
	Prefixer(nano)

	const className = nano.rule(mockStyle)
})

suite.add('emotion', function () {
	const className = css(mockStyle)
})

suite.add('goober', function () {
	const className = gooberCss(mockStyle)
})

suite.add('camouflage', function () {
	const camouflage = createCamoflage()

	RuleCamouflage(camouflage)
	PrefixerCamouflage(camouflage)

	const className = camouflage.rule(mockStyle)
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
