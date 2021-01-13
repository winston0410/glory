'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var index = require('../index-6dcda881.js')
var rambda_esm = require('../rambda.esm-7335a530.js')

var DASH = /-([a-z])/g
var MS = /^Ms/g
var cache = {}

function toUpper(match) {
	return match[1].toUpperCase()
}

function camelCaseProperty(property) {
	if (cache.hasOwnProperty(property)) {
		return cache[property]
	}

	var camelProp = property.replace(DASH, toUpper).replace(MS, 'ms')
	cache[property] = camelProp
	return camelProp
}

function capitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function prefixProperty(prefixProperties, property, style) {
	if (prefixProperties.hasOwnProperty(property)) {
		var newStyle = {}
		var requiredPrefixes = prefixProperties[property]
		var capitalizedProperty = capitalizeString(property)
		var keys = Object.keys(style)
		for (var i = 0; i < keys.length; i++) {
			var styleProperty = keys[i]
			if (styleProperty === property) {
				for (var j = 0; j < requiredPrefixes.length; j++) {
					newStyle[requiredPrefixes[j] + capitalizedProperty] = style[property]
				}
			}
			newStyle[styleProperty] = style[styleProperty]
		}
		return newStyle
	}
	return style
}

function prefixValue(plugins, property, value, style, metaData) {
	for (var i = 0, len = plugins.length; i < len; ++i) {
		var processedValue = plugins[i](property, value, style, metaData)

		// we can stop processing if a value is returned
		// as all plugin criteria are unique
		if (processedValue) {
			return processedValue
		}
	}
}

function addIfNew(list, value) {
	if (list.indexOf(value) === -1) {
		list.push(value)
	}
}

function addNewValuesOnly(list, values) {
	if (Array.isArray(values)) {
		for (var i = 0, len = values.length; i < len; ++i) {
			addIfNew(list, values[i])
		}
	} else {
		addIfNew(list, values)
	}
}

function isObject(value) {
	return value instanceof Object && !Array.isArray(value)
}

function createPrefixer(_ref) {
	var prefixMap = _ref.prefixMap,
		plugins = _ref.plugins

	return function prefix(style) {
		for (var property in style) {
			var value = style[property]

			// handle nested objects
			if (isObject(value)) {
				style[property] = prefix(value)
				// handle array values
			} else if (Array.isArray(value)) {
				var combinedValue = []

				for (var i = 0, len = value.length; i < len; ++i) {
					var processedValue = prefixValue(
						plugins,
						property,
						value[i],
						style,
						prefixMap
					)
					addNewValuesOnly(combinedValue, processedValue || value[i])
				}

				// only modify the value if it was touched
				// by any plugin to prevent unnecessary mutations
				if (combinedValue.length > 0) {
					style[property] = combinedValue
				}
			} else {
				var _processedValue = prefixValue(
					plugins,
					property,
					value,
					style,
					prefixMap
				)

				// only modify the value if it was touched
				// by any plugin to prevent unnecessary mutations
				if (_processedValue) {
					style[property] = _processedValue
				}

				style = prefixProperty(prefixMap, property, style)
			}
		}

		return style
	}
}

var w = ['Webkit']
var m = ['Moz']
var ms = ['ms']
var wm = ['Webkit', 'Moz']
var wms = ['Webkit', 'ms']
var wmms = ['Webkit', 'Moz', 'ms']

