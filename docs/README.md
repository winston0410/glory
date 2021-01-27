# Quick start

This is quick start guide will help you set up Camouflage in your project correctly.

You can find detail documentation for each add-on in this directory.

## Installation

First of all, install Camouflage with your package manager

```shell
yarn add camouflage
```

```shell
npm install camouflage
```

## Customize renderer

Then you will need to customize the renderer. Create a new file for customization.

```javascript
//nameItTheWayYouWant.js
import { create } from 'camouflage'

const camouflage = create({
	// pass parameter here to config the default renderer
})

export default camouflage
```

You can find parameters for [configuring default renderer here](./config.md).

## Add styling interface

By default, camouflage doesn't come with a styling interface in order to reduce bundle size. You will need to upgrade it with the following add-ons.

You may use more than one of the following add-ons.

- [`virtual()`](./virtual.md)

- [`jsx()`](./jsx.md)

These add-ons are included in the main package, and can be access like the example below.

```javascript
//nameItTheWayYouWant.js
import { create } from 'camouflage'
import virtual from 'camouflage/addon/virtual'

const camouflage = create({})

virtual(camouflage)

export default camouflage
```

## Add auto-prefixing support

By default, auto-prefixing is not support by the default bundler for a more modular design. To enable it, upgrade renderer with [`prefixer()`](./prefixer.md)

```javascript
//nameItTheWayYouWant.js
import { create } from 'camouflage'
import virtual from 'camouflage/addon/virtual'
import prefixer from 'camouflage/addon/prefixer'

const camouflage = create({})

virtual(camouflage)
prefixer(camouflage)

export default camouflage
```

## Add server-side rendering support

It is common to do SSR or SSG nowadays for improving website rendering performance. Camouflage supports that and would prevent rendering duplicated stylings.

To get the rendered styling in server side, access `renderer.raw`.

```javascript
//Import an initialized instance
import camouflage from 'nameItTheWayYouWant.js'

//render your app to string
//append the style whereever you want.
html += `<style>${camouflage.raw}</style>`
```

To avoid re-rendering duplicated styling, you will need to use [`hydration()`](./hydration.md) in your renderer instance, and provide the renderer style tag as `renderer.sh`.

```javascript
//nameItTheWayYouWant.js
import { create } from 'camouflage'
//...
import hydration from 'camouflage/addon/hydration'

const camouflage = create({})
//...
hydration(camouflage)
```

```javascript
const nano = create({
	sh:
		typeof document === 'object' ? document.getElementById('camouflage') : null
})

html += `<style id="camouflage">${nano.raw}</style>`
```
