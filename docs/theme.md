# `theme`

This add-on enables theming in Glory. A store will be created to store all your theme setting, and you can access theme's value anytime you want.

```javascript
import { create } from 'glory'
import themeAddon from 'glory/theme'
import virtualAddon from 'glory/virtual'

const glory = create()
virtualAddon(glory)
themeAddon(glory)

const darkTheme = {
  mainColor: 'black'
}

const lightTheme = {
  mainColor: 'white'
}

// Set themes in the store
glory.setTheme('dark', darkTheme)
glory.setTheme('light', lightTheme)

// Select the current theme
glory.selectTheme('dark')

// Get current theme value and use it in styling interface
const className = glory.getTheme((theme) => {
return glory.virtual({
  backgroundColor: theme.mainColor
})
})
```

## API Reference

### `setTheme()`

Method for setting theme in store.

### `selectTheme()`

Method for selecting current theme in store.

### `getTheme()`

Method for getting the current theme value from store.
