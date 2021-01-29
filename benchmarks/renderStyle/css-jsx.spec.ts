'use strict'
import styled from 'styled-components'
import PrefixerCamouflage from '../../src/addon/prefixer'
import VirtualCamouflage from '../../src/addon/virtual'
import JSXCamouflage from '../../src/addon/jsx'
import React, { createElement } from 'react'
import emotionStyled from '@emotion/styled'
import { styled as gooberStyled } from 'goober'
import { create } from '../../src/index'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()
import { Renderer } from '../../src/type'

const fakeDecl = {
	color: 'red',
	display: 'block',
	'@media (min-width: 1px)': {
		rule: 'all'
	},
	'&:hover': {
		another: 1,
		display: 'space'
	}
}

suite.add('styled component', function() {
	const Component = styled.div(fakeDecl)
	createElement(Component)
})

suite.add('emotion, styled()', function() {
	const Component = emotionStyled.div(fakeDecl)
	createElement(Component)
})

suite.add('goober', function() {
	const Component = gooberStyled('div')(() => fakeDecl)
	createElement(Component)
})

const camouflage = create({
	h: createElement
})

VirtualCamouflage(camouflage)
JSXCamouflage(camouflage)
PrefixerCamouflage(camouflage)

suite.add('camouflage, jsx()', function() {
	const Component = camouflage.jsx('div', (props) => fakeDecl)
	createElement(Component)
})

suite.on('cycle', function(event) {
	console.log(String(event.target))
})

suite.on('complete', function() {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`)
})

suite.run()
