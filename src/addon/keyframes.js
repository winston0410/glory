'use strict'
import { assembleClassName, createCache } from '../helper'

const buildKeyframe = (list) => {
	let result = ''
	for (const key in list) {
		result +=
			typeof list[key] === 'string'
				? `${key}:${list[key]};`
				: `${key}{${buildKeyframe(list[key])}}`
	}
	return result
}

const addOn = function (renderer, config = {}) {
	createCache(renderer, 'kcache')

	const { prefixes = ['-webkit-', '-moz-', '-o-', ''] } = config

	const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	renderer.keyframes = function (decls, name) {
		const frameName = assembleClassName(renderer, name)

		let rawKeyframes = ''

		for (const prefixed of prefixedKeyframes) {
			rawKeyframes += `${prefixed} ${frameName}{${buildKeyframe(decls)}}`
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

// const rawKeyframes = prefixedKeyframes.reduce((acc, keyframe) => {
// 	const rawKeyframe = `${keyframe} ${frameName}{${buildKeyframe(decls)}}`
// 	return acc + rawKeyframe
// }, '')
