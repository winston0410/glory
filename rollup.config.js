const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

export default [
	{
		input: './index.js',
		output: [
			{
				file: 'dist/esm/index.js',
				format: 'esm',
				plugins: [],
				exports: 'named'
			},
			{
				file: 'dist/cjs/index.js',
				format: 'cjs',
				plugins: [],
				exports: 'named'
			}
		],
		plugins: [
			nodeResolve({}),
			commonjs({
				include: ['./**', 'node_modules/**']
			})
		]
	}
]
