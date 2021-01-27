'use strict'
import styled from 'styled-components'
import { create as createCamoflage } from '../../src/index'
import PrefixerCamouflage from '../../src/addon/prefixer'
import VirtualCamouflage from '../../src/addon/virtual'
import JSXCamouflage from '../../src/addon/jsx'
import React, { createElement } from 'react'
import emotionStyled from '@emotion/styled'
import { styled as gooberStyled } from 'goober'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

const fakeDecl = {
	color: 'red',
	display: 'block'
}

suite.add('styled component', function() {
	const Component = styled.div(fakeDecl)
})

suite.add('emotion, styled()', function() {
	const Component = emotionStyled.div(fakeDecl)
})

suite.add('goober', function() {
	const Component = gooberStyled('div')(() => fakeDecl)
})

const camouflage = createCamoflage({
	h: createElement
})

VirtualCamouflage(camouflage)
JSXCamouflage(camouflage)
PrefixerCamouflage(camouflage)

suite.add('camouflage, jsx()', function() {
	const Component = camouflage.jsx('div', (props) => fakeDecl)
})

suite.on('cycle', function(event) {
	console.log(String(event.target))
})

suite.on('complete', function() {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
