var test = require('tape');
var roundService = require('./round.service');

test('round.service round.', function(t) {
	t.plan(9);

	t.equal(roundService.round(55.4, 0), 55, '0 decimal.');
	t.equal(roundService.round(55.49, 0), 55, '0 decimal.');
	t.equal(roundService.round(55.5, 0), 56, '0 decimal.');

	t.equal(roundService.round(55.54, 1), 55.5, '1 decimal.');
	t.equal(roundService.round(55.549, 1), 55.5, '1 decimal.');
	t.equal(roundService.round(55.55, 1), 55.6, '1 decimal.');

	t.equal(roundService.round(55.50000000054, 10), 55.5000000005, '10 decimals.');
	t.equal(roundService.round(55.500000000549, 10), 55.5000000005, '10 decimals.');
	t.equal(roundService.round(55.50000000055, 10), 55.5000000006, '10 decimals.');
});