var data = {
	plugins: [],
	prefixMap: {
		appearance: wm,
		textEmphasisPosition: w,
		textEmphasis: w,
		textEmphasisStyle: w,
		textEmphasisColor: w,
		boxDecorationBreak: w,
		maskImage: w,
		maskMode: w,
		maskRepeat: w,
		maskPosition: w,
		maskClip: w,
		maskOrigin: w,
		maskSize: w,
		maskComposite: w,
		mask: w,
		maskBorderSource: w,
		maskBorderMode: w,
		maskBorderSlice: w,
		maskBorderWidth: w,
		maskBorderOutset: w,
		maskBorderRepeat: w,
		maskBorder: w,
		maskType: w,
		textDecorationStyle: w,
		textDecorationSkip: w,
		textDecorationLine: w,
		textDecorationColor: w,
		userSelect: wmms,
		backdropFilter: w,
		fontKerning: w,
		scrollSnapType: wms,
		scrollSnapPointsX: wms,
		scrollSnapPointsY: wms,
		scrollSnapDestination: wms,
		scrollSnapCoordinate: wms,
		clipPath: w,
		shapeImageThreshold: w,
		shapeImageMargin: w,
		shapeImageOutside: w,
		filter: w,
		hyphens: wms,
		flowInto: wms,
		flowFrom: wms,
		breakBefore: wms,
		breakAfter: wms,
		breakInside: wms,
		regionFragment: wms,
		writingMode: w,
		textOrientation: w,
		tabSize: m,
		fontFeatureSettings: w,
		columnCount: w,
		columnFill: w,
		columnGap: w,
		columnRule: w,
		columnRuleColor: w,
		columnRuleStyle: w,
		columnRuleWidth: w,
		columns: w,
		columnSpan: w,
		columnWidth: w,
		wrapFlow: ms,
		wrapThrough: ms,
		wrapMargin: ms,
		textSizeAdjust: w
	}
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#Browser_compatibility
function backgroundClip(property, value) {
	if (typeof value === 'string' && value === 'text') {
		return ['-webkit-text', 'text']
	}
}

var prefixes = ['-webkit-', '-moz-', '']

var values = {
	'zoom-in': true,
	'zoom-out': true,
	grab: true,
	grabbing: true
}

function cursor(property, value) {
	if (property === 'cursor' && values.hasOwnProperty(value)) {
		return prefixes.map(function (prefix) {
			return prefix + value
		})
	}
}

function getDefaultExportFromCjs(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')
		? x['default']
		: x
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n
	var a = Object.defineProperty({}, '__esModule', { value: true })
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k)
		Object.defineProperty(
			a,
			k,
			d.get
				? d
				: {
						enumerable: true,
						get: function () {
							return n[k]
						}
				  }
		)
	})
	return a
}

function createCommonjsModule(fn) {
	var module = { exports: {} }
	return fn(module, module.exports), module.exports
}

var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, '__esModule', {
		value: true
	})
	exports.default = isPrefixedValue
	var regex = /-webkit-|-moz-|-ms-/

	function isPrefixedValue(value) {
		return typeof value === 'string' && regex.test(value)
	}
	module.exports = exports['default']
})

var isPrefixedValue = /*@__PURE__*/ getDefaultExportFromCjs(isPrefixedValue_1)

// http://caniuse.com/#search=cross-fade
var prefixes$1 = ['-webkit-', '']

