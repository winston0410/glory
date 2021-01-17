'use strict'
import { create } from 'nano-css'
import { css, keyframes } from '@emotion/css'
import { create as createCamoflage } from '../src/index'
import PrefixerCamouflage from '../src/addon/prefixer'
import RuleCamouflage from '../src/addon/rule'
import KeyframeCamouflage from '../src/addon/keyframes'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const mockKeyframe = {
	'from, 20%, 53%, 80%, to': {
		transform: 'translate3d(0,0,0)'
	},
	'40%, 43%': {
		transform: 'translate3d(0, -30px, 0)'
	},
	'70%': {
		transform: 'translate3d(0, -15px, 0)'
	},
	'90%': {
		transform: 'translate3d(0, -4px, 0)'
	}
}

suite.add('emotion', function () {
	const className = keyframes(mockKeyframe)
})

suite.add('camouflage', function () {
	const camouflage = createCamoflage()

	RuleCamouflage(camouflage)
	PrefixerCamouflage(camouflage)
	KeyframeCamouflage(camouflage)

	const className = camouflage.keyframes(mockKeyframe)
})

suite.on('cycle', function (event) {
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
