const isString = (key, text) => `${key}:${text};`
const isObj = (key, list) => `${key}{${buildKeyframe(list)}}`
const getType = (obj) => typeof obj === 'string'
const buildKeyframe = (list) => {
	let result = ''
	for (const key in list) {
		result += getType(list[key])
			? isString(key, list[key])
			: isObj(key, list[key])
	}
	return result
}

module.exports = buildKeyframe
