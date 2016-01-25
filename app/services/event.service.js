(function() {
	'use strict';

	var service = {
		addEventListener: function(element, event, callback) {
			element.addEventListener(event, function(event) {
				if (event.defaultPrevented) {
					return;
				}
				callback(event);
				event.preventDefault();
			}, true);
		}
	};
	module.exports = service;
})();
