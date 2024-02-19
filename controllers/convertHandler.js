const calc = require('../utils/calc');

// constants
const UNIT_REGEX = /(km|mi|l|gal|kg|lbs)$/;

function ConvertHandler() {
	this.getNum = function (input) {
		const str = input.toLowerCase();
		const slash = (str.match(/\//g) || []).length;

		// detect double-fraction
		if (slash > 1) return 'double-fraction';

		const unit = str.match(UNIT_REGEX)?.[0];

		// detect invalid unit
		if (!unit) return 'invalid unit';

		const nums = str.split(unit)[0].split('/');
		const num = nums[0] === '' ? 1 : +nums[0];

		if (nums.length === 1 && !isNaN(num)) return num;
		if (nums.length === 1 && isNaN(num)) return 'invalid number';
		if (nums.length > 1) return parseFloat((nums[0] / nums[1]).toFixed(5));
	};

	this.getUnit = function (input) {
		const str = input.toLowerCase();
		let result = str.match(UNIT_REGEX)?.[0];

		if (!result) return 'invalid unit';

		return result === 'l' ? 'L' : result;
	};

	this.getReturnUnit = function (initUnit) {
		let result;

		switch (initUnit.match(UNIT_REGEX)) {
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

		switch (unit.match(UNIT_REGEX)) {
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

		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		let result;

		return result;
	};
}

module.exports = ConvertHandler;
