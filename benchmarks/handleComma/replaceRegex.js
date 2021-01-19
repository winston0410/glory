const handleComma = (parentSelector, childSelectors) => {
	if (!childSelectors.includes(',')) {
		return childSelectors
	}
	return childSelectors.replace(/(^\B|^\b|,)/gi, `$1${parentSelector} `)
}