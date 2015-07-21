// productsRemote.provider.js
/*
	productsRemote:
		- list(): [*rawProduct]  
		- load(id): *rawProduct
		- save(rawProduct): *rawProduct
	config:
		- url: '/api'

*/
'use strict';

module.exports = productsRemoteProvider;


/* @ngInject */
function productsRemoteProvider() {
	/*jshint validthis: true */
	var config = this.config = {
		url: '/api/products',
	};

	/* @ngInject */
	this.$get = productsRemoteFactory;


	function productsRemoteFactory($http) {
		var remote = {
			list: list, //(): [*rawProduct]  
			load: load, //(id): *rawProduct
			save: save, //(rawProduct): *rawProduct
		};
		return remote;

		//////
		
		function list() {
			return $http.get(config.url).then(function(response) {
				return response.data;
			});
		}

		function load(id) {
			return $http.get(config.url + '/' + id).then(function(response) {
				return response.data;
			});
		}

		function save(rawProduct) {
			return $http.put(config.url + '/' + rawProduct.id, rawProduct).then(function() {
				return rawProduct;
			});
		}
	}
}