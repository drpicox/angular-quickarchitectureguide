/*
describe('app.products remotes', function(){

	beforeEach(module('app.products'));

	it('should have a ProductsService with enough methods', inject(
			function(ProductsService) {

		expect(typeof ProductsService.list).toBe('function');

	}));
});

describe('app.products business logic', function(){



	angular
		.module('app.products.mocked', ['app.products'])
		.factory('ProductsService', function($q) { return {
			_list: [{},{},{}],
			list: function() { return $q.when(this._list); }
		}});

	beforeEach(module('app.products.mocked'));


	it('should show a list of products in the route /products', inject(
			function($compile, $route, $location, $rootScope, ProductsService) {

		var view = $compile('<div><div ng-view></div></div>')($rootScope);

		//browser.get('index.html');
		expect($route.current).toBeUndefined();
		$location.path('/products');
		$rootScope.$digest();

		expect($route.current).toBeDefined();
		//console.log(JSON.stringify($route.current));
		for (var a in $route.current) {
			console.log(a, $route.current[a]);
		}
		console.log('--------------');
		for (var a in view) {
			console.log(a, view[a]);
		}
		console.log('--------------');
		console.log(JSON.stringify($route.current.controller));
		console.log('--------------');
		console.log(JSON.stringify(view.scope().vm));
		console.log('--------------');
		console.log(JSON.stringify(view.isolateScope()));
		console.log('--------------');
		//expect($route.current.controller).not.toBeUndefined();
		//expect($route.current.controller.products).toBe(ProductsService._list);

		/*
		var controller = $route.current.controller;	    	
		expect(controller.products.list.length).toBe(3);
		* /
		/*
		expect($location.path()).toBe('/phones/');
		expect($route.current.templateUrl).toEqual('partials/phone-list.html');
		expect($route.current.controller).toBe(PhoneListCtrl);
		* /
	}))

	//// it is not testing the app vvvvvvv

	it('should be a Product defiened', inject(function(Product) {
		expect(Product).toBeDefined();
	}));	

	it('Product should take id, name, price, cost', inject(function(Product) {
		var rawProduct = {
			id: 'id',
			name: 'name',
			price: 3.5,
			cost: 2.1,
		};

		var product = new Product();
		product.take(rawProduct);

		expect(product.id).toEqual(rawProduct.id);
		expect(product.name).toEqual(rawProduct.name);
		expect(product.price).toEqual(rawProduct.price);
		expect(product.cost).toEqual(rawProduct.cost);
	}));



});
*/