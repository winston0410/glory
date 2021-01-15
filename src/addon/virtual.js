'use strict'

const createMemoizer = function (pfx) {
	let offset = 10
	let msb = 35
	let power = 1

	const self = {
		cache: {},
		length: 0,

		next: function () {
			const vcount = self.length + offset

			if (vcount === msb) {
				offset += (msb + 1) * 9
				msb = Math.pow(36, ++power) - 1
			}
			self.length++

			return vcount
		},

		get: function () {
			let curr = self.cache
			const lastIndex = arguments.length - 1
			const lastStep = arguments[lastIndex]

			for (let i = 0; i < lastIndex; i++) {
				const step = arguments[i] || '_'

				if (!curr[step]) curr[step] = {}
				curr = curr[step]
			}

			if (!curr[lastStep]) curr[lastStep] = pfx + self.next().toString(36)

			return curr[lastStep]
		}
	}

	return self
}

const addOn = function (renderer) {
	renderer.memo = createMemoizer(renderer.pfx)

	renderer.atomic = function (selectorTemplate, rawDecl, atrule) {
		const memo = renderer.memo
		const memoLength = memo.length
		const className = memo.get(atrule, selectorTemplate, rawDecl)

		console.log('check memo', memo, className)

		if (memoLength < memo.length) {
			const selector = selectorTemplate.replace(/&/g, `.${className}`)
			let str = `${selector}{${rawDecl}}`

			if (atrule) {
				str = `${atrule}{${str}}`
			}

			renderer.putRaw(str)
		}

		return className
	}

	renderer.virtual = function (selectorTemplate, decls, atrule) {
		selectorTemplate = selectorTemplate || '&'

		let classNames = ''

		for (const prop in decls) {
			const value = decls[prop]

			if (prop.indexOf('keyframes') > -1) {
				renderer.putAt('', value, prop)
				continue
			}

			if (value instanceof Object && !(value instanceof Array)) {
				if (prop[0] === '@') {
					classNames += renderer.virtual(selectorTemplate, value, prop)
				} else {
					classNames += renderer.virtual(
						renderer.selector(selectorTemplate, prop),
						value,
						atrule
					)
				}
			} else {
				const rawDecl = renderer.decl(prop, value)
				const rawDecls = rawDecl.split(';')

				for (let i = 0; i < rawDecls.length; i++) {
					const d = rawDecls[i]
					if (d)
						classNames += ` ${renderer.atomic(selectorTemplate, d, atrule)}`
				}
			}
		}

		return classNames
	}

	renderer.rule = function (decls) {
		return renderer.virtual('&', decls)
	}
}

export default addOn
