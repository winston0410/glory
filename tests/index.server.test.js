/** @jest-environment node */
'use strict'

global.Worker = require('tiny-worker')
global.Blob = require('cross-blob')
global.URL = require('url-polyfill')

require('./index.test')
