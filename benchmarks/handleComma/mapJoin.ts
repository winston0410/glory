const handleCommaByMapJoin = (parentSelector: string, childSelectors: string): string => {
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

module.exports = handleCommaByMapJoin