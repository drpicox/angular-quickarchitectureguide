// index.js
/*
	Module app.products
*/
'use strict';

var angular = require('angular');

module.exports = angular.module('app.products', [

	require('../app.products.components'),
	require('../app.products.routes'),
	require('../app.products.services'),
])


.name;