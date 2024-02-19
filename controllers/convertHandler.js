const { calcMultiply, calcDivide } = require('../utils/calc');

// constants
const INVALID_FRACTION = /\d+(\.\d*)?\/\d+(\.\d*)?\/\d+(\.\d*)?/;
const VALID_UNIT = /(km|mi|l|gal|kg|lbs)$/;

function ConvertHandler() {
	this.getNum = function (input) {
		const str = input.toLowerCase();
		const isInvalid = !!str.match(INVALID_FRACTION) || str.includes('//');

		// detect double-fraction
		if (isInvalid) return 'invalid number';

		const unit = str.match(VALID_UNIT)?.[0];

		// detect invalid unit
		if (!unit) return 'invalid unit';

		const nums = str.split(unit)[0].split('/');
		const num = nums[0] === '' ? 1 : +nums[0];

		if (nums.length === 1 && !isNaN(num)) return num;
		if (nums.length === 1 && isNaN(num)) return 'invalid number';
		if (nums.length > 1) return calcDivide(nums[0], nums[1]);
	};

	this.getUnit = function (input) {
		const str = input.toLowerCase();
		let result = str.match(VALID_UNIT)?.[0];

		if (!result) return 'invalid unit';

		return result === 'l' ? 'L' : result;
	};

	this.getReturnUnit = function (initUnit) {
		let result;

		switch (initUnit.toLowerCase()) {
			case 'km':
				result = 'mi';
				break;
			case 'mi':
				result = 'km';
				break;
			case 'l':
				result = 'gal';
				break;
			case 'gal':
				result = 'L';
				break;
			case 'kg':
				result = 'lbs';
				break;
			case 'lbs':
				result = 'kg';
				break;
			default:
				result = 'invalid unit';
		}

		return result;
	};

	this.spellOutUnit = function (unit) {
		let result;

		switch (unit.toLowerCase()) {
			case 'km':
				result = 'kilometers';
				break;
			case 'mi':
				result = 'miles';
				break;
			case 'l':
				result = 'liters';
				break;
			case 'gal':
				result = 'gallons';
				break;
			case 'kg':
				result = 'kilograms';
				break;
			case 'lbs':
				result = 'pounds';
				break;
			default:
				result = 'invalid unit';
		}

		return result;
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;

		switch (initUnit.toLowerCase()) {
			case 'km':
				result = calcDivide(initNum, miToKm);
				break;
			case 'mi':
				result = calcMultiply(initNum, miToKm);
				break;
			case 'l':
				result = calcDivide(initNum, galToL);
				break;
			case 'gal':
				result = calcMultiply(initNum, galToL);
				break;
			case 'kg':
				result = calcDivide(initNum, lbsToKg);
				break;
			case 'lbs':
				result = calcMultiply(initNum, lbsToKg);
				break;
			default:
				result = 'invalid';
		}

		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		const initUnitString = this.spellOutUnit(initUnit);
		const returnUnitString = this.spellOutUnit(returnUnit);

		let result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;

		return result;
	};
}

module.exports = ConvertHandler;
