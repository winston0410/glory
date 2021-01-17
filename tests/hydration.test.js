/* eslint-disable */
'use strict'

const env = require('./env')
import { create } from '../src/index'
import addOnHydration from '../src/addon/hydration'

function createNano(config) {
	const nano = create(config)
	addOnHydration(nano)
	return nano
}

describe('hydration', function () {
	it('should update hydration cache when initializing nano in client', function () {
		const nano = createNano({
			client: true
		})

		nano.putRaw = jest.fn()

		nano.put('.one', {
			display: 'block'
		})
	})
})
