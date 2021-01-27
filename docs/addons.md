# Add-ons

With bundle size and modularity in mind, `camouflage` does not come with any styling interface in its core. It cannot inject styles, handle prefix and hydration without using add-on.

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
