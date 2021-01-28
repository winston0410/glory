module.exports = async () => {
	return {
		rootDir: __dirname,
		verbose: false,
		transformIgnorePatterns: [],
		transform: {
			'^.+\\.[t|j]sx?$': 'babel-jest'
		},
		// testEnvironment: 'jest-environment-node',
		testRegex: '.*/tests/.*\\.(test|spec)\\.(jsx|js)$',
		setupFiles: ['./tests/setup.js'],
		// setupFilesAfterEnv: ['./tests/setup.js'],
		moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
		collectCoverage: true,
		coverageReporters: ['json', 'lcov', 'text']
	}
}
