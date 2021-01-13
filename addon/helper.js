const assembleClassName = (renderer, name) =>
	renderer.pfx + (name || renderer.hash())

export { assembleClassName }
