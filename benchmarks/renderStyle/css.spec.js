'use strict'
import { create } from 'nano-css'
import { css } from '@emotion/css'
import { create as createCamoflage } from '../../src/index'
import PrefixerCamouflage from '../../src/addon/prefixer'
import RuleCamouflage from '../../src/addon/rule'
import VirtualCamouflage from '../../src/addon/virtual'
import { css as gooberCss } from 'goober'
import { prefix as addPrefix } from 'inline-style-prefixer'
import { StyleSheet, css as aphroditeCss } from 'aphrodite'
// import jss from 'jss'
// import jssPreset from 'jss-preset-default'
// jss.setup(jssPreset())
import { Server as StyletronServer } from 'styletron-engine-atomic'
import { createRenderer as felaRenderer } from 'fela'
const { addon: Rule } = require('nano-css/addon/rule')
const { addon: Virtual } = require('nano-css/addon/virtual')
const { addon: Prefixer } = require('nano-css/addon/prefixer')
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const mockStyle = {
	backgroundColor: 'hotpink',
	'&:hover': {
		color: 'darkgreen'
	}
}

const nano = create()

Rule(nano)

suite.add('nano-css("^5.3.1"), rule()', function () {
	const className = nano.rule(mockStyle)
})

const nano2 = create()

Rule(nano2)
Virtual(nano2)

suite.add('nano-css("^5.3.1"), virtual()', function () {
	const className = nano2.virtual('&', mockStyle)
})

suite.add('emotion("^11.1.3")', function () {
	const className = css(mockStyle)
})

const instance = new StyletronServer()

suite.add('styletron("^1.4.6")', function () {
	const className = instance.renderStyle(mockStyle)
})

const fela = felaRenderer()

suite.add('fela("^11.5.2")', function () {
	const className = fela.renderRule(() => mockStyle)
})

const camouflage = createCamoflage()

RuleCamouflage(camouflage)

suite.add('camouflage, rule()', function () {
	const className = camouflage.rule(mockStyle)
})

const camouflage2 = createCamoflage()

VirtualCamouflage(camouflage2)
PrefixerCamouflage(camouflage2)

suite.add('camouflage, virtual()', function () {
	const className = camouflage2.virtual(mockStyle)
})

suite.on('cycle', function (event) {
	if (event.target.error) {
		console.log(event.target.error)
	}
	console.log(String(event.target))
})

suite.on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
