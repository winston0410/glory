# `keyframes()`

This addon allows one to define CSS `@keyframes` in any CSS-like object.

## Example

It also exposes a `keyframes()` function, which generates a unique animation name automatically.

```javascript
const animation = nano.keyframes({
	'0%': {
		transform: 'rotate(0deg)'
	},
	'100%': {
		transform: 'rotate(359deg)'
	}
})

const className = rule({
	animation: `${animation} 5s`
})
```

## Configuration

As a second argument, `keyframes` addon can accept a configuration object with the following keys:

- `prefixes` -- optional, array of prefixes, defaults to `['-webkit-', '-moz-', '-o-', '']`.
