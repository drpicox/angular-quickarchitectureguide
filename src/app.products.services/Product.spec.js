describe('Product', function() {

	beforeEach(module('app.products.services'));

	it('should take values', inject(function(Product) {

		var product = new Product();
		var values = {
			id: 'id',
			name: 'name',
			price: 'price',
			cost: 'cost',
		};
		product.take(values);

		angular.forEach(values, function(value, key) {
			expect(product[key]).toBe(value);
		});
	}));

	it('should compute profit', inject(function(Product) {

		var product = new Product();
		product.take({
			price: 3,
			cost: 1,
		});

		expect(product.margin()).toBe(2);

		product.take({
			price: 3,
			cost: 2,
		});
		expect(product.margin()).toBe(1);
	}));

	it('should compute profitness', inject(function(Product) {

		var product = new Product();
		product.take({
			price: 3,
			cost: 1,
		});
		expect(product.profitness()).toBe(3);
		product.take({
			price: 3,
			cost: 2,
		});
		expect(product.profitness()).toBe(1.5);
	}));

});