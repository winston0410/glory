/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addonVirtual from '../src/addon/virtual'
import addonKeyframes from '../src/addon/keyframes'
import addonDefine from '../src/addon/define'

function createGlory(config) {
	const glory = create(config)
	addonVirtual(glory)
	addonDefine(glory)
	return glory
}

describe('experiment', function() {
	const glory = createGlory()

	const style = glory.define((props) => ({
		color: props.danger ? 'red' : 'green'
	}))

	console.log(
		'final result',
		style({
			danger: 'red'
		})
	)

	it('should run', function() {})
})
