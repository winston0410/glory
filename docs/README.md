# Quick start

This is quick start guide will help you set up glory in your project correctly.

You can find detail documentation for each add-on in this directory.

## Installation

First of all, install glory with your package manager

```shell
yarn add glory
```

```shell
npm install glory
```

## Customize renderer

Then you will need to customize the renderer. Create a new file for customization.

```javascript
//nameItTheWayYouWant.js
import { create } from 'glory'

const glory = create({
	// pass parameter here to config the default renderer
})

export default glory
```

You can find parameters for [configuring default renderer here](./config.md).

## Add styling interface

By default, glory doesn't come with a styling interface in order to reduce bundle size. You will need to upgrade it with the following add-ons.

You may use more than one of the following add-ons.

- [`virtual()`](./virtual.md)

- [`jsx()`](./jsx.md)

These add-ons are included in the main package, and can be access like the example below.

```javascript
//nameItTheWayYouWant.js
import { create } from 'glory'
import virtual from 'glory/virtual'

const glory = create({})

virtual(glory)

export default glory
```

## Add auto-prefixing support

By default, auto-prefixing is not support by the default bundler for a more modular design. To enable it, upgrade renderer with [`prefixer()`](./prefixer.md)

```javascript
//nameItTheWayYouWant.js
import { create } from 'glory'
import virtual from 'glory/virtual'
import prefixer from 'glory/prefixer'

const glory = create({})

virtual(glory)
prefixer(glory)

export default glory
```

## Add server-side rendering support

It is common to do SSR or SSG nowadays for improving website rendering performance. glory supports that and would prevent rendering duplicated stylings.

To get the rendered styling in server side, access `renderer.raw`.

```javascript
//Import an initialized instance
import glory from 'nameItTheWayYouWant.js'

//render your app to string
//append the style whereever you want.
html += `<style>${glory.raw}</style>`
```

To avoid re-rendering duplicated styling, you will need to use [`hydration()`](./hydration.md) in your renderer instance, and provide the renderer style tag as `renderer.sh`.

```javascript
//nameItTheWayYouWant.js
import { create } from 'glory'
//...
import hydration from 'glory/hydration'

const glory = create({})
//...
hydration(glory)
```

```javascript
const glory = create({
	sh:
		typeof document === 'object' ? document.getElementById('glory') : null
})

html += `<style id="glory">${glory.raw}</style>`
```

## Optimizing production build

By default some error message is provided to guide your development. To remove those error message and trim your production build, use a define plugin to set `process.env.NODE_ENV` to `production` to enable dead code elimination.

### Define plugins:
[@rollup/plugin-replace](https://www.npmjs.com/package/@rollup/plugin-replace)
