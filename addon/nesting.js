'use strict'
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
		const data = parentSelectors
			.split(',')
			.map((parentSelector) => {
				const handledComma = handleComma(parentSelector, childSelectors)

				const handledOperand = handledComma.replace(/&/g, parentSelector)

				return handledOperand
			})
			.join(',')

		return data
	}
}

// Use reduce instead of map for performance benefits?

// const data = parentSelectors.split(',').reduce((acc, cur) => {
// 	const handledComma = handleComma(cur, childSelectors)
//
// 	const handledOperand = handleOperand(cur, handledComma)
// 	// console.log('check handledComma', handledOperand)
// 	return acc + handledOperand
// }, '')
// // console.log('check nested string', data)

// return splited
// 	.reduce((acc, current, index) => {
// 		return acc + `${parentSelector} ${current}`
// 	}, '')
// 	.join(', ')
