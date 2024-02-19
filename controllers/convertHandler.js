const { calcMultiply, calcDivide } = require('../utils/calc');

function ConvertHandler() {
	this.getNum = function (input) {
		const str = input.toLowerCase();
		const isInvalid =
			str.match(/\d+(\.\d*)?\/\d+(\.\d*)?\/\d+(\.\d*)?/) || str.includes('//');

		/// error handling
		if (isInvalid) return 'invalid number';

		let result = '';

		// get numbers
		for (let char of str) {
			if (isNaN(+char) && char !== '.' && char !== '/') break;

			result += char;
		}

		// assign default
		if (result === '') return 1;

		// handle fraction
		if (result.includes('/')) {
			const nums = result.split('/');

			return calcDivide(nums[0], nums[1]);
		}

		return isNaN(+result) ? 'invalid number' : +result;
	};

	this.getUnit = function (input) {
		const units = new Map([
			['km', 'km'],
			['mi', 'mi'],
			['l', 'L'],
			['gal', 'gal'],
			['kg', 'kg'],
			['lbs', 'lbs'],
		]);
		const result = input.match(/[^\d]+$/)?.[0].toLowerCase();

		// error handling
		if (!units.has(result)) return 'invalid unit';

		return units.get(result);
	};

	this.getReturnUnit = function (initUnit) {
		const units = new Map([
			['km', 'mi'],
			['mi', 'km'],
			['l', 'gal'],
			['gal', 'L'],
			['kg', 'lbs'],
			['lbs', 'kg'],
		]);

		return units.get(initUnit.toLowerCase());
	};

	this.spellOutUnit = function (unit) {
		const units = new Map([
			['km', 'kilometers'],
			['mi', 'miles'],
			['l', 'liters'],
			['gal', 'gallons'],
			['kg', 'kilograms'],
			['lbs', 'pounds'],
		]);

		return units.get(unit.toLowerCase());
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;

		switch (initUnit.toLowerCase()) {
			case 'km':
				return calcDivide(initNum, miToKm);
			case 'mi':
				return calcMultiply(initNum, miToKm);
			case 'l':
				return calcDivide(initNum, galToL);
			case 'gal':
				return calcMultiply(initNum, galToL);
			case 'kg':
				return calcDivide(initNum, lbsToKg);
			case 'lbs':
				return calcMultiply(initNum, lbsToKg);
			default:
				return 'invalid number';
		}
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		const initUnitString = this.spellOutUnit(initUnit);
		const returnUnitString = this.spellOutUnit(returnUnit);

		return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
	};
}

module.exports = ConvertHandler;
