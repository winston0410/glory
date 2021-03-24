import multiInput from 'rollup-plugin-multi-input'
import typescript from 'rollup-plugin-typescript2'
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const path = require('path')

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
			// {
			// 	dir: 'dist/cjs',
			// 	format: 'cjs',
			// 	plugins: [],
			// 	exports: 'named'
			// }
		],
		plugins: [
			multiInput({
				transformOutputPath: (output, input) => {
					const pathObj = path.parse(output)

					if (pathObj.dir === 'src') {
						pathObj.dir = ''
						return path.format(pathObj)
					}

					if (pathObj.dir === 'addon') {
						pathObj.dir = ''
						return path.format(pathObj)
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
