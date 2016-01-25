var test = require('tape');
var addMachineFactory = require('./add.machine.factory');

function getAddMachine() {
	return addMachineFactory.create();
}

test('add.machine.factory input', function(t) {
	t.plan(7);

	var addMachine = getAddMachine();

	t.equal(addMachine.input('1').input, '1', 'input 1st digit');

	t.equal(addMachine.input('2').input, '12', 'input 2nd digit');

	t.equal(addMachine.input('3').input, '123', 'input 3rd digit');

	t.equal(addMachine.input('.').input, '123.', 'input decimal');

	t.equal(addMachine.input('.').input, '123.', 'allow only one decimal place #1.');

	t.equal(addMachine.input('1').input, '123.1', 'input 4th digit');

	t.equal(addMachine.input('.').input, '123.1', 'allow only one decimal place #2.');
});

test('add.machine.factory delete', function(t) {
	t.plan(6);

	var addMachine = getAddMachine();

	// if no number to delete, return 0.
	t.equal(addMachine.del().input, '0', 'delete nothing');

	// if only one number, return 0.
	t.equal(addMachine.input('1').input, '1');

	t.equal(addMachine.del().input, '0', 'delete one number');

	// if more than one number remove only the last number.
	t.equal(addMachine.input('1').input, '1');
	t.equal(addMachine.input('2').input, '12');

	t.equal(addMachine.del().input, '1', 'two numbers delete one');

});

test('add.machine.factory enter & clear', function(t) {
	t.plan(9);

	var addMachine = getAddMachine();

	//  nothing yet to add, result 0's.
	t.deepEqual(addMachine.enter(), {
		isValid: false,
		input: 0,
	}, 'noting to enter');

	// NaN.
	t.equal(addMachine.input('.').input, '.');

	t.deepEqual(addMachine.enter(), {
		isValid: false,
		input: 0
	}, 'cannot enter just a decimal');

	// prep for next test.
	t.deepEqual(addMachine.clear(), {
		input: 0,
		total: 0
	}, 'clear nothing');

	t.equal(addMachine.input('12').input, '12');

	t.deepEqual(addMachine.enter(), {
		isValid: true,
		index: 0,
		input: 0,
		number: 12,
		total: 12
	}, 'enter two digit number');

	// add a second number.
	t.equal(addMachine.input('6').input, '6');

	t.deepEqual(addMachine.enter(), {
		isValid: true,
		index: 1,
		input: 0,
		number: 6,
		total: 18
	}, 'enter two digit number');

	t.deepEqual(addMachine.clear(), {
		input: 0,
		total: 0
	}, 'clear entry of two numbers');

});

test('add.machine.factory remove', function(t) {
	t.plan(6);

	var addMachine = getAddMachine();

	t.equal(addMachine.remove(undefined, true).total, 0, 'index is undefined');

	t.equal(addMachine.remove(0, undefined).total, 0, 'isRemoved is undefined');

	t.equal(addMachine.input('6').input, '6', 'input number');

	t.deepEqual(addMachine.enter(), {
		isValid: true,
		index: 0,
		input: 0,
		number: 6,
		total: 6
	}, 'enter number');

	t.equal(addMachine.remove(0, true).total, 0, 'remove number');

	t.equal(addMachine.remove(0, false).total, 6, 'restore number');

});

test('add.machine.factory removeAll', function(t) {
	t.plan(6);

	var addMachine = getAddMachine();

	t.equal(addMachine.input('5').input, '5', 'input 1st number');

	t.deepEqual(addMachine.enter(), {
		isValid: true,
		index: 0,
		input: 0,
		number: 5,
		total: 5
	}, 'enter number');

	t.equal(addMachine.input('10').input, '10', 'input 2nd number');

	t.deepEqual(addMachine.enter(), {
		isValid: true,
		index: 1,
		input: 0,
		number: 10,
		total: 15
	}, 'enter number');

	t.equal(addMachine.removeAll(true).total, 0, 'remove all numbers');

	t.equal(addMachine.removeAll(false).total, 15, 'restore all numbers');

});
