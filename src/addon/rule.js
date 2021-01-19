'use strict'
import {
	assembleClassName,
	isAtRule,
	cssifyObject,
	assembleRule
} from '../helper'

import { hyphenateProperty } from 'css-in-js-utils'
import { isEmpty } from 'rambda'

const addOn = function (renderer) {
	const handleNestedDecls = (selector, atRule) => (prop, value) => {
		if (isAtRule(prop)) {
			renderer.put(selector, value, prop)
		} else {
			renderer.put(renderer.selector(selector, prop), value, atRule)
		}
	}

	renderer.put = function (selector, decls, atRule) {
		const css = cssifyObject(decls, handleNestedDecls(selector, atRule))

		if (isEmpty(css)) {
			return ''
		}

		const withSelector = assembleRule(selector, css)

		renderer.putRaw(atRule ? assembleRule(atRule, withSelector) : withSelector)

		return ''
	}

	renderer.rule = function (css, name) {
		const className = assembleClassName(renderer, name)
		renderer.put(`.${className}`, css)
		return className
	}
}

export default addOn
