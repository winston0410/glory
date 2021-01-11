'use strict'

exports.addon = function(renderer, config) {
	if (process.env.NODE_ENV !== 'production') {
		require('./__dev__/warnOnMissingDependencies')('keyframes', renderer, [
			'putRaw',
			'put'
		])
	}

	config = renderer.assign(
		{
			prefixes: ['-webkit-', '-moz-', '-o-', '']
		},
		config || {}
	)

	const prefixes = config.prefixes

	if (renderer.client) {
		// Craete @keyframe Stylesheet `ksh`.
		document.head.appendChild((renderer.ksh = document.createElement('style')))
	}

	const putAt = renderer.putAt

	renderer.putAt = function(__, keyframes, prelude) {
		// @keyframes
		if (prelude[1] === 'k') {
			let str = ''

			for (const keyframe in keyframes) {
				const decls = keyframes[keyframe]
				let strDecls = ''

				for (const prop in decls) strDecls += renderer.decl(prop, decls[prop])

				str += `${keyframe}{${strDecls}}`
			}

			for (let i = 0; i < prefixes.length; i++) {
				const prefix = prefixes[i]
				const rawKeyframes = `${prelude.replace(
					'@keyframes',
					`@${prefix}keyframes`
				)}{${str}}`

				if (renderer.client) {
					renderer.ksh.appendChild(document.createTextNode(rawKeyframes))
				} else {
					renderer.putRaw(rawKeyframes)
				}
			}

			return
		}

		putAt(__, keyframes, prelude)
	}

	renderer.keyframes = function(keyframes, block) {
		if (!block) block = renderer.hash(keyframes)
		block = renderer.pfx + block

		renderer.putAt('', keyframes, `@keyframes ${block}`)

		return block
	}
}
