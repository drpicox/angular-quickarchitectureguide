// index.js
/*
	Module app.products.routes
*/
'use strict';

var angular = require('angular');

module.exports = angular.module('app.products.routes', [
	require('angular-route'),
])

.config(require('./ProductsRoute.config'))

.name;