// Product.factory.js
/*
	Product:
		.id
		.name
		.price
		.cost
		.margin(): number     #
		.profitness(): number #
		.take(rawProduct)

*/
'use strict';

var angular = require('angular');

module.exports = ProductFactory;

/* @ngInject */
function ProductFactory() {
	/*jshint validthis: true */

	function Product() {
	}

	Product.prototype.margin = margin;
	Product.prototype.profitness = profitness;
	Product.prototype.take = take;

	return Product;

	///////

	function margin() {
		return this.price - this.cost;
	}

	function profitness() {
		return 1 + this.margin() / this.cost;
	}

	function take(rawProduct) {
		angular.extend(this, rawProduct);
	}
}