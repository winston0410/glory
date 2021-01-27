# Configuration

The `create()` function accepts an options object with the following keys:

- `pfx` -- optional, string, prefix to add to all generated class and animation names, defaults to "".

- `h` -- optional, hyperscript function of your virtual DOM library. Only necessary if you are using [`jsx()`](./jsx.md) or other addon that requires it.

- `sh` -- optional, DOM style sheet element, useful when re-hydrating server rendered styles.
