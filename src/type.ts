interface Renderer {
	raw?: String
	pfx?: String
	client?: Boolean
	hash?: Function
	hashChars?: String
	sh?: HTMLStyleElement
	putRaw?: (cssString: string) => void
	[prop: string]: any
}

export { Renderer }
