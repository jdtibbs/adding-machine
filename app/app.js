	(function() {
		'use strict';

		var addMachineFactory = require('services/add.machine.factory');
		var documentService = require('services/document.service');
		var eventService = require('services/event.service');
		var keyDownService = require('services/key.down.service');
		var tapeService = require('services/tape.service');
		var nodeListService = require('services/node.list.service');
		var nodeService = require('services/node.service');

		var totalElement;
		var tapeTotalElement;
		var inputElement;
		var decimalsLabelElement;
		var tapeTableBodyElement;

		var addMachine = addMachineFactory.create();

		module.exports = {
			init: function() {

				eventService.addEventListener(document, 'DOMContentLoaded', addEvents);

				function addEvents() {
					// set copyright year.
					nodeService.textContent(documentService.getElementById('copyright'), new Date().getFullYear());

					// set dom element variables for events.
					totalElement = documentService.getElementById('total');
					tapeTotalElement = documentService.getElementById('tapeTotal');
					inputElement = documentService.getElementById('input');
					decimalsLabelElement = documentService.getElementById('decimalsLabel');
					tapeTableBodyElement = documentService.getElementById('tapeTableBody');

					// handle decimals slider.
					eventService.addEventListener(documentService.getElementById('decimals'), 'input', decimalSliderEvent);

					// handle number buttons click. 
					nodeListService.forEach(documentService.querySelectorAll('.jdt-number-button'), numberButtonClick);

					// handle Delete, Enter, and Escape keydown.
					eventService.addEventListener(window, 'keydown', keydownEvent);

					// handle Delete, Enter, and Clear button clicks.
					eventService.addEventListener(documentService.getElementById('del'), 'click', deleteButtonClick);

					eventService.addEventListener(documentService.getElementById('clear'), 'click', clearButtonClick);

					eventService.addEventListener(documentService.getElementById('enter'), 'click', enterButtonClick);

					// handle the tape tab subtract checkbox.
					eventService.addEventListener(documentService.getElementById('removeAll'), 'change', removeAllChanged);
				}
			}
		};

		function updateView(response) {
			if (response.input !== undefined) {
				nodeService.textContent(inputElement, response.input);
			}
			if (response.total !== undefined) {
				nodeService.textContent(totalElement, response.total);
				nodeService.textContent(tapeTotalElement, response.total);
			}
		}

		function decimalSliderEvent(event) {
			nodeService.textContent(decimalsLabelElement, 'Decimals: ' + event.target.value);
			addMachine.decimals(event.target.value);
		}

		function numberButtonClick(node) {
			eventService.addEventListener(node, 'click', click);

			function click() {
				updateView(addMachine.input(node.textContent.trim()));
			}
		}

		function deleteButtonClick() {
			updateView(addMachine.del());
		}


		function clearButtonClick() {
			updateView(addMachine.clear());
			tapeService.clear(tapeTableBodyElement);
			// insure subtract checkbox is unchecked.
			documentService.querySelector('.mdl-js-checkbox').MaterialCheckbox.uncheck();
		}

		function enterButtonClick() {
			var response = addMachine.enter();
			if (response.isValid) {
				updateView(response);
				// add this number to the tape.
				tapeService.addItem(tapeTableBodyElement, response.index, response.number, function(changeIndex, removed) {
					// function to remove the number from the total.
					updateView(addMachine.remove(changeIndex, removed));
				});
			}
		}

		function keydownEvent(event) {
			keyDownService.toValue(event, function(value) {
				if (value === keyDownService.ENTER) {
					enterButtonClick();
				} else if (value === keyDownService.ESC) {
					clearButtonClick();
				} else if (value === keyDownService.DEL) {
					deleteButtonClick();
				} else {
					if (value !== null) {
						updateView(addMachine.input(value));
					}
				}
			});
		}

		function removeAllChanged(event) {
			var isRemove = false;
			nodeListService.forEach(tapeTableBodyElement.querySelectorAll('.mdl-js-checkbox'), removeAllCallback);

			function removeAllCallback(node) {
				if (event.target.checked) {
					isRemove = true;
					node.MaterialCheckbox.check();
				} else {
					node.MaterialCheckbox.uncheck();
				}
			}
			updateView(addMachine.removeAll(isRemove));
		}
	})();
