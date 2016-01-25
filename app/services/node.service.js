(function() {
	'use strict';

	var service = {
		textContent: function(node, value) {
			node.textContent = value;
		},
		value: function(node, value) {
			node.value = value;
		}
	};
	module.exports = service;
})();
