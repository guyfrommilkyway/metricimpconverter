function ConvertHandler() {
	this.getNum = function (input) {
		const slashCount = (input.match(/\//g) || []).length;

		if (slashCount > 1) return 'double-fraction';

		const nums = input.match(/\d+(\.\d+)?\/\d+(\.\d+)?|\d+(\.\d+)?/g);

		let result = nums ? nums.join('.') : 1;

		return result;
	};

	this.getUnit = function (input) {
		let result;

		return result;
	};

	this.getReturnUnit = function (initUnit) {
		let result;

		return result;
	};

	this.spellOutUnit = function (unit) {
		let result;

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
