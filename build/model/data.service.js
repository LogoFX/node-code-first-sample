"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const tslib_1 = require("tslib");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
let DataService = class DataService {
    constructor() {
        this.counter = 0;
    }
    getUsers() {
        return [
            {
                id: 1,
                name: 'Vasya',
                age: 25,
                counter: ++this.counter
            },
            {
                id: 2,
                name: 'Petya',
                age: 32,
                counter: this.counter
            }
        ];
    }
};
DataService = tslib_1.__decorate([
    aurelia_dependency_injection_1.singleton()
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map