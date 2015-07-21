'use strict';
describe('/products', function() {

	var ngView, vm;

	beforeEach(module('app.products.routes'));

	beforeEach(module(function($provide) {
		$provide.service('ProductsService', function($q) {
			this._list = [{},{},{}];
			this.list = function() { return $q.when(this._list); };
		});
	}));

	beforeEach(inject(function($compile,$location,$rootScope) {
		var root = $compile('<div><div ng-view></div></div>')($rootScope);
		$location.path('/products');
		$rootScope.$digest();
		ngView = root.children();
		vm = ngView.scope().vm;
	}));


	it('should be have controller', function() {

		expect(ngView.controller()).toBeDefined();
		expect(vm).toBe(ngView.controller());
	});

	it('should list products', inject(function(ProductsService) {
		
		expect(vm.products).toBe(ProductsService._list);
	}));

});