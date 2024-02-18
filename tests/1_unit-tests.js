const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Reading input', function () {
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
	});
});
