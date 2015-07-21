// productsStorage.factory.js
/*
	productsStorage:
		-    

*/
'use strict';

module.exports = productsStorageFactory;

/* @ngInject */
function productsStorageFactory(storageFactory, $q) {
	var service = {
		list: list,//(): *[rawProduct]
		load: load,//(id): *rawProduct
		save: save,//(rawProduct): *rawProduct
	};

	var storage = storageFactory('app.products');

	return service;

	//////

	function list() {
		var pkeys = storage.keys();
		var plist = pkeys.then(function(keys) {
			var arrayOfPromises = keys.map(function(key) {
				return storage.getItem(key);
			});
			return $q.all(arrayOfPromises);
		});
		return plist;
	}

	function load(id) {
		return storage.getItem(id);
	}

	function save(rawProduct) {
		return storage.setItem(rawProduct.id, rawProduct);
	}
}