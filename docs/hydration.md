# `hydrate`

This add-on re-hydrates CSS styles generated on the server.

## Hydration rules

In case you are not aware, a **declaration is a pair of property and value** of CSS.

```css
body {
    font-size: 100px; /*font-size: 100px is a declaration*/
}
```

- when a **declaration** is found in the server-side generated stylesheet, re-generation of that declaration in client-side is prevented.

_Unlike `nano-css`, this add-on supports hydration of media queries or animation keyframes._

- when a **declaration** is not found in the server-side generated stylesheet, but found in the Javascript, it will then be generated.
