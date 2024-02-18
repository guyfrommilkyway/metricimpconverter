const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Read input', function () {
		test('Should correctly read a whole number input', function () {
			assert.equal(convertHandler.getNum('12kg'), 12);
			assert.equal(convertHandler.getNum('100lbs'), 100);
			assert.equal(convertHandler.getNum('4gal'), 4);
			assert.equal(convertHandler.getNum('1L'), 1);
			assert.equal(convertHandler.getNum('40km'), 40);
			assert.equal(convertHandler.getNum('1mi'), 1);
		});
	});
});
