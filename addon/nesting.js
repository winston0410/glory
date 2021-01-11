'use strict'

exports.addon = function(renderer) {
	renderer.selector = function(parentSelectors, selector) {
		const parents = parentSelectors.split(',')
		const result = []
		const selectors = selector.split(',')
		const len1 = parents.length
		const len2 = selectors.length
		let i, j, sel, pos, parent, replacedSelector

		for (i = 0; i < len2; i++) {
			sel = selectors[i]
			pos = sel.indexOf('&')

			if (pos > -1) {
				for (j = 0; j < len1; j++) {
					parent = parents[j]
					replacedSelector = sel.replace(/&/g, parent)
					result.push(replacedSelector)
				}
			} else {
				for (j = 0; j < len1; j++) {
					parent = parents[j]

					if (parent) {
						result.push(`${parent} ${sel}`)
					} else {
						result.push(sel)
					}
				}
			}
		}

		return result.join(',')
	}
}
