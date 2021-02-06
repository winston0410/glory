const handleCommaByRegexReplace = (parentSelector: string, childSelectors: string): string => {
	if (!childSelectors.includes(',')) {
		return childSelectors
	}
	return childSelectors.replace(/(^\B|^\b|,)/gi, `$1${parentSelector} `)
}

module.exports = handleCommaByRegexReplace