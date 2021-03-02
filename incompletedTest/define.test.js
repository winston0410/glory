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

describe('define', function() {
	describe('when given a single argument', function() {
		describe('when the argument is object', function() {
			const glory = createGlory()

			const putRawMock = jest.spyOn(glory, 'putRaw')

			const obj = {
				color: 'red',
				fontSize: '20px'
			}

			const style = glory.define(obj)

			it('should return the original arugment', function() {
				// expect(style).toEqual(obj)
			})

			it('should define styles in that object in cache', function() {
				// expect(Object.keys(glory.cache).length).toBe(2)
				// expect(glory.cache['a']).toBe('.a{color:red;}')
				// expect(glory.cache['b']).toBe('.b{font-size:20px;}')
			})

			it('should inject styling', function() {
				// expect(putRawMock).toHaveBeenCalledTimes(2)
				if (env.isServer) {
					// expect(glory.raw).toBe('.a{color:red;}.b{font-size:20px;}')
				}
			})
		})

		describe('when the argument is not an object', function() {
			const glory = createGlory()

			const putRawMock = jest.spyOn(glory, 'putRaw')

			const obj = 'not sure why I inserted string here'

			const style = glory.define(obj)

			it('should', function() {})
		})
	})

	// describe('when given multiple arguments', function (){
	// 	describe('when the arguments are object', function (){
	// 		it('should return the concatenated object', function (){
	//
	// 		})
	//
	// 		it('should define styles from those objects in cache', function (){
	//
	// 		})
	//
	// 		it('should inject styling', function (){
	//
	// 		})
	// 	})
	//
	// 	describe('when the arguments are not object', function (){
	//
	// 	})
	// })

	describe('when given multiple arguments', function() {
		describe('when the arguments are functions', function() {
			// const glory = createGlory()
			//
			// const putRawMock = jest.spyOn(glory, 'putRaw')
			//
			// const color = (props) => ({
			// 	color: (props.danger) ? 'red' : 'green'
			// })
			//
			// const fontWeight = (props) => ({
			// 	fontWeight: (props.danger) ? 'bold' : 'normal'
			// })
			//
			// const dynamicStyle = glory.define(color, fontWeight)

			it('should return the concatenated object', function() {})

			it('should define styles from those objects in cache', function() {})

			it('should inject styling', function() {})
		})

		describe('when the arguments are not functions', function() {})
	})
})

// it('should allow extending a virtual()', function (){
// 	const glory = createGlory()
//
// 	const putRawMock = jest.spyOn(glory, 'putRaw')
//
// 	const fontSizeStyle = glory.virtual({
// 		fontSize: '20px',
// 	})
//
// 	const colorStyle = glory.virtual({
// 		fontSize: '30px',
// 		color: 'red'
// 	})
//
// 	const finalStyle = glory.define(fontSizeStyle, colorStyle)
//
// 	if (env.isServer) {
// 		console.log(glory.raw)
// 	}
// 	// expect(putRawMock).toHaveBeenCalledTimes(1)
// })
