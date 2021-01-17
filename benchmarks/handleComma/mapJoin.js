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
