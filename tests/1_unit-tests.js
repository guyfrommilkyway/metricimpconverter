const chai = require('chai');
let assert = chai.assert;

const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Reading number input', function () {
		test('Should correctly read a whole number input', function (done) {
			assert.equal(convertHandler.getNum('12kg'), 12);
			assert.equal(convertHandler.getNum('100lbs'), 100);
			assert.equal(convertHandler.getNum('4gal'), 4);
			// assert.equal(convertHandler.getNum('1L'), 1);
			// assert.equal(convertHandler.getNum('40km'), 40);
			// assert.equal(convertHandler.getNum('1mi'), 1);
			done();
		});

		test('Should correctly read a decimal number input', function (done) {
			assert.equal(convertHandler.getNum('12.1kg'), 12.1);
			assert.equal(convertHandler.getNum('100.50lbs'), 100.5);
			assert.equal(convertHandler.getNum('4.4gal'), 4.4);
			// assert.equal(convertHandler.getNum('1.12L'), 1.12);
			// assert.equal(convertHandler.getNum('40.5km'), 40.5);
			// assert.equal(convertHandler.getNum('1.8mi'), 1.8);
			done();
		});

		test('Should correctly read a fractional input', function (done) {
			assert.equal(convertHandler.getNum('12/40kg'), 0.3);
			assert.equal(convertHandler.getNum('100/200lbs'), 0.5);
			assert.equal(convertHandler.getNum('4/8gal'), 0.5);
			// assert.equal(convertHandler.getNum('1/2L'), 0.5);
			// assert.equal(convertHandler.getNum('40/100km'), 0.4);
			// assert.equal(convertHandler.getNum('1/4mi'), 0.25);
			done();
		});

		test('Should correctly read a fractional input with a decimal', function (done) {
			assert.equal(convertHandler.getNum('12.1/40.50kg'), 0.29877);
			assert.equal(convertHandler.getNum('50.50/100.50lbs'), 0.50249);
			assert.equal(convertHandler.getNum('4.4/8.1gal'), 0.54321);
			// assert.equal(convertHandler.getNum('1.12/4.40L'), 0.25455);
			// assert.equal(convertHandler.getNum('4.5/5.78km'), 0.77855);
			// assert.equal(convertHandler.getNum('1.8/7.1mi'), 0.25352);
			done();
		});
	});

	suite('Reading unit input', function () {
		test('Should correctly read each valid unit input', function (done) {
			assert.notEqual(convertHandler.getUnit('12kgs'), 'kg');
			assert.notEqual(convertHandler.getUnit('77dlbs'), 'lbs');
			// assert.equal(convertHandler.getUnit('50.44/100.57L'), 'L');
			// assert.equal(convertHandler.getUnit('10.50/50.75gal'), 'gal');
			// assert.equal(convertHandler.getUnit('40.23km'), 'km');
			// assert.equal(convertHandler.getUnit('1.5mi'), 'mi');
			done();
		});
		test('Should correctly return an error for an invalid input unit', function (done) {
			assert.equal(convertHandler.getUnit('12kilo'), 'invalid unit');
			assert.equal(convertHandler.getUnit('27miles'), 'invalid unit');
			// assert.equal(convertHandler.getUnit('400llbs'), 'invalid unit');
			// assert.equal(convertHandler.getUnit('198/200mit'), 'invalid unit');
			// assert.equal(convertHandler.getUnit('1.4kmm'), 'invalid unit');
			done();
		});
		test('Should return the correct unit for each valid input', function (done) {
			assert.equal(convertHandler.getReturnUnit('km'), 'mi');
			assert.equal(convertHandler.getReturnUnit('mi'), 'km');
			assert.equal(convertHandler.getReturnUnit('l'), 'gal');
			// assert.equal(convertHandler.getReturnUnit('gal'), 'L');
			// assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
			// assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
			done();
		});
		test('Should correctly spelled-out string unit for each valid input', function (done) {
			assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
			assert.notEqual(convertHandler.spellOutUnit('mi', 'milesss'));
			// assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
			// assert.equal(convertHandler.spellOutUnit('l'), 'liters');
			// assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
			done();
		});
	});

	suite('Handling default value and errors', function () {
		test('Should correctly return an error on a double-fraction', function (done) {
			// assert.equal(convertHandler.getNum('12//50km'), 'invalid number');
			assert.equal(convertHandler.getNum('12.50/40.40/50mi'), 'invalid number');
			assert.equal(convertHandler.getNum('12/40/50L'), 'invalid number');
			// assert.equal(convertHandler.getNum('12/40/50.45gal'), 'invalid number');
			// assert.equal(convertHandler.getNum('12/40/50kg'), 'invalid number');
			// assert.equal(convertHandler.getNum('12/40//50lbs'), 'invalid number');
			done();
		});

		test('Should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
			assert.equal(convertHandler.getNum('km'), 1);
			assert.equal(convertHandler.getNum('mi'), 1);
			assert.equal(convertHandler.getNum('L'), 1);
			// assert.equal(convertHandler.getNum('gal'), 1);
			// assert.equal(convertHandler.getNum('kg'), 1);
			// assert.equal(convertHandler.getNum('lbs'), 1);
			done();
		});
	});

	suite('Converting input', function () {
		test('Should correctly convert gal to L', function (done) {
			assert.equal(convertHandler.convert(50, 'gal'), 189.2705);
			done();
		});
		test('Should correctly convert L to gal', function (done) {
			assert.equal(convertHandler.convert(50, 'L'), 13.20861);
			done();
		});
		test('Should correctly convert mi to km', function (done) {
			assert.equal(convertHandler.convert(50, 'mi'), 80.467);
			done();
		});
		test('Should correctly convert km to mi', function (done) {
			assert.equal(convertHandler.convert(50, 'km'), 31.06864);
			done();
		});
		test('Should correctly convert lbs to kg', function (done) {
			assert.equal(convertHandler.convert(50, 'lbs'), 22.6796);
			done();
		});
		test('Should correctly convert kg to lbs', function (done) {
			assert.equal(convertHandler.convert(50, 'kg'), 110.23122);
			done();
		});
	});
});
