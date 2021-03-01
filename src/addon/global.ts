'use strict'
import { Renderer } from '../type'
import { cssifyObject, assembleRule } from '../helper'
import safeIsObj from 'safe-is-obj'

const concatSelectors = (selectors) => {
  return selectors.join(',')
}

function global(renderer: Renderer): void {
	renderer.global = function(decls, selectors) {
		if (!safeIsObj(decls)) return null
    renderer.putRaw(
      assembleRule(
        concatSelectors(selectors),
        cssifyObject(decls)
      )
    )
    return null
	}
}

export default global
