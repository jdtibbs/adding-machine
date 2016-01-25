(function() {
	'use strict';

	var service = {
		'ENTER': 'ENTER',
		'ESC': 'ESC',
		'DEL': 'DEL',
		toValue: function(event, callback) {
			// console.log(event.key); // warning! not in Chrome?
			// console.log(event.keyCode); // warning! deprecated
			// console.log(event.keyIdentifier); // warning! deprecated
			var key = {
				'Enter': this.ENTER,
				'Esc': this.ESC,
				'Escape': this.ESC,
				'Del': this.DEL,
				'Delete': this.DEL,
				'0': '0',
				'1': '1',
				'2': '2',
				'3': '3',
				'4': '4',
				'5': '5',
				'6': '6',
				'7': '7',
				'8': '8',
				'9': '9',
				'.': '.',
				'Decimal': '.'
			};

			var keyCodes = {
				'13': this.ENTER,
				'27': this.ESC,
				'46': this.DEL,
				'48': '0',
				'96': '0',
				'49': '1',
				'97': '1',
				'50': '2',
				'98': '2',
				'51': '3',
				'99': '3',
				'52': '4',
				'100': '4',
				'53': '5',
				'101': '5',
				'54': '6',
				'102': '6',
				'55': '7',
				'103': '7',
				'56': '8',
				'104': '8',
				'57': '9',
				'105': '9',
				'110': '.',
				'190': '.'
			};
			var keyIdentifier = {
				'Enter': this.ENTER,
				'U+001B': this.ESC,
				'U+007F': this.DEL,
				'U+0030': '0',
				'U+0060': '0',
				'U+0031': '1',
				'U+0041': '1',
				'U+0032': '2',
				'U+0042': '2',
				'U+0033': '3',
				'U+0043': '3',
				'U+0034': '4',
				'U+0044': '4',
				'U+0035': '5',
				'U+0045': '5',
				'U+0036': '6',
				'U+0046': '6',
				'U+0037': '7',
				'U+0047': '7',
				'U+0038': '8',
				'U+0048': '8',
				'U+0039': '9',
				'U+0049': '9',
				'U+00BE': '.',
				'U+004E': '.',
			};

			var number = key[event.key] || keyCodes[event.keyCode] || keyIdentifier[event.keyIdentifier] || null;
			callback(number);
		}
	};
	module.exports = service;
})();
