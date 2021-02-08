'use strict'

import { Renderer, ClassName } from '../type'

const addOn = function(renderer: Renderer): void {
  const store = {}
  let currentTheme = {}

  type GetThemeCallback = (x: object) => ClassName
  renderer.getTheme = (callback: GetThemeCallback): ClassName => {
    return callback(currentTheme)
  }

  renderer.selectTheme = (themeName: string): void => {
    currentTheme = store[themeName]
  }

  renderer.setTheme = (name: string, theme: object): void => {
    store[name] = {
      ...store[name],
      ...theme
    }
  }
}

export default addOn
