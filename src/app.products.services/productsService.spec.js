describe('productsService', function() {
	var provider, productsRemote, productsState, productsStorage;

	beforeEach(module('app.products.services'));

	beforeEach(module(function($provide) {
		productsStorage = jasmine.createSpyObj('productsStorage', ['list','load','save','saveAll']);
		productsState = jasmine.createSpyObj('productsState', ['isPresent','get','takeAll','take','$update']);
		productsRemote = jasmine.createSpyObj('productsRemote', ['list','load','save']);

		productsState.list = 'list';

		$provide.value('productsState', productsState);
		$provide.value('productsStorage', productsStorage);
		$provide.value('productsRemote', productsRemote);
	}));

	it('should load a list of products and store it', inject(function(productsService,$q,$rootScope) {
		var rawList = [{id:'i1', v:'v1'},{id:'i2', v:'v2'}];
		var products;

		productsRemote.list.and.returnValue($q.when(rawList));
		productsStorage.saveAll.and.returnValue($q.when(rawList));
		productsService.list().then(function(aproducts) {
			expect(productsStorage.saveAll).toHaveBeenCalledWith(rawList);
			expect(productsState.takeAll).toHaveBeenCalledWith(rawList);
			expect(productsState.$update).toHaveBeenCalled();
			products = aproducts;
		});

		$rootScope.$digest();
		expect(products).toBe(productsState.list);
	}));

	it('should load a list of products from store if remote fails', inject(function(productsService,$q,$rootScope) {
		var rawList = [{id:'i1', v:'v1'},{id:'i2', v:'v2'}];
		var products;

		productsRemote.list.and.returnValue($q.reject('error'));
		productsStorage.list.and.returnValue($q.when(rawList));
		productsService.list().then(function(aproducts) {
			expect(productsRemote.list).toHaveBeenCalled();
			expect(productsState.takeAll).toHaveBeenCalledWith(rawList);
			expect(productsState.$update).toHaveBeenCalled();
			
			products = aproducts;
		});

		$rootScope.$digest();
		expect(products).toBe(productsState.list);
	}));

	it('should not load twice a list of products', inject(function(productsService,$q,$rootScope) {
		var rawList = [{id:'i1', v:'v1'},{id:'i2', v:'v2'}];
		var products;

		productsRemote.list.and.returnValue($q.reject('error'));
		productsStorage.list.and.returnValue($q.when(rawList));
		$q.when(true).then(function() {
			return productsService.list();
		}).then(function(aproducts) {
			expect(productsRemote.list).toHaveBeenCalled();
			expect(productsState.takeAll).toHaveBeenCalledWith(rawList);
			expect(productsState.$update).toHaveBeenCalled();
			expect(aproducts).toBe(productsState.list);

			return productsService.list();
		}).then(function(aproducts) {
			expect(productsRemote.list.calls.count()).toBe(1);
			expect(productsState.takeAll.calls.count()).toBe(1);
			expect(productsState.$update.calls.count()).toBe(1);

			products = aproducts;
		});

		$rootScope.$digest();
		expect(products).toBe(productsState.list);
	}));

	it('should load an item from state if present', inject(function(productsService,$rootScope) {

		productsState.isPresent.and.returnValue(true);
		productsState.get.and.returnValue('item');

		var id = 'idx';
		var result;
		productsService.load(id).then(function(aResult) {
			expect(productsState.isPresent).toHaveBeenCalledWith(id);
			expect(productsState.get).toHaveBeenCalledWith(id);
			result = aResult;
		});

		$rootScope.$digest();
		expect(result).toBe('item');
	}));

	it('should load an item from remote if no present and store and take it', inject(function(productsService,$q,$rootScope) {
		var item = {id:'i1', v:'v1'};
		var product;

		productsRemote.load.and.returnValue($q.when(item));
		productsStorage.save.and.returnValue($q.when(item));
		productsState.get.and.returnValue(item);
		productsService.load('i1').then(function(aProduct) {
			expect(productsRemote.load).toHaveBeenCalledWith('i1');
			expect(productsStorage.save).toHaveBeenCalledWith(item);
			expect(productsState.get).toHaveBeenCalledWith('i1');
			expect(productsState.$update).toHaveBeenCalled();
			product = aProduct;
		});

		$rootScope.$digest();
		expect(product).toBe(item);
	}));

	it('should load an item from storage if no present and no remote and take it', inject(function(productsService,$q,$rootScope) {
		var item = {id:'i1', v:'v1'};
		var product;

		productsRemote.load.and.returnValue($q.reject('error'));
		productsStorage.load.and.returnValue($q.when(item));
		productsState.get.and.returnValue(item);
		productsService.load('i1').then(function(aProduct) {
			expect(productsStorage.load).toHaveBeenCalledWith('i1');
			expect(productsState.get).toHaveBeenCalledWith('i1');
			expect(productsState.$update).toHaveBeenCalled();
			product = aProduct;
		});

		$rootScope.$digest();
		expect(product).toBe(item);
	}));

	it('should save a value in remote and store it', inject(function(productsService,$q,$rootScope) {
		var item = {id:'i1', v:'v1'};
		var result;

		productsRemote.save.and.returnValue($q.when(item));
		productsStorage.save.and.returnValue($q.when(item));
		productsService.save(item).then(function(aResult) {
			expect(productsRemote.save).toHaveBeenCalledWith(item);
			expect(productsStorage.save).toHaveBeenCalledWith(item);
			result = aResult;
		});

		$rootScope.$digest();
		expect(result).toBe(item);
	}));

	it('should reject save when remote fails and do not store value', inject(function(productsService,$q,$rootScope) {
		var item = {id:'i1', v:'v1'};
		var reason;

		productsRemote.save.and.returnValue($q.reject('error'));
		productsStorage.save.and.returnValue($q.when(item));
		productsService.save(item).catch(function(aReason) {
			expect(productsRemote.save).toHaveBeenCalledWith(item);
			expect(productsStorage.save.calls.any()).toBe(false);
			reason = aReason;
		});

		$rootScope.$digest();
		expect(reason).toBe('error');

	}));

	afterEach(inject(function($httpBackend) {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));

});