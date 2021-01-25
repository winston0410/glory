/** @jest-environment @jest-runner/electron/environment */
'use strict'
require('electron')
	.remote.getCurrentWindow()
	.show()
describe('create()', function() {
	it('should run', function() {
		expect(1).toBe(1)
	})
})
