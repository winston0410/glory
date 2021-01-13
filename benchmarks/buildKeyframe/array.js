const buildKeyframe = (obj) => buildKeyframeHelper([Object.entries(obj)])
const buildKeyframeHelper = (props, res = [[]], key = [''], layer = 0) => {
	if (layer === -1) return res.join('')
	const firstProp = props[layer].shift()
	if (!firstProp) {
		props.pop()
		const currentKey = key.pop()
		if (layer > 0) {
			res[layer - 1].push(`${currentKey}{${res.pop().join('')}}`)
			return buildKeyframeHelper(props, res, key, layer - 1)
		} else {
			return buildKeyframeHelper(props, ...res, key, layer - 1)
		}
	}
	const [propKey, propValue] = firstProp
	if (typeof propValue !== 'string')
		return buildKeyframeHelper(
			[...props, Object.entries(propValue)],
			[...res, []],
			[...key, propKey],
			layer + 1
		)
	res[layer].push(`${propKey}:${propValue};`)
	return buildKeyframeHelper(props, res, key, layer)
}

module.exports = buildKeyframe
