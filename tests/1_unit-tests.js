const chai = require('chai');
let assert = chai.assert;

const { calcDivide, calcMultiply } = require('../utils/calc');
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
			assert.equal(
				convertHandler.getNum('12.1/40.50kg'),
				calcDivide(12.1, 40.5)
			);
			assert.equal(
				convertHandler.getNum('50.50/100.50lbs'),
				calcDivide(50.5, 100.5)
			);
			assert.equal(convertHandler.getNum('4.4/8.1gal'), calcDivide(4.4, 8.1));
			assert.equal(convertHandler.getNum('1.12/4.40L'), calcDivide(1.12, 4.4));
			assert.equal(convertHandler.getNum('4.5/5.78km'), calcDivide(4.5, 5.78));
			assert.equal(convertHandler.getNum('1.8/7.1mi'), calcDivide(1.8, 7.1));
		});
	});

	suite('Reading unit input', function () {
		test('Should correctly read each valid input unit', function () {
			assert.equal(convertHandler.getUnit('12kg'), 'kg');
			assert.equal(convertHandler.getUnit('77lbs'), 'lbs');
			assert.equal(convertHandler.getUnit('50/100L'), 'L');
			assert.equal(convertHandler.getUnit('10.50/50.75gal'), 'gal');
			assert.equal(convertHandler.getUnit('40.23km'), 'km');
			assert.equal(convertHandler.getUnit('1.5mi'), 'mi');
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

	suite('Converting input', function () {
		test('Should correctly convert gal to L', function () {
			assert.equal(
				convertHandler.convert(50, 'gal'),
				calcMultiply(50, 3.78541)
			);
		});
		test('Should correctly convert L to gal', function () {
			assert.equal(convertHandler.convert(50, 'L'), calcDivide(50, 3.78541));
		});
		test('Should correctly convert mi to km', function () {
			assert.equal(convertHandler.convert(50, 'mi'), calcMultiply(50, 1.60934));
		});
		test('Should correctly convert km to mi', function () {
			assert.equal(convertHandler.convert(50, 'km'), calcDivide(50, 1.60934));
		});
		test('Should correctly convert lbs to kg', function () {
			assert.equal(
				convertHandler.convert(50, 'lbs'),
				calcMultiply(50, 0.453592)
			);
		});
		test('Should correctly convert kg to lbs', function () {
			assert.equal(convertHandler.convert(50, 'kg'), calcDivide(50, 0.453592));
		});
	});
});
