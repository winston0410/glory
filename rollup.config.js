import multiInput from 'rollup-plugin-multi-input'
import typescript from 'rollup-plugin-typescript2'
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

export default [
	{
		input: ['src/**/*.ts'],
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
				// relative: 'src/addon/',
				transformOutputPath: (output, input) => {
					console.log('check output, input', output, input)
					if (output.match(/addon/)) {
						return output.replace(/\/addon/, '')
					}
					if (output === 'src/index.ts') {
						return 'index.js'
					}
					if (output === 'src/helper.ts') {
						return 'helper.js'
					}
					if (output === 'src/type.ts') {
						return ''
					}
					return output
				}
			}),
			nodeResolve({}),
			commonjs({
				include: ['./**', 'node_modules/**']
			}),
			typescript({
				tsconfig: 'tsconfig.json'
			})
		]
	}
]
