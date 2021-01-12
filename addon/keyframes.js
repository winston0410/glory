'use strict'
import { cssifyObject } from 'css-in-js-utils'
import { is } from 'rambda'
const buildKeyframe = (obj, str) => {
	const [prop, value] = Object.entries(obj)
	if (!is(Object, value)) return `${str}${prop}:${value};`
	return buildKeyframe
	console.log('check value', prop, value)
	// console.log('check data', prop, value)
}

// const buildKeyframe = (obj, str) => {
// 	const data = Object
// 	.entries(obj)
// 	.reduce((acc, [prop, value]) => {
// 		if(){
//
// 		}
// 	})
//
// 	if() return str
// 	console.log('recursion');
// 	// return buildKeyframe()
// }

const addOn = function (renderer) {
	const prefixes = ['-webkit-', '-moz-', '-o-', '']

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	const origPut = renderer.put

	renderer.put = function (_, decls, atRule) {
		console.log('decls', decls)
		// console.log(cssifyObject(decls))
	}

	// renderer.putAt = function(__, keyframes, prelude) {
	// 	// @keyframes
	// 	if (prelude[1] === 'k') {
	// 		let str = ''
	//
	// 		for (const keyframe in keyframes) {
	// 			const decls = keyframes[keyframe]
	// 			let strDecls = ''
	//
	// 			for (const prop in decls) strDecls += renderer.decl(prop, decls[prop])
	//
	// 			str += `${keyframe}{${strDecls}}`
	// 		}
	//
	// 		for (let i = 0; i < prefixes.length; i++) {
	// 			const prefix = prefixes[i]
	// 			const rawKeyframes = `${prelude.replace(
	// 				'@keyframes',
	// 				`@${prefix}keyframes`
	// 			)}{${str}}`
	//
	// 			if (renderer.client) {
	// 				renderer.ksh.appendChild(document.createTextNode(rawKeyframes))
	// 			} else {
	// 				renderer.putRaw(rawKeyframes)
	// 			}
	// 		}
	//
	// 		return
	// 	}
	//
	// 	putAt(__, keyframes, prelude)
	// }

	renderer.keyframes = function (keyframes, name) {
		// console.log('check keyframes', keyframes, name)
		const frameName = renderer.pfx + (name || renderer.hash(keyframes))

		// console.log('check in keyframes', keyframes)

		const fakeData = {
			a: {
				b: 'c'
			}
		}

		const result = buildKeyframe(fakeData)

		// renderer.put(null, keyframes, `@keyframes ${frameName}`)

		return frameName
	}
}

export default addOn
