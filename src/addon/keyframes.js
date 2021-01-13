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

const addOn = function (renderer, config = {}) {
	const { prefixes = ['-webkit-', '-moz-', '-o-', ''] } = config

	const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	renderer.keyframes = function (decls, name) {
		const frameName = assembleClassName(renderer, name)

		const rawKeyframes = prefixedKeyframes.reduce((acc, keyframe) => {
			const rawKeyframe = `${keyframe} ${frameName}{${buildKeyframe(decls)}}`
			return acc + rawKeyframe
		}, '')

		if (renderer.client) {
			renderer.ksh.appendChild(document.createTextNode(rawKeyframes))
		} else {
			renderer.putRaw(rawKeyframes)
		}

		return frameName
	}
}

export default addOn
