'use strict'
import styled from 'styled-components'
import PrefixerCamouflage from '../../src/addon/prefixer.ts'
import VirtualCamouflage from '../../src/addon/virtual.ts'
import JSXCamouflage from '../../src/addon/jsx.ts'
import React, { createElement } from 'react'
import emotionStyled from '@emotion/styled'
import { styled as gooberStyled } from 'goober'
import { create } from '../../src/index.ts'
const { Benchmark } = require('benchmark')
const suite = new Benchmark.Suite()

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
