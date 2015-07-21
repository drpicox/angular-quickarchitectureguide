// productsState.factory.js
/*
	productsState:
		-list: [Product]
		-map: {id: Product}
		-isPresent(id): bool
		-take(rawProduct)
		-takeAll([rawProducts])

*/
'use strict';

module.exports = productsStateFactory;

/* @ngInject */
function productsStateFactory(Product, drpxUpdateable) {
	var state = {
		list: [],
		map: {},
		get: get,//(id)
		isPresent: isPresent,//(id)
		take: take,//(rawProduct)
		takeAll: takeAll,//([rawProducts])
		$update: drpxUpdateable('app.productsUpdate'),
	};
	return state;

	//////

	function get(id) {
		return state.map[id];
	}

	function isPresent(id) {
		return !!state.map[id];
	}

	function take(rawProduct) {
		// may be null/undefined, ignore then
		if (!rawProduct) { return; }
		// identity map pattern, reference object for the same id cannot change
		var product = state.map[rawProduct.id];
		if (!product) {
			// create reference/instance if do not existed
			product = new Product();
			// register new instance
			state.list.push(product);
			state.map[rawProduct.id] = product;
		}
		// take new data
		product.take(rawProduct);
	}

	function takeAll(rawProducts) {
		// take one of each products
		rawProducts.forEach(take);
	}


}