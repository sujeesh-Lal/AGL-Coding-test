

interface Pets {
    userName?: string;
    userGender?: string;
    name?: String;
    type?: string;
}

export class App {

    constructor(private apiUrl: string) { }

    public fetchPeople = (url: string): any => {
        return new Promise((resolve, reject) => {
            const lib = url.indexOf('https') >= 0 ? require('https') : require('http');
            const request = lib.get(url, (response) => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                response.on('end', () => resolve(JSON.parse(body.join(''))));
            });
            request.on('error', (err) => reject(err));
        });
    };

    public render(data): string {
        if (data === undefined) {
            return '<div class="nodata">no data found</div>';
        }
        let catsDom = this.createCats(data.maleList, 'male') + this.createCats(data.femaleList, 'female');
        return catsDom !== '' ? catsDom : '<div class="nodata">no data found</div>';
    }

    public createCats(list, type) {
        if (list === undefined || !Array.isArray(list) || type === undefined || type === '') {
            return '';
        }
        const template = list.map(item => this.createTemplate(item)).join('');
        return '<div class="header ' + type + '">' + type + '</div>' + template;
    }

    public createTemplate(obj) {
        let def = '';
        if (obj && obj.name && obj.userName) {
            def = `<div class="card"><div class="container"><h4>Pet Name : ${obj.name}</h4><p> Owner : ${obj.userName}</p></div></div>`;
        }
        return def;
    }

    public parseData(data) {
        if (data === undefined || !Array.isArray(data) || data.length === 0) {
            return [];
        }
        let cats = data.reduce((collection, owner) => {
            if (owner.pets) {
                let pets = owner.pets.map((pet) => {
                    let userMergedPet: Pets = {};
                    (<any>Object).assign(userMergedPet, pet);
                    userMergedPet.userName = owner.name;
                    userMergedPet.userGender = owner.gender;
                    return userMergedPet;
                });
                return collection.concat(pets);
            } else {
                return collection;
            }
        }, []);
        return cats;
    }

    public sortObject(property, order) {
        if (property === undefined || order === undefined || property.length === 0 || order.length === 0) {
            return;
        }
        let sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            let result;
            if (order.toLowerCase() === 'asc') {
                result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            } else {
                result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            }
            return result * sortOrder;
        };
    }

    public fetchCats(data): { maleList?: any[], femaleList?: any[] } {
        if (data === undefined) {
            return {};
        }
        let catArray = this.parseData(data);
        if (catArray.length === 0) {
            return {};
        }
        return {
            maleList: this.sortCats(this.filterCats(catArray.filter(item => item.userGender === 'Male'))),
            femaleList: this.sortCats(this.filterCats(catArray.filter(item => item.userGender === 'Female')))
        };
    }

    public sortCats(list) {
        if (list === undefined || !Array.isArray(list) || list.length === 0) return [];
        return list.sort(this.sortObject('name', 'asc'));
    }

    public filterCats(cats) {
        if (cats === undefined || !Array.isArray(cats) || cats.length === 0) return [];
        return cats.filter((item) => item.type.toLowerCase() === 'cat');
    }

    public startUp() {
        return new Promise((resolve, reject) => {
            this.fetchPeople(this.apiUrl).then(
                data => resolve(this.render(this.fetchCats(data))),
                error => resolve('<div class="error"> Error : ' + error + '</div>')
            );
        });
    }
}