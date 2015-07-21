describe('productsState', function() {

	beforeEach(module('app.products.services'));

	it('should take a raw product', inject(function(productsState) {

		var rawProduct = {id:'id1',name:'n1'};
		productsState.take(rawProduct);

		expect(productsState.list.length).toBe(1);

		expect(productsState.list[0].id).toBe(rawProduct.id);
		expect(productsState.list[0].name).toBe(rawProduct.name);
	}));

	it('should take several raw products', inject(function(productsState) {

		var rawProducts = [{id:'id1',name:'n1'},{id:'id2',name:'n2'},{id:'id3',name:'n3'}];
		productsState.takeAll(rawProducts);

		expect(productsState.list.length).toBe(3);

		var products = [];
		rawProducts.forEach(function(rawProduct) {
			expect(productsState.map[rawProduct.id]).toBeDefined();
			expect(productsState.map[rawProduct.id].name).toBe(rawProduct.name);
			products.push(productsState.map[rawProduct.id]);
		});

		products.forEach(function(product) {
			expect(productsState.list).toContain(product);
		});
	}));

	it('should update duplicates ids', inject(function(productsState) {

		var rawProducts = [{id:'id1',name:'n1v1'},{id:'id2',name:'n2'},{id:'id1',name:'n1v2'}];
		productsState.takeAll(rawProducts);

		expect(productsState.list.length).toBe(2);
		rawProducts.slice(1).forEach(function(rawProduct) {
			expect(productsState.map[rawProduct.id].name).toBe(rawProduct.name);
		});
	}));

	it('should keep reference to duplicates ids', inject(function(productsState) {

		productsState.take({id:'id1',name:'n1v1'});
		var product = productsState.list[0];

		productsState.take({id:'id1',name:'n1v2'});
		expect(productsState.list[0]).toBe(product);

	}));

	it('should publish Product compatible objects', inject(function(productsState, Product) {

		var rawProduct = {
			id: 'id',
			name: 'name',
			price: 3,
			cost: 1,
		};

		productsState.take(rawProduct);
		var stateProduct = productsState.list[0];

		var refProduct = new Product();
		refProduct.take(rawProduct);

		expect(stateProduct.id).toBe(refProduct.id);
		expect(stateProduct.name).toBe(refProduct.name);
		expect(stateProduct.price).toBe(refProduct.price);
		expect(stateProduct.cost).toBe(refProduct.cost);
		expect(stateProduct.margin()).toBe(refProduct.margin());
		expect(stateProduct.profitness()).toBe(refProduct.profitness());
	}));

	it('should detect if a product is not present', inject(function(productsState, Product) {

		expect(productsState.isPresent('idx')).toBe(false);
	}));

	it('should detect if a product is present', inject(function(productsState, Product) {

		productsState.take({id: 'idx'});
		expect(productsState.isPresent('idx')).toBe(true);
	}));

	it('should be ablge to get a product by id', inject(function(productsState, Product) {

		productsState.take({id: 'idx', v: 'vx'});
		expect(productsState.get('idx')).toBeDefined();
		expect(productsState.get('idx').id).toBe('idx');
		expect(productsState.get('idx').v).toBe('vx');
	}));

	it('should return falsy if get a non existing element', inject(function(productsState, Product) {

		expect(productsState.get('idx')).toBeFalsy();
	}));

	it('should evantually fire app.productsUpdate when $update', inject(function(productsState, $rootScope) {
		var fired;

		var unon = $rootScope.$on('app.productsUpdate', function() {
			fired = true;
		});
		productsState.$update();
		$rootScope.$digest();

		expect(fired).toBe(true);
	}));

});