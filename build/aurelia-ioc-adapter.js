"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AureliaIocAdapter = void 0;
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
class AureliaIocAdapter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-unused-vars
    get(someClass, action) {
        return aurelia_dependency_injection_1.Container.instance.get(someClass);
    }
}
exports.AureliaIocAdapter = AureliaIocAdapter;
//# sourceMappingURL=aurelia-ioc-adapter.js.map