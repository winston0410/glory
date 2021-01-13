import { prefix as prefixAll } from 'inline-style-prefixer'
import { camelCaseProperty } from 'css-in-js-utils'
import { pipe, map } from 'rambda'

const assembleClassName = (renderer, name) =>
	renderer.pfx + (name || renderer.hash())

const addPrefix = pipe(
	Object.entries,
	map(([prop, value]) => [camelCaseProperty(prop), value]),
	Object.fromEntries,
	prefixAll
)

export { assembleClassName, addPrefix }
