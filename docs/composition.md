# Composition with CSS-in-JS

## String concatenation

Most basic form of concatenation, utilizing CSS's error-tolerating nature

```javascript

const className1 = glory.virtual({
  color: 'red'
})

const className2 = glory.virtual({
  fontSize: '20px'
})

//Save it as a variable for reuse
const combinedClassName = `${className1} ${className2}`

const Component = () => {
  return (
    <p className={combinedClassName}>Hello</p>
  )
}
```

### Pros

- easy to achieve

### Cons

- messy devTool difficult to debug

- **stateless** (it can be stateful, but then you **cannot share it** as it has to be defined inside a component)

## Object concatenation

```javascript
const color = {
  color: 'red'
}

const font = {
  fontSize: '20px'
}

const combinedStyle = {
  ...color,
  ...font
}

const className = glory.virtual(combinedStyle)

const Component = () => {
  return (
    <p className={className}>Hello</p>
  )
}
```

### Pros

- easy to achieve

- No messy devTool. No overriding CSS rules

### Cons

- **stateless** (it can be stateful, but then you **cannot share it** as it has to be defined inside a component)

## Function concatenation (Object)

```javascript

const color = (props) => ({
  color: (props.warning) ? 'red' : 'green'
})

const font = (props) => ({
  fontWeight: (props.warning) ? 'bold' : 'normal'
})

const warningStyle = compose(color, font)

const Component = (props) => {

  const className = glory.virtual(warningStyle(props))

  return (
    <p className={className}>Hello</p>
  )
}
```

### Pros

- No messy devTool. No overriding CSS rules

- **Stateful**. It can be defined outside a component for **easy sharing**

### Cons

- Verbose
