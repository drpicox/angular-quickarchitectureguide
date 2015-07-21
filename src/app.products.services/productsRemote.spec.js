describe('productsRemote', function() {
	var provider;

	beforeEach(module('app.products.services'));

	beforeEach(module(function(productsRemoteProvider) {
		provider = productsRemoteProvider;
	}));

	it('should be configured by default to /api/products', inject(function() {
		expect(provider.config.url).toBe('/api/products');
	}));

	it('should load one product', inject(function(productsRemote,$httpBackend) {
		provider.config.url = '/mock';
		var rawProduct = {id:'idl',v:'vl'};
		var result;

		$httpBackend.expect('GET','/mock/idl').respond(rawProduct);
		productsRemote.load('idl').then(function(aResult) {
			result = aResult;
		});
		$httpBackend.flush();
		expect(result.id).toBe(rawProduct.id);
		expect(result.v).toBe(rawProduct.v);
	}));

	it('should save one product', inject(function(productsRemote,$httpBackend) {
		provider.config.url = '/mock';
		var rawProduct = {id:'ids',v:'vs'};
		var savedProduct;

		$httpBackend.expect('PUT','/mock/ids', rawProduct).respond(200, '');
		productsRemote.save(rawProduct).then(function(aSavedProduct) {
			savedProduct = aSavedProduct;
		});

		$httpBackend.flush();
		expect(savedProduct.id).toBe(rawProduct.id);
		expect(savedProduct.v).toBe(rawProduct.v);
	}));

	it('should list products', inject(function(productsRemote,$httpBackend) {
		provider.config.url = '/mock';
		var rawProducts = [{id:'ida',v:'va'},{id:'idb',v:'vb'}];
		var listedProducts;

		$httpBackend.expect('GET','/mock').respond(rawProducts);
		productsRemote.list().then(function(aListedProducts) {
			listedProducts = aListedProducts;
		});

		$httpBackend.flush();
		var i, l;
		expect(listedProducts.length).toBe(rawProducts.length);
		for (i = 0, l = rawProducts.length; i < l; i++) {
			expect(listedProducts[i].id).toBe(rawProducts[i].id);
			expect(listedProducts[i].v).toBe(rawProducts[i].v);
		}
	}))

	afterEach(inject(function($httpBackend) {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));

});