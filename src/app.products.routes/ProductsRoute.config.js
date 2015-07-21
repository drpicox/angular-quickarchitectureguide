// ProductsRoute.config.js
/*
	ProductsRoute

*/
'use strict';

module.exports = ProductsRouteConfig;

/* @ngInject */
function ProductsRouteConfig($routeProvider) {
	$routeProvider.when('/products', {
		template: require('./ProductsRoute.tpl.html'),
		controller: ProductsRouteController,
		controllerAs: 'vm',
		resolve: {
			products: ProductsResolver,
		}
	});
}

/* @ngInject */
function ProductsResolver(ProductsService) {
	return ProductsService.list();
}

/* @ngInject */
function ProductsRouteController(products) {
	var vm = this;

	vm.products = products;
}
