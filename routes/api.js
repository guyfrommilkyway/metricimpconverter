'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
	let convertHandler = new ConvertHandler();

	app.get('/api/convert', (req, res) => {
		// const result = convertHandler();
		const { input } = req?.query;

		console.log(input.match(/\d+(\.\d+)?\/\d+(\.\d+)?|\d+(\.\d+)?/g));

		const initNum = 12;
		const initUnit = 'kg';
		const returnNum = 12;
		const returnUnit = 'lbs';

		res.status(200).json({
			initNum,
			initUnit,
			returnNum,
			returnUnit,
			string: `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`,
		});
	});
};
