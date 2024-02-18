const chai = require('chai');
let assert = chai.assert;

const calc = require('../utils/calc');
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Reading number input', function () {
		test('Should correctly read a whole number input', function () {
			assert.equal(convertHandler.getNum('12kg'), 12);
			assert.equal(convertHandler.getNum('100lbs'), 100);
			assert.equal(convertHandler.getNum('4gal'), 4);
			assert.equal(convertHandler.getNum('1L'), 1);
			assert.equal(convertHandler.getNum('40km'), 40);
			assert.equal(convertHandler.getNum('1mi'), 1);
		});

		test('Should correctly read a decimal number input', function () {
			assert.equal(convertHandler.getNum('12.1kg'), 12.1);
			assert.equal(convertHandler.getNum('100.50lbs'), 100.5);
			assert.equal(convertHandler.getNum('4.4gal'), 4.4);
			assert.equal(convertHandler.getNum('1.12L'), 1.12);
			assert.equal(convertHandler.getNum('40.5km'), 40.5);
			assert.equal(convertHandler.getNum('1.8mi'), 1.8);
		});

		test('Should correctly read a fractional input', function () {
			assert.equal(convertHandler.getNum('12/40kg'), 0.3);
			assert.equal(convertHandler.getNum('100/200lbs'), 0.5);
			assert.equal(convertHandler.getNum('4/8gal'), 0.5);
			assert.equal(convertHandler.getNum('1/2L'), 0.5);
			assert.equal(convertHandler.getNum('40/100km'), 0.4);
			assert.equal(convertHandler.getNum('1/4mi'), 0.25);
		});

		test('Should correctly read a fractional input with a decimal', function () {
			assert.equal(convertHandler.getNum('12.1/40.50kg'), calc(12.1, 40.5));
			assert.equal(convertHandler.getNum('50.50/100.50lbs'), calc(50.5, 100.5));
			assert.equal(convertHandler.getNum('4.4/8.1gal'), calc(4.4, 8.1));
			assert.equal(convertHandler.getNum('1.12/4.40L'), calc(1.12, 4.4));
			assert.equal(convertHandler.getNum('4.5/5.78km'), calc(4.5, 5.78));
			assert.equal(convertHandler.getNum('1.8/7.1mi'), calc(1.8, 7.1));
		});
	});

	suite('Handling default value and errors', function () {
		test('Should correctly return an error on a double-fraction', function () {
			assert.equal(convertHandler.getNum('12/40/50km'), 'double-fraction');
			assert.equal(convertHandler.getNum('12/40/50mi'), 'double-fraction');
			assert.equal(convertHandler.getNum('12/40/50L'), 'double-fraction');
			assert.equal(convertHandler.getNum('12/40/50gal'), 'double-fraction');
			assert.equal(convertHandler.getNum('12/40/50kg'), 'double-fraction');
			assert.equal(convertHandler.getNum('12/40/50lbs'), 'double-fraction');
		});

		test('Should correctly default to a numerical input of 1 when no numerical input is provided', function () {
			assert.equal(convertHandler.getNum('km'), 1);
			assert.equal(convertHandler.getNum('mi'), 1);
			assert.equal(convertHandler.getNum('L'), 1);
			assert.equal(convertHandler.getNum('gal'), 1);
			assert.equal(convertHandler.getNum('kg'), 1);
			assert.equal(convertHandler.getNum('lbs'), 1);
		});
	});
});
