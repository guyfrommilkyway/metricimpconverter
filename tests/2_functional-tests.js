const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
	test('Convert a valid input such as 32kg', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=32kg')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(
					res.text,
					'{"initNum":32,"initUnit":"kg","returnNum":70.54798,"returnUnit":"lbs","string":"32 kilograms converts to 70.54798 pounds"}'
				);
				done();
			});
	});
	test('Convert a valid input such as 10L', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=10L')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(
					res.text,
					'{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}'
				);
				done();
			});
	});
	test('Convert an invalid number such as 3/7.2/4kg', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kg')
			.end(function (err, res) {
				assert.equal(res.text, 'invalid number');
				done();
			});
	});
	test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kilomegagram')
			.end(function (err, res) {
				assert.equal(res.text, 'invalid number and unit');
				done();
			});
	});
	test('Convert with no number such as lbs', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=lbs')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(
					res.text,
					'{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}'
				);
				done();
			});
	});
});
