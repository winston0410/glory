'use strict'
import {
	cssifyObject,
	assembleClassName,
	isAtRule,
	createCache,
	assembleRule
} from '../helper.js'

const CSSRuleToObj = (rule) => {
	const obj = {}
	for (let i = 0; i < rule.style.length; i++) {
		const prop = rule.style[i]
		obj[prop] = rule.style[prop]
	}
	return obj
}

const addOn = function(renderer) {
	createCache(renderer, 'cache')
	createCache(renderer, 'kcache')

	renderer.hydrate = function(sh) {
		if (!sh.sheet) return
		const cssRules = sh.sheet.cssRules
		for (const rule of cssRules) {
			if (rule.constructor.name === 'CSSKeyframesRule') {
				let content = ''
				for (const frameRule of rule.cssRules) {
					content += assembleRule(
						frameRule.keyText,
						cssifyObject(CSSRuleToObj(frameRule))
					)
				}
				console.log('hydrate content', content)
				renderer.kcache[content] = rule.name
			} else if (rule.constructor.name === 'CSSMediaRule') {
				for (const basicRule of rule.cssRules) {
					renderer.cache[
						`@media ${rule.media.mediaText}${cssifyObject(
							CSSRuleToObj(basicRule)
						)}`
					] = basicRule.selectorText
				}
			} else {
				renderer.cache[cssifyObject(CSSRuleToObj(rule))] = rule.selectorText
			}
		}
	}

	if (renderer.client) {
		if (renderer.sh) {
			renderer.hydrate(renderer.sh)
		}
	}
}

export default addOn
