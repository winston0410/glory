# `prefixer()`

This add-on uses [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer) internally to auto-prefix your styles on the server and browser.

Example:

```javascript
import { create } from 'glory'
import virtualAddon from 'glory/virtual'
import prefixerAddon from 'glory/prefixer'

const glory = create()
virtualAddon(glory)
prefixerAddon(glory)

const classNames = glory.virtual({
    flex: 1
})
```

Result:

```css
.a {
    -webkit-flex: 1;
    flex: 1;
}
```
