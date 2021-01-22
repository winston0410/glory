function add(a, b) {
	// block for half a second to demonstrate asynchronicity
	const start = Date.now()
	while (Date.now() - start < 500);
	return a + b
}

module.exports = add
