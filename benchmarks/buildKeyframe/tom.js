const isString = (key, text) => `${key}:${text};`
const isObj = (key, list) => `${key}{${loop(list)}}`
const getType = (obj) => typeof obj === 'string'
const loop = (list) => {
	let mystring = ''
	for (const key in list) {
		mystring += getType(list[key])
			? isString(key, list[key])
			: isObj(key, list[key])
	}
	return mystring
}

module.exports = loop
