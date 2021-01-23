'use strict'
import { assembleClassName, assembleKeyframe, createCache } from '../helper'

const addOn = function (renderer, config = {}) {
	createCache(renderer, 'kcache')

	const { prefixes = ['-webkit-', '-moz-', '-o-', ''] } = config

	const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	renderer.keyframes = function (decls, name) {
		// console.log('check parameter', decls, name)
		const frameName = assembleClassName(renderer, name)

		let rawKeyframes = ''

		// console.log('check result', assembleKeyframe(decls))

		for (const prefixed of prefixedKeyframes) {
			rawKeyframes += `${prefixed} ${frameName}{${assembleKeyframe(decls)}}`
		}

		if (renderer.client) {
			renderer.ksh.appendChild(document.createTextNode(rawKeyframes))
		} else {
			renderer.putRaw(rawKeyframes)
		}

		return frameName
	}
}

export default addOn