function crossFade(property, value) {
	if (
		typeof value === 'string' &&
		!isPrefixedValue(value) &&
		value.indexOf('cross-fade(') > -1
	) {
		return prefixes$1.map(function (prefix) {
			return value.replace(/cross-fade\(/g, prefix + 'cross-fade(')
		})
	}
}

// http://caniuse.com/#feat=css-filter-function
var prefixes$2 = ['-webkit-', '']

function filter(property, value) {
	if (
		typeof value === 'string' &&
		!isPrefixedValue(value) &&
		value.indexOf('filter(') > -1
	) {
		return prefixes$2.map(function (prefix) {
			return value.replace(/filter\(/g, prefix + 'filter(')
		})
	}
}

var values$1 = {
	flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
	'inline-flex': [
		'-webkit-inline-box',
		'-moz-inline-box',
		'-ms-inline-flexbox',
		'-webkit-inline-flex',
		'inline-flex'
	]
}

function flex(property, value) {
	if (property === 'display' && values$1.hasOwnProperty(value)) {
		return values$1[value]
	}
}

var alternativeValues = {
	'space-around': 'justify',
	'space-between': 'justify',
	'flex-start': 'start',
	'flex-end': 'end',
	'wrap-reverse': 'multiple',
	wrap: 'multiple'
}

var alternativeProps = {
	alignItems: 'WebkitBoxAlign',
	justifyContent: 'WebkitBoxPack',
	flexWrap: 'WebkitBoxLines',
	flexGrow: 'WebkitBoxFlex'
}

function flexboxOld(property, value, style) {
	if (property === 'flexDirection' && typeof value === 'string') {
		if (value.indexOf('column') > -1) {
			style.WebkitBoxOrient = 'vertical'
		} else {
			style.WebkitBoxOrient = 'horizontal'
		}
		if (value.indexOf('reverse') > -1) {
			style.WebkitBoxDirection = 'reverse'
		} else {
			style.WebkitBoxDirection = 'normal'
		}
	}
	if (alternativeProps.hasOwnProperty(property)) {
		style[alternativeProps[property]] = alternativeValues[value] || value
	}
}

var prefixes$3 = ['-webkit-', '-moz-', '']
var values$2 = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/gi

function gradient(property, value) {
	if (
		typeof value === 'string' &&
		!isPrefixedValue(value) &&
		values$2.test(value)
	) {
		return prefixes$3.map(function (prefix) {
			return value.replace(values$2, function (grad) {
				return prefix + grad
			})
		})
	}
}

var _slicedToArray = (function () {
	function sliceIterator(arr, i) {
		var _arr = []
		var _n = true
		var _d = false
		var _e = undefined
		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value)
				if (i && _arr.length === i) break
			}
		} catch (err) {
			_d = true
			_e = err
		} finally {
			try {
				if (!_n && _i['return']) _i['return']()
			} finally {
				if (_d) throw _e
			}
		}
		return _arr
	}
	return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i)
		} else {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance'
			)
		}
	}
})()

function isSimplePositionValue(value) {
	return typeof value === 'number' && !isNaN(value)
}

function isComplexSpanValue(value) {
	return typeof value === 'string' && value.includes('/')
}

var alignmentValues = ['center', 'end', 'start', 'stretch']

var displayValues = {
	'inline-grid': ['-ms-inline-grid', 'inline-grid'],
	grid: ['-ms-grid', 'grid']
}

var propertyConverters = {
	alignSelf: function alignSelf(value, style) {
		if (alignmentValues.indexOf(value) > -1) {
			style.msGridRowAlign = value
		}
	},

	gridColumn: function gridColumn(value, style) {
		if (isSimplePositionValue(value)) {
			style.msGridColumn = value
		} else if (isComplexSpanValue(value)) {
			var _value$split = value.split('/'),
				_value$split2 = _slicedToArray(_value$split, 2),
				start = _value$split2[0],
				end = _value$split2[1]

			propertyConverters.gridColumnStart(+start, style)

			var _end$split = end.split(/ ?span /),
				_end$split2 = _slicedToArray(_end$split, 2),
				maybeSpan = _end$split2[0],
				maybeNumber = _end$split2[1]

			if (maybeSpan === '') {
				propertyConverters.gridColumnEnd(+start + +maybeNumber, style)
			} else {
				propertyConverters.gridColumnEnd(+end, style)
			}
		} else {
			propertyConverters.gridColumnStart(value, style)
		}
	},

	gridColumnEnd: function gridColumnEnd(value, style) {
		var msGridColumn = style.msGridColumn

		if (isSimplePositionValue(value) && isSimplePositionValue(msGridColumn)) {
			style.msGridColumnSpan = value - msGridColumn
		}
	},

	gridColumnStart: function gridColumnStart(value, style) {
		if (isSimplePositionValue(value)) {
			style.msGridColumn = value
		}
	},

	gridRow: function gridRow(value, style) {
		if (isSimplePositionValue(value)) {
			style.msGridRow = value
		} else if (isComplexSpanValue(value)) {
			var _value$split3 = value.split('/'),
				_value$split4 = _slicedToArray(_value$split3, 2),
				start = _value$split4[0],
				end = _value$split4[1]

			propertyConverters.gridRowStart(+start, style)

			var _end$split3 = end.split(/ ?span /),
				_end$split4 = _slicedToArray(_end$split3, 2),
				maybeSpan = _end$split4[0],
				maybeNumber = _end$split4[1]

			if (maybeSpan === '') {
				propertyConverters.gridRowEnd(+start + +maybeNumber, style)
			} else {
				propertyConverters.gridRowEnd(+end, style)
			}
		} else {
			propertyConverters.gridRowStart(value, style)
		}
	},

	gridRowEnd: function gridRowEnd(value, style) {
		var msGridRow = style.msGridRow

		if (isSimplePositionValue(value) && isSimplePositionValue(msGridRow)) {
			style.msGridRowSpan = value - msGridRow
		}
	},

	gridRowStart: function gridRowStart(value, style) {
		if (isSimplePositionValue(value)) {
			style.msGridRow = value
		}
	},

	gridTemplateColumns: function gridTemplateColumns(value, style) {
		style.msGridColumns = value
	},

	gridTemplateRows: function gridTemplateRows(value, style) {
		style.msGridRows = value
	},

	justifySelf: function justifySelf(value, style) {
		if (alignmentValues.indexOf(value) > -1) {
			style.msGridColumnAlign = value
		}
	}
}

