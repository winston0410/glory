# `virtual` Addon

Uses [_Virtual CSS_](https://ryantsao.com/blog/virtual-css-with-styletron) when injecting rules -- splits all CSS rules into atomic single declarations, where each is assigned a class name and reused.

Example:

```javascript
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

## `.virtual()`

Returns a list of class names given a CSS-like object.

```javascript
const classNames1 = nano.virtual({
    color: 'red',
    border: '1px solid red',
    textAlign: 'center'
});
// _a _b _c
```
