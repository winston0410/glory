const loop = (list) => {
	let mystring = ''
	for (const key in list) {
		mystring +=
			typeof list[key] === 'string'
				? `${key}:${list[key]};`
				: `${key}{${loop(list[key])}}`
	}
	return mystring
}

// const loop = (obj) => {
// 	let result = ''
// 	for (const [prop, value] of Object.entries(obj)) {
// 		result +=
// 			typeof value === 'string'
// 				? `${prop}:${value};`
// 				: `${prop}{${loop(value)}}`
// 	}
// 	return result
// }

module.exports = loop
