# Add-ons

With bundle size and modularity in mind, `glory` does not come with any styling interface in its core. It cannot inject styles, handle prefix and hydration without using add-on.

## Install an add-on

You can access all the default add-on like the following example:

```javascript
import setUpVirtual from 'glory/virtual'
import { create } from 'glory'

const glory = create()
setUpVirtual(glory)

//...some more add-ons

//Start using your style renderer
glory.virtual({
	color: 'red'
})
```

## List of add-on

### Styling interface

- [`keyframes()`](./keyframes.md) -- adds `@keyframes` support

- [`virtual`](./virtual.md) -- Injects style that split declarations atomically for maximum reusability and performance.

- [`jsx()`](./jsx.md) -- Styling interface that mimics `styled-component`.

### Prefixer

- [`prefixer`](./prefixer.md) -- Prefix your styling with correct vendor prefixes.

### Hydration

- [`hydrate()`](./hydrate.md) -- Support for re-hydration and prevent duplicate injection of styles in client side.

## How to write an add-on?
