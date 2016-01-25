(function() {
	'use strict';

	var roundService = require('../services/round.service'); // path accounts for unit test.

	var factory = {
		create: function() {
			var service = {
				decimals: 2,
				number: [],
				numbers: [],
				removed: []
			};

			function total() {
				return roundService.round(
					service.numbers.filter(function(value, index) {
						return service.removed.indexOf(index) === -1;
					}).reduce(function(prev, curr) {
						return prev + curr;
					}, 0), service.decimals);
			}

			function toText() {
				var init;
				if (service.number.length === 0) {
					init = '0';
				} else {
					init = '';
				}
				return service.number.reduce(function(prev, curr) {
					return prev.concat(curr);
				}, init);
			}

			return {
				clear: function() {
					service.number.length = 0;
					service.numbers.length = 0;
					service.removed.length = 0;
					return {
						input: 0,
						total: 0
					};
				},
				decimals: function(decimals) {
					service.decimals = decimals;
				},
				del: function() {
					service.number.splice(service.number.length - 1, 1);
					return {
						input: toText()
					};
				},
				enter: function() {
					var response = {};
					response.isValid = false;

					var number = Number(toText());
					if (!isNaN(number) && number !== 0) {
						response.isValid = true;
						service.numbers.push(number);
						response.number = number;
						response.total = total();
						response.index = service.numbers.length - 1;
					}

					response.input = 0;
					service.number.length = 0;
					return response;
				},
				input: function(value) {
					if (value !== '.') {
						service.number.push(value);
					} else if (service.number.indexOf('.') === -1) {
						// only if contains no decimal.
						service.number.push(value);
					}
					return {
						input: toText()
					};
				},
				remove: function(changeIndex, isRemoved) {
					if (changeIndex !== undefined && changeIndex > -1) {
						if (isRemoved !== undefined && isRemoved) {
							// add index to numbers that have been removed from total.
							service.removed.push(changeIndex);
						} else {
							// remove index from numbers that have been removed from total.
							service.removed.splice(service.removed.indexOf(changeIndex), 1);
						}
					}
					return {
						total: total()
					};
				},
				removeAll: function(isRemove) {
					service.removed.length = 0;
					if (isRemove) {
						service.numbers.forEach(function(value, index) {
							service.removed.push(index);
						});
					}
					return {
						total: total()
					};
				}
			};
		}
	};

	module.exports = factory;
})();
