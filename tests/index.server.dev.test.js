/** @jest-environment node */
'use strict'

global.Worker = require('tiny-worker')
global.Blob = require('cross-blob')
global.URL = require('url-polyfill')

process.env.NODE_ENV = 'development'

require('./index.test')
