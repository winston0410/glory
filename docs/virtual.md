# `virtual()`

This add-on insert stylings atomically.

## Example

```javascript
import { create } from 'glory'
import virtualAddon from 'glory/virtual'

const glory = create()
virtualAddon(glory)

const classNames1 = glory.virtual({
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
