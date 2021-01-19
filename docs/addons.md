# Addons

`nano-css` comes only with a single [`put()`](./put.md) addon pre-installed. However, it has
plenty more to chose from. Below is a list of addons shipped with `nano-css`.

- [`rule()`](./rule.md) &mdash; injects CSS styles and returns a generated selectorsed
- [`keyframes()`](./keyframes.md) &mdash; adds `@keyframes` support
- [`hydrate()`](./hydrate.md) &mdash; adds support for re-hydration on client side
- [`prefixer`](./prefixer.md) &mdash; auto-prefixes your styles with correct vendor prefixes
- [`virtual`](./virtual.md) &mdash; virtual CSS renderer, splits css rules in atomic declarations

## Addon Installation

All addons are in the `nano-css/addon/` folder and are exported
as an `addon` named export. Addon is simply a function that receives `nano-css` renderer object
as a single argument.

When these docs mention that you need to install an addon, say `xxx`, you simply import it
from the addon folder and apply to the nano renderer object:

```js
import {addon as addonXXX} from 'nano-css/addon/xxx';

addonXXX(nano);

nano.xxx(/* ... */);
```

Here we install [`rule()`](./rule.md) and [`keyframes`](./keyframes.md) addons:

```js
import {create} from 'nano-css';
import {addon as addonRule} from 'nano-css/addon/rule';
import {addon as addonKeyframes} from 'nano-css/addon/keyframes';

const nano = create();

addonRule(nano);
addonKeyframes(nano);
```