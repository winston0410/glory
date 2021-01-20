# Camouflage

:rocket::rocket::rocket: The world **fastest** **framework agonistic** CSS-in-JS library.

[![Test Coverage](https://api.codeclimate.com/v1/badges/37576126acb783f17c77/test_coverage)](https://codeclimate.com/github/winston0410/camouflage/test_coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/30027259349b45ef8cdc73711f17859c)](https://www.codacy.com/gh/winston0410/camouflage/dashboard?utm_source=github.com&utm_medium=referral&utm_content=winston0410/camouflage&utm_campaign=Badge_Grade) [![Known Vulnerabilities](https://snyk.io/test/github/winston0410/camouflage/badge.svg?targetFile=package.json)](https://snyk.io/test/github/winston0410/camouflage?targetFile=package.json)

Out run big-name popular CSS-in-JS libraries like [Emotion](https://github.com/emotion-js/emotion), [Styletron](https://github.com/styletron/styletron) and [Fela](https://github.com/robinweser/fela) but with identical or even better supports.

Don't you believe me? Check out the [benchmark](https://github.com/winston0410/camouflage/#benchmarks) here.

## Features

- :zap: **Lightweight** and **modular**. Install only what you need.

- :fire: Blazing **fast**.

- :earth_asia: **Framework agonistic**.

- :white_check_mark: **Well-tested**.

- :ambulance: Provide optional **prefixer** plugin.

- :nail_care: Support **nesting** and **media-queries**.

- :construction: Support SSR/SSG server side render **style rehydration**. Unnecessary re-render is avoided.

## Installation

A 0.1.0 will be released soon.

## Sponsor

Support this package by becoming our sponsor.

## Getting started

```javascript
import { create as createCamoflage } from 'camouflage'
import prefixer from 'camouflage/prefixer'
import hydration from 'camouflage/hydration'
import virtual from 'camouflage/virtual'

const camouflage = create({
  //Config renderer here
})

//Use plugin to upgrade the default renderer

//Select your preferred styling interface
virtual(camouflage)
//Add support for auto-prefixing if needed
prefixer(camouflage)
//Add style hydration supports, if you will render styling beforehand in server
hydration(camouflage)

const style = {
  color: 'red',
  paddingTop: '100px';
}

const className = camouflage.virtual(style)
//return 'a b' as class name for maximum performance
```

## Made in Hong Kong

This library is made by a Hong Konger.

## Benchmarks

You can test the benchmark in your computer by cloning this repo and `cd benchmarks`. You can find all benchmarking commands in that `package.json` there.

### Without prefixer

```markdownify
$ node -r esm renderStyle/css.spec.js
nano-css, rule() x 110,797 ops/sec ±20.79% (63 runs sampled)
nano-css, virtual() x 401,680 ops/sec ±1.72% (94 runs sampled)
emotion x 371,025 ops/sec ±0.54% (97 runs sampled)
styletron x 794,703 ops/sec ±0.58% (94 runs sampled)
camouflage, rule() x 288,544 ops/sec ±67.24% (49 runs sampled)
camouflage, virtual() x 1,272,858 ops/sec ±5.03% (90 runs sampled)
Fastest is camouflage, virtual()
```

### With prefixer

```markdownify
$ node -r esm renderStyle/css-prefixed.spec.js
nano-css("^5.3.1"), rule() x 89,522 ops/sec ±3.57% (79 runs sampled)
nano-css("^5.3.1"), virtual() x 153,129 ops/sec ±25.06% (93 runs sampled)
emotion("^11.1.3") x 274,224 ops/sec ±0.34% (96 runs sampled)
goober("^2.0.21") x 122,191 ops/sec ±0.55% (71 runs sampled)
fela("^11.5.2") x 409,797 ops/sec ±4.20% (93 runs sampled)
styletron("^1.4.6") x 425,428 ops/sec ±0.27% (92 runs sampled)
camouflage, rule() x 296,678 ops/sec ±2.72% (72 runs sampled)
camouflage, virtual() x 1,235,626 ops/sec ±4.58% (89 runs sampled)
Fastest is camouflage, virtual()
```

## Difference between `nano-css` and `camouflage`

This library is a folk of `nano-css`, with the following difference:

- `renderer.put()` is no longer the default.

- Handle array values without needing `array` add-on.

## Inspirations

### [nano-css](https://github.com/streamich/nano-css)

This library is developed based on the good work of [nano-css](https://github.com/streamich/nano-css). This library would not be possible without their awesome test code.

### [TailwindCSS](https://tailwindcss.com/) and [Styletron](https://www.styletron.org/)

These two libraries have enlightened me with the potential of atomic css.
