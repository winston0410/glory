module.exports = async () => {
	return {
		rootDir: __dirname,
		verbose: false,
		transformIgnorePatterns: [],
		transform: {
			'^.+\\.[t|j]sx?$': 'babel-jest'
		},
		// testEnvironment: 'jest-environment-node',
		testRegex: '.*/tests/.*\\.(test|spec)\\.(jsx?)$',
		setupFiles: ['./tests/setup.js'],
		moduleFileExtensions: ['js', 'jsx', 'json'],
		collectCoverage: true,
		coverageReporters: ['json', 'lcov', 'text']
	}
}
