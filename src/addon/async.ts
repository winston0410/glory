'use strict'
import { Renderer } from '../type'

function async(renderer: Renderer): void {
  if (renderer.keyframes) {
    const keyframes = renderer.keyframes
    renderer.keyframes = async (decls) => {
      return await keyframes(decls)
    }
  }

  if (renderer.virtual) {
    const virtual = renderer.virtual
    renderer.virtual = async (decls) => {
      return await virtual(decls)
    }
  }
}

export default async
