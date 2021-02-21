'use strict'

import { isBrowser } from "is-in-browser";
import joli from '@blackblock/joli-string'
import { isProduction } from './helper'
import { Renderer } from './type'

const create = function(config: Renderer): Renderer {
  const renderer = {
    raw: '',
    pfx: '',
    client: isBrowser,
    hasher: joli,
    hashChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',
    ...config
  }

  renderer.hash = renderer.hasher(renderer.hashChars)

  if (renderer.client) {
    if (!renderer.sh) {
      renderer.sh = document.createElement('style')
      document.head.appendChild(renderer.sh)
    }

    if (!isProduction) {
      renderer.sh.setAttribute('data-css-dev', '')
    }
  }

  if (renderer.client) {
    renderer.putRaw = function(rawCssRule: string): void {
      if (isProduction) {
        const sheet = renderer.sh.sheet
        // await console.log('from microtask')
        try {
          sheet.insertRule(rawCssRule, sheet.cssRules.length)
        } catch (error) {
          console.log(error)
        }
      } else {
        renderer.sh.appendChild(document.createTextNode(rawCssRule))
      }
    }
  } else {
    renderer.putRaw = function(rawCssRule: string): void {
      renderer.raw += rawCssRule
    }
  }

  return renderer
}

export { create }
