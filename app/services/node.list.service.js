(function() {
	'use strict';

	var service = {
		forEach: function(nodeList, callback) {
			// NodeList is not an Array, slice can convert an Array like Object into an Array.
			Array.prototype.slice.call(nodeList).forEach(function(node) {
				callback(node);
			});
		}
	};
	module.exports = service;
})();
