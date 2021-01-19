# Camouflage

:rocket::rocket::rocket: The world **fastest** CSS-in-JS library.

[![Maintainability](https://api.codeclimate.com/v1/badges/37576126acb783f17c77/maintainability)](https://codeclimate.com/github/winston0410/camouflage/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/37576126acb783f17c77/test_coverage)](https://codeclimate.com/github/winston0410/camouflage/test_coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/30027259349b45ef8cdc73711f17859c)](https://www.codacy.com/gh/winston0410/camouflage/dashboard?utm_source=github.com&utm_medium=referral&utm_content=winston0410/camouflage&utm_campaign=Badge_Grade) [![Known Vulnerabilities](https://snyk.io/test/github/winston0410/camouflage/badge.svg?targetFile=package.json)](https://snyk.io/test/github/winston0410/camouflage?targetFile=package.json)

Out run popular libraries like [Emotion](https://github.com/emotion-js/emotion), [Styletron](https://github.com/styletron/styletron) but with identical or even better supports.

Don't you believe me? Check out the benchmark here.

## Features

- :zap: **Lightweight** and **modular**. Install only what you need.

- :fire: Blazing **fast**.

- :white_check_mark: **Well-tested**.

- :ambulance: Provide optional **prefixer** plugin

- :construction: Support SSG **style rehydration**. Unnecessary re-render is avoided.

## Installation

A 0.1.0 will be released soon.

## Getting started

```javascript
import { create as createCamoflage } from 'camouflage'
import prefixer from 'camouflage/prefixer'
import virtual from 'camouflage/virtual'

const camouflage = create({
  //Config renderer here
})

//Use plugin to upgrade the default renderer

virtual(camouflage)
prefixer(camouflage)

const style = {
  color: 'red',
  paddingTop: '100px';
}

const className = camouflage.virtual(style)
//return 'a b' as class name for maximum performance
```

## Difference between `nano-css` and `camouflage`

- `renderer.put()` is not longer the default.

- Handle array values without needing `array` add-on.

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
nano-css, rule() x 77,897 ops/sec ±17.56% (74 runs sampled)
nano-css, virtual() x 172,023 ops/sec ±3.60% (93 runs sampled)
emotion x 266,858 ops/sec ±0.58% (96 runs sampled)
goober x 120,452 ops/sec ±0.55% (76 runs sampled)
styletron x 431,801 ops/sec ±0.14% (93 runs sampled)
camouflage, rule() x 299,107 ops/sec ±2.54% (74 runs sampled)
camouflage, virtual() x 1,319,239 ops/sec ±2.12% (93 runs sampled)
Fastest is camouflage, virtual()
```

## Inspirations

### [nano-css](https://github.com/streamich/nano-css)

This library is developed based on the good work of [nano-css](https://github.com/streamich/nano-css). This library would not be possible without their awesome test code.

### [TailwindCSS](https://tailwindcss.com/) and [Styletron](https://www.styletron.org/)

These two libraries has enlightened me with the potential of atomic css.
