'use strict'
import {
  assembleClassName,
  assembleKeyframe,
  createCache,
  isEmptyObj
} from '../helper'
import safeIsObj from 'safe-is-obj'
import { Renderer } from '../type'

const defaultConfig = {
  prefixes: ['-webkit-', '-moz-', '-o-', '']
}

const addOn = function(renderer: Renderer, config = defaultConfig): void {
  createCache(renderer, 'kcache')

  const { prefixes } = config

  const prefixedKeyframes = prefixes.map((prefix) => `@${prefix}keyframes`)

  renderer.keyframes = function(decls: object): string {
    if (!decls || !safeIsObj(decls)) return ''
    if (isEmptyObj(decls)) return ''
    const frameContent = assembleKeyframe(decls)
    if (renderer.kcache[frameContent]) {
      return renderer.kcache[frameContent]
    }
    const frameName = assembleClassName(renderer)
    renderer.kcache[frameContent] = frameName

    let rawKeyframes = ''

    for (const prefixed of prefixedKeyframes) {
      rawKeyframes += `${prefixed} ${frameName}{${frameContent}}`
    }

    renderer.putRaw(rawKeyframes)

    return frameName
  }
}

export default addOn
