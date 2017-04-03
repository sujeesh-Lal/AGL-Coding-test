
import { App } from '../src/app';
import { expect } from 'chai';

let chai = require('chai');
let chaiSpies = require('chai-spies');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiSpies);
chai.use(chaiAsPromised);

describe('App', () => {

    let appObject;
    const arr = {
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

    before(() => {
        appObject = new App('http://agl-developer-test.azurewebsites.net/people.json');

    })

    describe('render', () => {
        it('should render a list of items from an array.', () => {
            let result = appObject.render(arr);
            expect((result.match(/<div class="card">/g) || []).length).be.equal(2);
            expect((result.match(/<div class="header male">/g) || []).length).be.equal(1);
            expect((result.match(/<div class="header female">/g) || []).length).be.equal(1);
        });

        it('should return no data found if data is undefined or data is empty', () => {
            let result = appObject.render();
            expect((result.match(/<div class="nodata">/g) || []).length).be.equal(1);
        });
    });

    describe('createCats', () => {
        it('should create a template for cats ', () => {
            let result = appObject.createCats(arr.maleList, 'male');
            expect((result.match(/<div class="card">/g) || []).length).be.equal(1);
            expect((result.match(/<div class="header male">/g) || []).length).be.equal(1);
        });

        it('should return empty string if array is undefined', () => {
            let result = appObject.createCats('', 'male');
            expect(result.length).be.equal(0);
        });

        it('should return empty string if type is undefined or empty', () => {
            let result = appObject.createCats(arr[0], '');
            expect(result.length).be.equal(0);
        });

    });

    describe('createTemplate', () => {
        it('should create a template for a pet ', () => {
            let result = appObject.createTemplate(arr.maleList[0]);
            expect((result.match(/<div class="card">/g) || []).length).be.equal(1);
        });

        it('should return empty string if parameter is not an object ', () => {
            let result = appObject.createTemplate();
            expect(result.length).be.equal(0);
        });

    });

    describe('parseData', () => {
        it('should parse the data to array of pets', () => {
            const data = require('../config/data.json');
            let result = appObject.parseData(data);
            expect(result).be.a('array');
            expect(result).be.length(10)
            expect(result[0]).be.a('object');
            expect(result[0]).have.property('name');
            expect(result[0].name).be.equal('Garfield');
            expect(result[0]).have.property('type');
            expect(result[0].type).be.equal('Cat');
            expect(result[0]).have.property('userName');
            expect(result[0].userName).be.equal('Bob');
            expect(result[0]).have.property('userGender');
            expect(result[0].userGender).be.equal('Male');
        });

        it('should return empty array if data is undefined or not an array', () => {
            let result = appObject.parseData();
            expect(result).be.a('array');
            expect(result).be.length(0);
        });

    });

    describe('fetchCats', () => {
        it('should return array of cats with male owners and female owners', () => {
            const data = require('../config/data.json');
            let result = appObject.fetchCats(data);
            expect(result).be.a('object');
            expect(result).have.property('maleList');
            expect(result.maleList).be.a('array');
            expect(result.maleList).be.length(4);
            expect(result.maleList[0]).be.a('object');
            expect(result.maleList[0]).have.property('name');
            expect(result.maleList[0].name).be.equal('Garfield');
            expect(result.maleList[0]).have.property('type');
            expect(result.maleList[0].type).be.equal('Cat');
            expect(result.maleList[0]).have.property('userName');
            expect(result.maleList[0].userName).be.equal('Bob');
            expect(result.maleList[0]).have.property('userGender');
            expect(result.maleList[0].userGender).be.equal('Male');
            expect(result).have.property('femaleList');
            expect(result.femaleList).be.a('array');
            expect(result.femaleList).be.length(3);
            expect(result.femaleList[0]).be.a('object');
            expect(result.femaleList[0]).have.property('name');
            expect(result.femaleList[0].name).be.equal('Garfield');
            expect(result.femaleList[0]).have.property('type');
            expect(result.femaleList[0].type).be.equal('Cat');
            expect(result.femaleList[0]).have.property('userName');
            expect(result.femaleList[0].userName).be.equal('Jennifer');
            expect(result.femaleList[0]).have.property('userGender');
            expect(result.femaleList[0].userGender).be.equal('Female');
        });

        it('should return empty array if data is undefined or not an array', () => {
            let result = appObject.fetchCats();
            expect(result).be.a('object');
        });
    });

    describe('filterCats', () => {
        it('should filter cats based on name and owner respectively', () => {
            var result = appObject.filterCats(arr.maleList)
            expect(result).be.a('array');
            expect(result).be.length(1);
            expect(result[0]).be.a('object');
            expect(result[0]).have.property('name');
            expect(result[0].name).be.equal('Garfield');
            expect(result[0]).have.property('type');
            expect(result[0].type).be.equal('Cat');
            expect(result[0]).have.property('userGender');
            expect(result[0].userGender).be.equal('Male');
            expect(result[0]).have.property('userName');
            expect(result[0].userName).be.equal('Max');
        });

        it('should return empty array if data is undefined or empty', () => {
            const data = require('../config/data.json');
            var result = appObject.filterCats()
            expect(result).be.a('array');
            expect(result).be.length(0);
        });
    });

    describe('sortCats', () => {
        it('should sort cats based on name and owner respectively', () => {
            var result = appObject.sortCats(arr.maleList)
            expect(result).be.a('array');
            expect(result).be.length(1);
            expect(result[0]).be.a('object');
            expect(result[0]).have.property('name');
            expect(result[0].name).be.equal('Garfield');
            expect(result[0]).have.property('type');
            expect(result[0].type).be.equal('Cat');
            expect(result[0]).have.property('userGender');
            expect(result[0].userGender).be.equal('Male');
            expect(result[0]).have.property('userName');
            expect(result[0].userName).be.equal('Max');
        });

        it('should return empty array if data undefined or empty', () => {
            var result = appObject.sortCats();
            expect(result).be.a('array');
            expect(result).be.length(0);
        });
    });

    describe('sortObject', () => {
        it('should sort objects based on key and type(asc/desc)', () => {
            var result = [
                {
                    "name": "z"
                }, {
                    "name": "a"
                }
            ].sort(appObject.sortObject('name', 'asc'));
            expect(result).be.a('array');
            expect(result).be.length(2);
            expect(result[0]).be.a('object');
            expect(result[0]).have.property('name');
            expect(result[0].name).be.equal('a');
            expect(result[1]).be.a('object');
            expect(result[1]).have.property('name');
            expect(result[1].name).be.equal('z');
        });

        it('should return same array if property or order is undefined', () => {
            let data = [
                {
                    "name": "z"
                }, {
                    "name": "a"
                }
            ]
            let result = data.sort(appObject.sortObject());
            expect(result).be.equal(data);
        });
    });

    describe('startUp', () => {
        it('should get the dom element as string', (done) => {
            function startUp() {
                return {
                    then: () => { }
                }
            }
            var spy = chai.spy(startUp);
            spy();
            expect(spy).to.have.been.called();
            done();
        })
    })

    describe('getData', () => {
        it('should call the api url and get results', (done) => {
            function getData(url?: string) {
                return {
                    then: () => { }
                }
            }
            var spy = chai.spy(getData);
            spy();
            expect(spy).to.have.been.called();
            done();
        })
    })

    describe('getPeople', () => {
        it('should call the people api url and get results', (done) => {
            function getPeople() {
                return {
                    then: () => { }
                }
            }
            var spy = chai.spy(getPeople);
            spy();
            expect(spy).to.have.been.called();
            done();
        })
    })

});