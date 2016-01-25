(function() {
	'use strict';

	var documentService = require('../services/document.service');
	var eventService = require('../services/event.service');
	var nodeListService = require('../services/node.list.service');


	var service = {
		addItem: function(parentNode, index, value, callback) {
			var tr = documentService.createElement('tr');
			var trId = 'row[' + index + ']';
			tr.setAttribute('id', trId);

			// checkbox column.
			var checkboxTd = documentService.createElement('td');
			var checkboxId = 'cb[' + index + ']';
			var checkboxLabel = documentService.createElement('label');
			checkboxLabel.setAttribute('class', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select');
			checkboxLabel.setAttribute('for', checkboxId);

			var checkboxInput = documentService.createElement('input');
			checkboxInput.setAttribute('id', checkboxId);
			checkboxInput.setAttribute('type', 'checkbox');
			checkboxInput.setAttribute('class', 'mdl-checkbox__input');
			eventService.addEventListener(checkboxInput, 'change', function(event) {
				//console.log('remove index' + index);
				//parentNode.removeChild(document.getElementById(trId));
				callback(index, event.target.checked);
			});

			// componentHandler.upgradeElement, See: http://www.getmdl.io/started/index.html - Use MDL on dynamic websites 
			componentHandler.upgradeElement(checkboxInput);
			checkboxLabel.appendChild(checkboxInput);

			componentHandler.upgradeElement(checkboxLabel);
			checkboxTd.appendChild(checkboxLabel);

			componentHandler.upgradeElement(checkboxTd);
			tr.appendChild(checkboxTd);

			//  value column.
			var valueTd = documentService.createElement('td');
			valueTd.textContent = value;
			tr.appendChild(valueTd);

			parentNode.appendChild(tr);
		},
		clear: function(parentNode) {
			nodeListService.forEach(parentNode.childNodes, function(child) {
				parentNode.removeChild(child);
			});
		}
	};
	module.exports = service;
})();
