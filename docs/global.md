# `global()`

This add-on generate CSS for global node(e.g. body).

```Javascript
import { create } from 'glory'
import globalAddon from 'glory/global'

const glory = create()
globalAddon(glory)

glory.global({
  listStyle: 'none'
}, ['ul', 'ol'])

```
