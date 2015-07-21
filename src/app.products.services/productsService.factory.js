// productsService.factory.js
/*
	productsService:
		-    

*/
'use strict';

module.exports = productsServiceFactory;

/* @ngInject */
function productsServiceFactory(productsRemote,productsState,productsStorage,$q) {
	var service = {
		list: list, //(): *[Product]  
		load: load, //(id): *Product
		save: save, //(Product): *Product
	};

	var listCache = false;

	return service;

	//////

	function list() {
		if (!listCache) {
			listCache = productsRemote.list().then(function(rawproducts) {
				// if remote available, save it locally
				return productsStorage.saveAll(rawproducts);
			}).catch(function() {
				// if no remote available list from storage
				return productsStorage.list();
			}).then(function(rawproducts) {
				// if load remotelly or locally store in memory
				productsState.takeAll(rawproducts);
				productsState.$update();
				return productsState.list;
			});
		}

		return listCache;
	}

	function load(id) {
		if (productsState.isPresent(id)) {
			// if present in memory, return the one in memory (should be a promise)
			return $q.when(productsState.get(id));
		}

		return productsRemote.load(id).then(function(rawProduct) {
			return productsStorage.save(rawProduct);
		}).catch(function() {
			return productsStorage.load(id);
		}).then(function(rawProduct) {
			productsState.take([rawProduct]);
			productsState.$update();
			return productsState.get(id);
		});
	}

	function save(rawProduct) {
		return productsRemote.save(rawProduct)
			.then(function(rawProduct) {
				// then try to save locally if it worked
				return productsStorage.save(rawProduct);
			});
	}
}