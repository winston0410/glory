'use strict'
const handleComma = (parentSelector, childSelectors) => {
	if (!childSelectors.includes(',')) {
		return childSelectors
	}
	// console.log('check childSelectors', childSelectors)
	// Use concat string here?
	const result = childSelectors
		.split(',')
		.map((selector) => {
			return `${parentSelector} ${selector}`
		})
		.join(',')
	// console.log('check result', result)
	return result
}

const addOn = function (renderer) {
	const originSelector = renderer.selector
	renderer.selector = function (parentSelectors, childSelectors) {
		// if (!childSelectors.includes(',') && !parentSelectors.includes(',')) {
		// 	return originSelector(parentSelectors, childSelectors)
		// }

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

export default addOn
