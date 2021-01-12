'use strict'

const addonCache = require('./cache').addon

const addOn = function (renderer) {
	if (!renderer.cache) {
		addonCache(renderer)
	}

	if (process.env.NODE_ENV !== 'production') {
		require('./__dev__/warnOnMissingDependencies')('jsx', renderer, [
			'rule',
			'cache'
		])
	}

	renderer.jsx = function (fn, styles, block) {
		let className
		const isElement = typeof fn === 'string'

		// In dev mode emit CSS immediately so correct sourcemaps can be generated.
		if (process.env.NODE_ENV !== 'production') {
			className = renderer.rule(styles, block)
		}

		const Component = function (props) {
			if (!className) {
				className = renderer.rule(styles, block)
			}

			let copy = props
			const $as = copy.$as
			const $ref = copy.$ref

			if (process.env.NODE_ENV !== 'production') {
				copy = renderer.assign({}, props)
			}

			const dynamicClassName = renderer.cache(props.css)
			delete copy.css
			delete copy.$as

			if (isElement || $as) {
				delete copy.$ref
				copy.ref = $ref
			}

			copy.className = (props.className || '') + className + dynamicClassName

			return isElement || $as ? renderer.h($as || fn, copy) : fn(copy)
		}

		if (process.env.NODE_ENV !== 'production') {
			if (block) {
				Component.displayName = `jsx(${block})`
			}
		}

		return Component
	}
}

export default addOn
