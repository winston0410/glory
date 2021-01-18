import { prefix as prefixAll } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'
import safeIsObj from 'safe-is-obj'

const addPrefix = pipe(
	Object.entries,
	map(([prop, value]) => [camelCaseProperty(prop), value]),
	Object.fromEntries,
	prefixAll
)

module.exports = addPrefix
