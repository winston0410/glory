import { prefix as addPrefix } from 'inline-style-prefixer'
import { camelCaseProperty, hyphenateProperty } from 'css-in-js-utils'
import safeIsObj from 'safe-is-obj'
import { Renderer, Prop, Value, CSSString, Declaration, Selector, ClassName } from './type'

const assembleClassName = (renderer: Renderer, name = ''): ClassName =>
  renderer.pfx + (name || renderer.hash())

const assembleDecl = (prop: Prop, value: Value): string =>
  `${hyphenateProperty(prop)}:${value};`

const assembleRule = (name: Selector, rule: string) => `${name}{${rule}}`

const assembleKeyframe = (decls: Declaration): string => {
  let result = ''
  for (const prop in decls) {
    result +=
      typeof decls[prop] === 'string'
        ? `${prop}:${decls[prop]};`
        : `${prop}{${assembleKeyframe(decls[prop])}}`
  }
  return result
}

const isAtRule = (selector: Selector): boolean =>
  selector[0] === '@' && selector !== '@font-face'

const cssifyArray = (prop: Prop, value: Value[]): CSSString => {
  let concatedDecl = ''
  for (const currentValue of value) {
    concatedDecl += assembleDecl(prop, currentValue)
  }
  return concatedDecl
}

const cssifyObject = (decls: Declaration, callback?: Function): CSSString => {
  let css = ''
  for (const prop in decls) {
    const value = decls[prop]
    if (Array.isArray(value)) {
      css += cssifyArray(prop, value)
    } else if (safeIsObj(value) && callback) {
      callback(prop, value)
    } else {
      css += assembleDecl(prop, value)
    }
  }
  return css
}

const createCache = (renderer: Renderer, name: string): void => {
  if (!renderer[name]) {
    renderer[name] = {}
  }
}

const isEmptyObj = (obj: object): boolean => Object.keys(obj).length === 0

const isProduction = process.env.NODE_ENV === 'production'

export {
  assembleClassName,
  addPrefix,
  isAtRule,
  cssifyObject,
  cssifyArray,
  assembleRule,
  assembleDecl,
  assembleKeyframe,
  createCache,
  isEmptyObj,
  isProduction
}
