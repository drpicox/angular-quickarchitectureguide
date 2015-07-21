// index.js
/*
	Module app.products.services
*/
'use strict';

var angular = require('angular');

module.exports = angular.module('app.products.services', [

	require('drpx-updateable'),
	require('drpx-storage'),
])

.factory('Product', require('./Product.factory'))
.provider('productsRemote', require('./productsRemote.provider'))
.factory('productsService', require('./productsService.factory'))
.factory('productsState', require('./productsState.factory'))
.factory('productsStorage', require('./productsStorage.factory'))

.name;