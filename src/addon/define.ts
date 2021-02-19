'use strict'
import { Renderer } from '../type'

function define(renderer: Renderer): void {
  // const cache = new WeakMap()
      // cache.set(styleObject, 'hello')
  renderer.define = function (...styleObjects){
    let object = {}

    if(styleObjects.length === 0) return object

    for (const styleObject of styleObjects) {
      object = Object.assign(object, styleObject);
    }

    console.log(renderer.cache)

    return object
  }
}

export default define
