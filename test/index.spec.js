"use strict";
var app_1 = require('../src/app');
var chai_1 = require('chai');
var chai = require('chai');
var chaiSpies = require('chai-spies');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiSpies);
chai.use(chaiAsPromised);
describe('App', function () {
    var appObject;
    var arr = {
        maleList: [{
                "name": "Garfield",
                "type": "Cat",
                "userGender": "Male",
                "userName": "Max"
            }],
        femaleList: [{
                "name": "Garfield",
                "type": "Cat",
                "userGender": "Female",
                "userName": "Jennifer"
            }]
    };
    before(function () {
        appObject = new app_1.App('http://agl-developer-test.azurewebsites.net/people.json');
    });
    describe('render', function () {
        it('should render a list of items from an array.', function () {
            var result = appObject.render(arr);
            chai_1.expect((result.match(/<div class="card">/g) || []).length).be.equal(2);
            chai_1.expect((result.match(/<div class="header male">/g) || []).length).be.equal(1);
            chai_1.expect((result.match(/<div class="header female">/g) || []).length).be.equal(1);
        });
        it('should return no data found if data is undefined or data is empty', function () {
            var result = appObject.render();
            chai_1.expect((result.match(/<div class="nodata">/g) || []).length).be.equal(1);
        });
    });
    describe('createCats', function () {
        it('should create a template for cats ', function () {
            var result = appObject.createCats(arr.maleList, 'male');
            chai_1.expect((result.match(/<div class="card">/g) || []).length).be.equal(1);
            chai_1.expect((result.match(/<div class="header male">/g) || []).length).be.equal(1);
        });
        it('should return empty string if array is undefined', function () {
            var result = appObject.createCats('', 'male');
            chai_1.expect(result.length).be.equal(0);
        });
        it('should return empty string if type is undefined or empty', function () {
            var result = appObject.createCats(arr[0], '');
            chai_1.expect(result.length).be.equal(0);
        });
    });
    describe('createTemplate', function () {
        it('should create a template for a pet ', function () {
            var result = appObject.createTemplate(arr.maleList[0]);
            chai_1.expect((result.match(/<div class="card">/g) || []).length).be.equal(1);
        });
        it('should return empty string if parameter is not an object ', function () {
            var result = appObject.createTemplate();
            chai_1.expect(result.length).be.equal(0);
        });
    });
    describe('parseData', function () {
        it('should parse the data to array of pets', function () {
            var data = require('../config/data.json');
            var result = appObject.parseData(data);
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(10);
            chai_1.expect(result[0]).be.a('object');
            chai_1.expect(result[0]).have.property('name');
            chai_1.expect(result[0].name).be.equal('Garfield');
            chai_1.expect(result[0]).have.property('type');
            chai_1.expect(result[0].type).be.equal('Cat');
            chai_1.expect(result[0]).have.property('userName');
            chai_1.expect(result[0].userName).be.equal('Bob');
            chai_1.expect(result[0]).have.property('userGender');
            chai_1.expect(result[0].userGender).be.equal('Male');
        });
        it('should return empty array if data is undefined or not an array', function () {
            var result = appObject.parseData();
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(0);
        });
    });
    describe('fetchCats', function () {
        it('should return array of cats with male owners and female owners', function () {
            var data = require('../config/data.json');
            var result = appObject.fetchCats(data);
            chai_1.expect(result).be.a('object');
            chai_1.expect(result).have.property('maleList');
            chai_1.expect(result.maleList).be.a('array');
            chai_1.expect(result.maleList).be.length(4);
            chai_1.expect(result.maleList[0]).be.a('object');
            chai_1.expect(result.maleList[0]).have.property('name');
            chai_1.expect(result.maleList[0].name).be.equal('Garfield');
            chai_1.expect(result.maleList[0]).have.property('type');
            chai_1.expect(result.maleList[0].type).be.equal('Cat');
            chai_1.expect(result.maleList[0]).have.property('userName');
            chai_1.expect(result.maleList[0].userName).be.equal('Bob');
            chai_1.expect(result.maleList[0]).have.property('userGender');
            chai_1.expect(result.maleList[0].userGender).be.equal('Male');
            chai_1.expect(result).have.property('femaleList');
            chai_1.expect(result.femaleList).be.a('array');
            chai_1.expect(result.femaleList).be.length(3);
            chai_1.expect(result.femaleList[0]).be.a('object');
            chai_1.expect(result.femaleList[0]).have.property('name');
            chai_1.expect(result.femaleList[0].name).be.equal('Garfield');
            chai_1.expect(result.femaleList[0]).have.property('type');
            chai_1.expect(result.femaleList[0].type).be.equal('Cat');
            chai_1.expect(result.femaleList[0]).have.property('userName');
            chai_1.expect(result.femaleList[0].userName).be.equal('Jennifer');
            chai_1.expect(result.femaleList[0]).have.property('userGender');
            chai_1.expect(result.femaleList[0].userGender).be.equal('Female');
        });
        it('should return empty array if data is undefined or not an array', function () {
            var result = appObject.fetchCats();
            chai_1.expect(result).be.a('object');
        });
    });
    describe('filterCats', function () {
        it('should filter cats based on name and owner respectively', function () {
            var result = appObject.filterCats(arr.maleList);
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(1);
            chai_1.expect(result[0]).be.a('object');
            chai_1.expect(result[0]).have.property('name');
            chai_1.expect(result[0].name).be.equal('Garfield');
            chai_1.expect(result[0]).have.property('type');
            chai_1.expect(result[0].type).be.equal('Cat');
            chai_1.expect(result[0]).have.property('userGender');
            chai_1.expect(result[0].userGender).be.equal('Male');
            chai_1.expect(result[0]).have.property('userName');
            chai_1.expect(result[0].userName).be.equal('Max');
        });
        it('should return empty array if data is undefined or empty', function () {
            var data = require('../config/data.json');
            var result = appObject.filterCats();
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(0);
        });
    });
    describe('sortCats', function () {
        it('should sort cats based on name and owner respectively', function () {
            var result = appObject.sortCats(arr.maleList);
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(1);
            chai_1.expect(result[0]).be.a('object');
            chai_1.expect(result[0]).have.property('name');
            chai_1.expect(result[0].name).be.equal('Garfield');
            chai_1.expect(result[0]).have.property('type');
            chai_1.expect(result[0].type).be.equal('Cat');
            chai_1.expect(result[0]).have.property('userGender');
            chai_1.expect(result[0].userGender).be.equal('Male');
            chai_1.expect(result[0]).have.property('userName');
            chai_1.expect(result[0].userName).be.equal('Max');
        });
        it('should return empty array if data undefined or empty', function () {
            var result = appObject.sortCats();
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(0);
        });
    });
    describe('sortObject', function () {
        it('should sort objects based on key and type(asc/desc)', function () {
            var result = [
                {
                    "name": "z"
                }, {
                    "name": "a"
                }
            ].sort(appObject.sortObject('name', 'asc'));
            chai_1.expect(result).be.a('array');
            chai_1.expect(result).be.length(2);
            chai_1.expect(result[0]).be.a('object');
            chai_1.expect(result[0]).have.property('name');
            chai_1.expect(result[0].name).be.equal('a');
            chai_1.expect(result[1]).be.a('object');
            chai_1.expect(result[1]).have.property('name');
            chai_1.expect(result[1].name).be.equal('z');
        });
        it('should return same array if property or order is undefined', function () {
            var data = [
                {
                    "name": "z"
                }, {
                    "name": "a"
                }
            ];
            var result = data.sort(appObject.sortObject());
            chai_1.expect(result).be.equal(data);
        });
    });
    describe('startUp', function () {
        it('should get the dom element as string', function (done) {
            function startUp() {
                return {
                    then: function () { }
                };
            }
            var spy = chai.spy(startUp);
            spy();
            chai_1.expect(spy).to.have.been.called();
            done();
        });
    });
    describe('getData', function () {
        it('should call the api url and get results', function (done) {
            function getData(url) {
                return {
                    then: function () { }
                };
            }
            var spy = chai.spy(getData);
            spy();
            chai_1.expect(spy).to.have.been.called();
            done();
        });
    });
    describe('getPeople', function () {
        it('should call the people api url and get results', function (done) {
            function getPeople() {
                return {
                    then: function () { }
                };
            }
            var spy = chai.spy(getPeople);
            spy();
            chai_1.expect(spy).to.have.been.called();
            done();
        });
    });
});
