interface Renderer {
  raw?: String
  pfx?: String
  client?: Boolean
  hash?: Function
  hashChars?: String
  sh?: HTMLStyleElement
  putRaw?: (cssString: string) => void
  [prop: string]: any
}

type Selector = string

type Prop = string

type Value = string

type ClassName = string

type CSSString = string

type Declaration = object

export { Renderer, Prop, Value, CSSString, Declaration, Selector, ClassName }
