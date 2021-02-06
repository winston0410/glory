'use strict'

// import { addPrefix } from '../helper'
import { Renderer, ClassName } from '../type'

const addOn = function(renderer: Renderer): void {
  const store = {}
  let currentTheme = {}

  type GetThemeCallback = (x: object) => ClassName
  renderer.getTheme = (callback: GetThemeCallback): string => {
    return callback(currentTheme)
  }

  type selectThemeCallback = (x: object) => object
  renderer.selectTheme = (callback: selectThemeCallback): void => {
    currentTheme = callback(store)
  }
}

export default addOn
