var test = require('tape');
var keyDownService = require('./key.down.service');

test('key.down.service key toValue', function(t) {
	t.plan(18);

	var event = {};

	event.key = 'noSuchThing';
	keyDownService.toValue(event, function(number) {
		t.equal(number, null, 'noSuchThing');
	});

	var keys = ['Enter', 'Esc', 'Escape', 'Del', 'Delete', 'Decimal', '.'];
	var keyValues = [keyDownService.ENTER, keyDownService.ESC, keyDownService.ESC, keyDownService.DEL, keyDownService.DEL, '.', '.'];
	keys.forEach(function(test, index) {
		event.key = test;
		keyDownService.toValue(event, function(number) {
			t.equal(number, keyValues[index], 'key: ' + keyValues[index]);
		});
	});

	var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	numbers.forEach(function(test) {
		event.key = test;
		keyDownService.toValue(event, function(number) {
			t.equal(number, test, 'number: ' + test);
		});
	});

});

test('key.down.service keyCode toValue', function(t) {
	t.plan(26);

	var event = {};
	event.keyCode = 'noSuchThing';

	keyDownService.toValue(event, function(number) {
		t.equal(number, null, 'noSuchThing');
	});

	var tests = ['13', '27', '46', '48', '96', '49', '97', '50', '98', '51', '99', '52', '100', '53', '101', '54', '102', '55', '103', '56', '104', '57', '105', '110', '190'];
	var values = [keyDownService.ENTER, keyDownService.ESC, keyDownService.DEL, '0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '.', '.'];
	tests.forEach(function(test, index) {
		event.keyCode = test;
		keyDownService.toValue(event, function(number) {
			t.equal(number, values[index], 'value: ' + values[index]);
		});
	});

});
