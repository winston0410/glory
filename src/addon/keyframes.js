'use strict'
import { assembleClassName, assembleKeyframe, createCache } from '../helper'

const addOn = function (renderer, config = {}) {
	createCache(renderer, 'kcache')

	const { prefixes = ['-webkit-', '-moz-', '-o-', ''] } = config

	const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

	renderer.keyframes = function (decls, name) {
		const frameContent = assembleKeyframe(decls)
		if (renderer.kcache[frameContent]) {
			return renderer.kcache[frameContent]
		}

		const frameName = assembleClassName(renderer, name)
		renderer.kcache[frameContent] = frameName

		let rawKeyframes = ''

		for (const prefixed of prefixedKeyframes) {
			rawKeyframes += `${prefixed} ${frameName}{${frameContent}}`
		}

		renderer.putRaw(rawKeyframes)

		return frameName
	}
}

export default addOn
