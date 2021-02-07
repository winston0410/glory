'use strict'

// import { addPrefix } from '../helper'
import { Renderer, ClassName } from '../type'

const addOn = function(renderer: Renderer): void {
  const store = {}
  let currentTheme = {}

  type GetThemeCallback = (x: object) => ClassName
  renderer.getTheme = (callback: GetThemeCallback): ClassName => {
    return callback(currentTheme)
  }

  type selectThemeCallback = (x: object) => object
  renderer.selectTheme = (callback: selectThemeCallback): void => {
    currentTheme = callback(store)
  }

  renderer.setTheme = (name: string, theme: object): void => {
    store[name] = {
      ...store[name],
      ...theme
    }
  }
}

export default addOn
