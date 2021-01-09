module.exports = async () => {
	return {
		rootDir: __dirname,
		verbose: false,
		transformIgnorePatterns: [],
		testRegex: '.*/tests/.*\\.(test|spec)\\.(jsx?)$',
		setupFiles: ['./tests/setup.js'],
		moduleFileExtensions: ['js', 'jsx', 'json']
	}
}
