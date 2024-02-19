'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
	let convertHandler = new ConvertHandler();

	app.get('/api/convert', (req, res) => {
		const { input } = req?.query;

		const initNum = convertHandler.getNum(input);
		const initUnit = convertHandler.getUnit(input);

		if (initNum === 'invalid number' && initUnit === 'invalid unit')
			res.status(400).json({ message: 'invalid number and unit' });

		if (initNum === 'invalid number')
			res.status(400).json({ message: 'invalid number' });

		if (initUnit === 'invalid unit')
			res.status(400).json({ message: 'invalid unit' });

		const returnNum = convertHandler.convert(+initNum, initUnit);
		const returnUnit = convertHandler.getReturnUnit(initUnit);
		const string = convertHandler.getString(
			initNum,
			initUnit,
			returnNum,
			returnUnit
		);

		res.status(200).json({
			initNum,
			initUnit,
			returnNum,
			returnUnit,
			string,
		});
	});
};
