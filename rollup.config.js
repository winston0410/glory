import multiInput from 'rollup-plugin-multi-input'
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

export default [
	{
		input: ['src/**/*.js'],
		output: [
			{
				dir: 'dist/esm',
				format: 'esm',
				plugins: [],
				exports: 'named'
			},
			{
				dir: 'dist/cjs',
				format: 'cjs',
				plugins: [],
				exports: 'named'
			}
		],
		plugins: [
			multiInput({
				relative: 'src/addon/',
				transformOutputPath: (output, input) => {
					if (output === 'src/index.js') {
						return 'index.js'
					}
					if (output === 'src/preset.js') {
						return 'preset.js'
					}
					return output
				}
			}),
			nodeResolve({}),
			commonjs({
				include: ['./**', 'node_modules/**']
			})
		]
	}
]
