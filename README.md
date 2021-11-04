# Glory

:rocket::rocket::rocket: The world **fastest** **framework agonistic** CSS-in-JS library.


![File size](https://img.shields.io/badge/Minified%20size-1.82%20KB-green) [![Test Coverage](https://api.codeclimate.com/v1/badges/37576126acb783f17c77/test_coverage)](https://codeclimate.com/github/winston0410/camouflage/test_coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/30027259349b45ef8cdc73711f17859c)](https://www.codacy.com/gh/winston0410/camouflage/dashboard?utm_source=github.com&utm_medium=referral&utm_content=winston0410/camouflage&utm_campaign=Badge_Grade) [![Known Vulnerabilities](https://snyk.io/test/github/winston0410/camouflage/badge.svg?targetFile=package.json)](https://snyk.io/test/github/winston0410/camouflage?targetFile=package.json) [![Build Status](https://travis-ci.com/winston0410/glory.svg?branch=master)](https://travis-ci.com/winston0410/glory)

Out run big-name popular CSS-in-JS libraries like [Styled-component](https://github.com/styled-components/styled-components), [Emotion](https://github.com/emotion-js/emotion), [Styletron](https://github.com/styletron/styletron) and [Fela](https://github.com/robinweser/fela) but with identical or even better supports.

Don't you believe me? Check out the [benchmark](https://github.com/winston0410/camouflage/#benchmarks) here.

You can also try the [sandboxes](https://github.com/winston0410/camouflage/#example) to try using Glory with different frameworks

## Features

- :zap: **Lightweight** and **modular**. Only weights **1.8kb** (minified and gzipped) for the minimum viable setup.

- :fire: Blazing **fast**.

- :earth_asia: **Framework agonistic**.

- :white_check_mark: **Well-tested**.

- :ambulance: Provide optional **prefixer** plugin.

- :construction_worker: Provide optional **Web Worker** plugin support(experimental).

- :art: Provide optional **theming** plugin.

- :nail_care: Support **nesting**, **keyframes** and **media-queries**.

- :construction: **Isomorphic**. Support SSR/SSG server side render **style rehydration**. Unnecessary re-render is avoided.

## Installation

Npm:

```shell
npm install glory
```

Yarn:

```shell
yarn add glory
```

## Sponsors

Support this package by becoming our sponsor.

[![Tecky Academy Logo](https://github.com/winston0410/glory/blob/master/sponsors/tecky.png)](https://tecky.io/en/)

## Getting started

See our [quick start guide](https://github.com/winston0410/camouflage/blob/master/docs/README.md) for more details.

```javascript
import { create } from 'glory'
import prefixer from 'glory/dist/prefixer'
import hydration from 'glory/dist/hydration'
import virtual from 'glory/dist/virtual'

const glory = create({
	//Config renderer here
})

//Use plugin to upgrade the default renderer

//Select your preferred styling interface
virtual(glory)
//Add support for auto-prefixing if needed
prefixer(glory)
//Add style hydration supports, if you will render styling beforehand in server
hydration(glory)

const style = {
	color: 'red',
	paddingTop: '100px',
	'@media screen': {
		//supports media queries
		color: 'red'
	},
	':hover': {
		//supports pesudo-classes and selectors
		backgroundColor: 'blue'
	}
}

const className = glory.virtual(style)
//return 'a b c d' as class name for maximum performance

//Insert .a{color:red;}.b{padding-top:100px;}@media screen{.c{color:red;}}.d:hover{background-color:blue;} as styling
```

## Example

### Live demo (Code Sandbox)

- [React and Glory](https://codesandbox.io/s/angry-morning-bsjhz?file=/src/App.js)

- [Svelte and Glory](https://codesandbox.io/s/svelte-glory-demo-8j4ux)

### Source code

- [Typescript, React and Glory](https://github.com/winston0410/glory-mono/tree/master/packages/examples/typescript-react)

- [Svelte and Glory](https://github.com/winston0410/glory-mono/tree/master/packages/examples/svelte)

## Made in Hong Kong

This library is made by Hong Kongers.

## Benchmarks

You can test the benchmark in your computer by cloning this repo and `cd benchmarks`. You can find all benchmarking commands in that `package.json` there.

### Without prefixer, `virtual()`

```markdownify
$ node -r esm renderStyle/css.spec.js
nano-css("^5.3.1"), rule() x 121,604 ops/sec ±20.27% (64 runs sampled)
nano-css("^5.3.1"), virtual() x 395,781 ops/sec ±0.38% (92 runs sampled)
emotion("^11.1.3") x 381,874 ops/sec ±0.32% (98 runs sampled)
styletron("^1.4.6") x 816,730 ops/sec ±0.31% (97 runs sampled)
fela("^11.5.2") x 1,352,522 ops/sec ±1.11% (93 runs sampled)
glory, rule() x 324,168 ops/sec ±49.39% (56 runs sampled)
glory, virtual() x 1,357,795 ops/sec ±0.63% (94 runs sampled)
Fastest is glory, virtual(),fela("^11.5.2")
```

### With prefixer, `virtual()`

```markdownify
$ node -r esm renderStyle/css-prefixed.spec.js
nano-css("^5.3.1"), rule() x 79,994 ops/sec ±16.18% (70 runs sampled)
nano-css("^5.3.1"), virtual() x 174,209 ops/sec ±1.19% (85 runs sampled)
emotion("^11.1.3") x 252,219 ops/sec ±1.64% (90 runs sampled)
goober("^2.0.21") x 98,742 ops/sec ±2.60% (57 runs sampled)
fela("^11.5.2") x 437,485 ops/sec ±3.97% (82 runs sampled)
styletron("^1.4.6") x 394,933 ops/sec ±1.32% (90 runs sampled)
glory, rule() x 249,918 ops/sec ±4.25% (57 runs sampled)
glory, virtual() x 1,002,094 ops/sec ±5.58% (72 runs sampled)
Fastest is glory, virtual()
```

### With prefixer, `jsx()`

```markdownify
$ node -r esm renderStyle/css-jsx.spec.js
styled component x 39,671 ops/sec ±1.29% (90 runs sampled)
emotion, styled() x 645,268 ops/sec ±1.29% (90 runs sampled)
goober x 1,085,717 ops/sec ±0.43% (95 runs sampled)
glory, jsx() x 1,107,726 ops/sec ±0.58% (96 runs sample
d)
Fastest is glory, jsx()
```

## Difference between `nano-css` and `glory`

This library is a fork of `nano-css`, with the following difference:

- `renderer.put()` is no longer the default.

- `rendere.pfx` is default to `''`.

- `hydration()` add-on can handle hydration for basic rules, at-rules and keyframes.

- Handle values in array without needing `array` add-on.

## Known issues

### Module not found due to Typescript absolute import

`create-react-app` uses Typescript and absolute import is enabled by default.

If you are using Typescript, which may support absolute import based on compiler setting. If you have enabled absolute import, importing module like `glory/virtual` will make Typescript think that it is importing a file from `<baseUrl>/glory/virtual`, instead of searching `node_modules` for you.

To solve this, you have to update `tsconfig.json` to give the correct path to Typescript.

https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping

## Contribution

To contribute in this project, you need to do the followings:

- Fork this repo and then clone **your fork** into your computer.

- Contribute in your fork, commit and push to **your fork**.

- Create a pull request in this repo.

After your code had been reviewed, accepted and merged into this repo, you contribution will be shown in this repo.

## Roadmap

You can check our [development roadmap here](https://github.com/winston0410/camouflage/projects/1)

## Inspirations

### [nano-css](https://github.com/streamich/nano-css)

This library is developed based on the good work of [nano-css](https://github.com/streamich/nano-css). This library would not be possible without their awesome test code.

### [TailwindCSS](https://tailwindcss.com/) and [Styletron](https://www.styletron.org/)

These two libraries have enlightened me with the potential of atomic css.