function grid(property, value, style) {
	if (property === 'display' && value in displayValues) {
		return displayValues[value]
	}

	if (property in propertyConverters) {
		var propertyConverter = propertyConverters[property]
		propertyConverter(value, style)
	}
}

// http://caniuse.com/#feat=css-image-set
var prefixes$4 = ['-webkit-', '']

function imageSet(property, value) {
	if (
		typeof value === 'string' &&
		!isPrefixedValue(value) &&
		value.indexOf('image-set(') > -1
	) {
		return prefixes$4.map(function (prefix) {
			return value.replace(/image-set\(/g, prefix + 'image-set(')
		})
	}
}

var alternativeProps$1 = {
	marginBlockStart: ['WebkitMarginBefore'],
	marginBlockEnd: ['WebkitMarginAfter'],
	marginInlineStart: ['WebkitMarginStart', 'MozMarginStart'],
	marginInlineEnd: ['WebkitMarginEnd', 'MozMarginEnd'],
	paddingBlockStart: ['WebkitPaddingBefore'],
	paddingBlockEnd: ['WebkitPaddingAfter'],
	paddingInlineStart: ['WebkitPaddingStart', 'MozPaddingStart'],
	paddingInlineEnd: ['WebkitPaddingEnd', 'MozPaddingEnd'],
	borderBlockStart: ['WebkitBorderBefore'],
	borderBlockStartColor: ['WebkitBorderBeforeColor'],
	borderBlockStartStyle: ['WebkitBorderBeforeStyle'],
	borderBlockStartWidth: ['WebkitBorderBeforeWidth'],
	borderBlockEnd: ['WebkitBorderAfter'],
	borderBlockEndColor: ['WebkitBorderAfterColor'],
	borderBlockEndStyle: ['WebkitBorderAfterStyle'],
	borderBlockEndWidth: ['WebkitBorderAfterWidth'],
	borderInlineStart: ['WebkitBorderStart', 'MozBorderStart'],
	borderInlineStartColor: ['WebkitBorderStartColor', 'MozBorderStartColor'],
	borderInlineStartStyle: ['WebkitBorderStartStyle', 'MozBorderStartStyle'],
	borderInlineStartWidth: ['WebkitBorderStartWidth', 'MozBorderStartWidth'],
	borderInlineEnd: ['WebkitBorderEnd', 'MozBorderEnd'],
	borderInlineEndColor: ['WebkitBorderEndColor', 'MozBorderEndColor'],
	borderInlineEndStyle: ['WebkitBorderEndStyle', 'MozBorderEndStyle'],
	borderInlineEndWidth: ['WebkitBorderEndWidth', 'MozBorderEndWidth']
}

function logical(property, value, style) {
	if (Object.prototype.hasOwnProperty.call(alternativeProps$1, property)) {
		var alternativePropList = alternativeProps$1[property]
		for (var i = 0, len = alternativePropList.length; i < len; ++i) {
			style[alternativePropList[i]] = value
		}
	}
}

function position(property, value) {
	if (property === 'position' && value === 'sticky') {
		return ['-webkit-sticky', 'sticky']
	}
}

var prefixes$5 = ['-webkit-', '-moz-', '']

var properties = {
	maxHeight: true,
	maxWidth: true,
	width: true,
	height: true,
	columnWidth: true,
	minWidth: true,
	minHeight: true
}
var values$3 = {
	'min-content': true,
	'max-content': true,
	'fill-available': true,
	'fit-content': true,
	'contain-floats': true
}

function sizing(property, value) {
	if (properties.hasOwnProperty(property) && values$3.hasOwnProperty(value)) {
		return prefixes$5.map(function (prefix) {
			return prefix + value
		})
	}
}

var _hyphenateStyleName = /*@__PURE__*/ getAugmentedNamespace(
	index.hyphenateStyleName$1
)

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, '__esModule', {
		value: true
	})
	exports.default = hyphenateProperty

	var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName)

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj }
	}

	function hyphenateProperty(property) {
		return (0, _hyphenateStyleName2.default)(property)
	}
	module.exports = exports['default']
})

