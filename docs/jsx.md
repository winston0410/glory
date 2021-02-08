# `jsx()`

An add-on that allows you to style like `styled-component` but with **atomic CSS and superb performance**.

## Example

```javascript
import { create } from 'glory'
import setUpJsx from 'glory/jsx'

const glory = create()
setUpJsx(glory)

const Button = glory.jsx('button', (props) => ({
    backgroundColor: (props.disabled) ? 'grey' : 'blue',
  fontSize: '40px'
}))

// In a function where you exercise composition
function CallToAction() {
    return <Button disabled={true}>Click me</Button>
}
```
