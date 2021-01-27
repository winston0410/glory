# `prefixer`

This add-on uses [`inline-style-prefixer`](https://github.com/rofrischmann/inline-style-prefixer) internally to auto-prefix your styles on the server and browser.

Example:

```javascript
nano.put('.foo', {
    flex: 1
});
```

Result:

```css
.foo {
    -webkit-flex: 1;
    flex: 1;
}
```
