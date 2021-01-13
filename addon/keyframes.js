'use strict'
import { assembleClassName } from './helper'

const buildKeyframe = (obj) => {
	return Object.entries(obj).reduce((acc, [prop, value]) => {
		if (typeof value === 'string') {
			return `${acc}${prop}:${value};`
		}

		return `${acc}${prop}{${buildKeyframe(value)}}`
	}, '')
}

const addOn = function (renderer) {
	const prefixes = ['-webkit-', '-moz-', '-o-']

	const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	renderer.keyframes = function (decls, name) {
		const frameName = assembleClassName(renderer, name)

		prefixedKeyframes.forEach((prefixedKeyframe) => {
			const rawKeyframes = `${frameName} ${frameName}{${decls}}`
			if (renderer.client) {
				renderer.ksh.appendChild(document.createTextNode(rawKeyframes))
			} else {
				renderer.putRaw(rawKeyframes)
			}
		})

		return frameName
	}
}

export default addOn
