"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/* eslint-disable @typescript-eslint/no-inferrable-types */
class User {
    constructor() {
        this.id = 0;
        this.name = '';
        this.age = 18;
    }
}
tslib_1.__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsPositive(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber({
        maxDecimalPlaces: 1
    }),
    class_validator_1.Min(18),
    class_validator_1.Max(120),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "age", void 0);
exports.User = User;
//# sourceMappingURL=user.js.map