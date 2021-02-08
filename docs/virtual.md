# `virtual()`

This add-on insert stylings atomically.

## Example

```javascript
const classNames1 = nano.virtual({
    color: 'red',
    border: '1px solid red',
    textAlign: 'center'
})
// _a _b _c

/*The generated styling would be:
.a{color: red;}
.b{border: 1px solid red;}
.c{text-align: center;}
*/

<div className={classNames1} /> // <div class="_a _b _c" />
```
