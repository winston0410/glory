'use strict'
// TODO: Check performance between map vs reduce
const handleComma = (parentSelector, childSelectors) => {
	if (!childSelectors.includes(',')) {
		return childSelectors
	}
	return childSelectors
		.split(',')
		.map((selector) => {
			return `${parentSelector} ${selector}`
		})
		.join(',')
}

exports.addon = function(renderer) {
	renderer.selector = function(parentSelectors, childSelectors) {
		const data = parentSelectors.split(',').reduce((acc, cur) => {
			const handledComma = handleComma(cur, childSelectors)
			const handledOperand = handledComma.replace('&', cur)

			return acc + handledOperand
		}, '')
		// console.log('check nested string', data)
		return data
	}
}

// return splited
// 	.reduce((acc, current, index) => {
// 		return acc + `${parentSelector} ${current}`
// 	}, '')
// 	.join(', ')