var hyphenateProperty = /*@__PURE__*/ getDefaultExportFromCjs(
	hyphenateProperty_1
)

var properties$1 = {
	transition: true,
	transitionProperty: true,
	WebkitTransition: true,
	WebkitTransitionProperty: true,
	MozTransition: true,
	MozTransitionProperty: true
}

var prefixMapping = {
	Webkit: '-webkit-',
	Moz: '-moz-',
	ms: '-ms-'
}

function prefixValue$1(value, propertyPrefixMap) {
	if (isPrefixedValue(value)) {
		return value
	}

	// only split multi values, not cubic beziers
	var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

	for (var i = 0, len = multipleValues.length; i < len; ++i) {
		var singleValue = multipleValues[i]
		var values = [singleValue]
		for (var property in propertyPrefixMap) {
			var dashCaseProperty = hyphenateProperty(property)

			if (
				singleValue.indexOf(dashCaseProperty) > -1 &&
				dashCaseProperty !== 'order'
			) {
				var prefixes = propertyPrefixMap[property]
				for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
					// join all prefixes and create a new value
					values.unshift(
						singleValue.replace(
							dashCaseProperty,
							prefixMapping[prefixes[j]] + dashCaseProperty
						)
					)
				}
			}
		}

		multipleValues[i] = values.join(',')
	}

	return multipleValues.join(',')
}

function transition(property, value, style, propertyPrefixMap) {
	// also check for already prefixed transitions
	if (typeof value === 'string' && properties$1.hasOwnProperty(property)) {
		var outputValue = prefixValue$1(value, propertyPrefixMap)
		// if the property is already prefixed
		var webkitOutput = outputValue
			.split(/,(?![^()]*(?:\([^()]*\))?\))/g)
			.filter(function (val) {
				return !/-moz-|-ms-/.test(val)
			})
			.join(',')

		if (property.indexOf('Webkit') > -1) {
			return webkitOutput
		}

		var mozOutput = outputValue
			.split(/,(?![^()]*(?:\([^()]*\))?\))/g)
			.filter(function (val) {
				return !/-webkit-|-ms-/.test(val)
			})
			.join(',')

		if (property.indexOf('Moz') > -1) {
			return mozOutput
		}

		style['Webkit' + capitalizeString(property)] = webkitOutput
		style['Moz' + capitalizeString(property)] = mozOutput
		return outputValue
	}
}

var plugins = [
	backgroundClip,
	crossFade,
	cursor,
	filter,
	flexboxOld,
	gradient,
	grid,
	imageSet,
	logical,
	position,
	sizing,
	transition,
	flex
]

var prefix = createPrefixer({
	prefixMap: data.prefixMap,
	plugins: plugins
})

const assembleClassName = (renderer, name) =>
	renderer.pfx + (name || renderer.hash())

const addPrefix = rambda_esm.pipe(
	Object.entries,
	rambda_esm.map(([prop, value]) => [camelCaseProperty(prop), value]),
	Object.fromEntries,
	prefix
)

exports.addPrefix = addPrefix
exports.assembleClassName = assembleClassName
