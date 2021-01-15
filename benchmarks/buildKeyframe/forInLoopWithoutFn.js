const buildKeyframe = (list) => {
	let result = ''
	for (const key in list) {
		result +=
			typeof list[key] === 'string'
				? `${key}:${list[key]};`
				: `${key}{${buildKeyframe(list[key])}}`
	}
	return result
}

module.exports = buildKeyframe
