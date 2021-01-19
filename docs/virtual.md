# `virtual` Addon

Uses [*Virtual CSS*](https://ryantsao.com/blog/virtual-css-with-styletron) when injecting rules &mdash; splits all CSS
rules into atomic single declarations, where each is assigned a class name and reused.

Example:

```js
const classNames1 = nano.rule({
    color: 'red',
    border: '1px solid red',
    textAlign: 'center'
});
// _a _b _c

const classNames2 = nano.rule({
    border: '1px solid red',
});
// _b

<div className={classNames1} /> // <div class="_a _b _c" />
<div className={classNames2} /> // <div class="_b" />
```


## `.atomic()`

Creates an `.atomic(rawDecl, selector?, atRule?)` method which returns a class name given a raw declaration string.

> __Selector__
>
> *Selector* is a string that contains an `&` character, which represents the current component. Examples:
> `"&"`, `"&:hover"`, `".parent &:hover svg"`.

Usage:

```js
nano.atomic('color:red', '&'); // _a
nano.atomic('color:blue', '&:hover'); // _b
nano.atomic('color:green', '&', '@media (min-width: 400px)'); // _c
nano.atomic('color:red', '&'); // _a
```


## `.virtual()`

Returns a list of class names given a CSS-like object.

```js
const classNames1 = nano.virtual({
    color: 'red',
    border: '1px solid red',
    textAlign: 'center'
});
// _a _b _c
```


## Installation

Simply install `virtual` addon. Read more about the [Addon Installation](./addons.md#addon-installation).