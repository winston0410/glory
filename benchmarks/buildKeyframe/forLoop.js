const buildKeyframe = (obj) => {
	let result = ''
	const tuple = Object.entries(obj)
	for (let i = 0; i < tuple.length; i++) {
		const [prop, value] = tuple[i]
		if (typeof value === 'string') {
			result += `${prop}:${value};`
		} else {
			result += `${prop}{${buildKeyframe(value)}}`
		}
	}
	return result
}

module.exports = buildKeyframe
