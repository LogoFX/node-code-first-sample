"use strict";
// import { Type } from 'class-transformer';
// import {
//   IsOptional,
//   IsString,
//   MaxLength,
//   IsNumber,
//   IsPositive,
//   ValidateNested,
// } from 'class-validator';
// import {
//   Body,
//   Get,
//   JsonController,
//   Param,
//   Post,
//   Put,
//   QueryParams,
// } from 'routing-controllers';
// import { OpenAPI } from 'routing-controllers-openapi';
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
// class Child {
//   @IsString()
//   name: string
// }
// class CreateUserBody {
//   @IsString()
//   name: string
//   @IsOptional()
//   @MaxLength(20, { each: true })
//   hobbies: string[]
//   @ValidateNested()
//   child: Child
//   @ValidateNested({ each: true })
//   @Type(() => Child)
//   children: Child[]
// }
// class PaginationQuery {
//   @IsNumber()
//   @IsPositive()
//   public limit: number
//   @IsNumber()
//   @IsOptional()
//   public offset?: number
// }
// @OpenAPI({
//   security: [{ basicAuth: [] }],
// })
// @JsonController('/users')
// export class UsersController {
//   @Get('/')
//   @OpenAPI({ summary: 'Return a list of users' })
//   // eslint-disable-next-line no-unused-vars
//   getAll(@QueryParams() query: PaginationQuery) {
//     return [
//       { id: 1, name: 'First user!', hobbies: [] },
//       { id: 2, name: 'Second user!', hobbies: ['fishing', 'cycling'] },
//     ];
//   }
//   @Get('/:id')
//   @OpenAPI({ summary: 'Return a single user' })
//   getOne(@Param('id') id: number) {
//     return { name: 'User #' + id };
//   }
//   @Post('/')
//   @OpenAPI({ summary: 'Create a new user' })
//   createUser(@Body({ validate: true }) body: CreateUserBody) {
//     return { ...body, id: 3 };
//   }
//   @Put('/')
//   // eslint-disable-next-line no-unused-vars
//   createManyUsers(@Body({ type: CreateUserBody }) body: CreateUserBody[]) {
//     return {};
//   }
// }
const user_1 = require("../model/user");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const routing_controllers_1 = require("routing-controllers");
const data_service_1 = require("../model/data.service");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
let UserController = UserController_1 = class UserController {
    // eslint-disable-next-line no-unused-vars
    constructor(dataService) {
        this.dataService = dataService;
    }
    get() {
        const users = this.dataService.getUsers();
        return users;
    }
    getOne(id) {
        return this.dataService.getUsers().find(user => id == user.id);
    }
    post(user) {
        return Object.assign({}, user);
    }
    // eslint-disable-next-line no-unused-vars
    put(user) {
        return 'Updating a user...';
    }
    // eslint-disable-next-line no-unused-vars
    delete(id) {
        return 'Removing user...';
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/'),
    routing_controllers_openapi_1.OpenAPI({ summary: 'Return a list of users' }),
    routing_controllers_openapi_1.ResponseSchema(user_1.User, {
        contentType: 'application/json',
        description: 'A list of user objects',
        isArray: true,
        statusCode: '200'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], UserController.prototype, "get", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({ summary: 'Return a single user' }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", user_1.User)
], UserController.prototype, "getOne", null);
tslib_1.__decorate([
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post('/'),
    routing_controllers_openapi_1.OpenAPI({ summary: 'Create a new user' }),
    routing_controllers_openapi_1.ResponseSchema(user_1.User),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_1.User]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "put", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
UserController = UserController_1 = tslib_1.__decorate([
    routing_controllers_1.JsonController('/users'),
    aurelia_dependency_injection_1.autoinject,
    aurelia_dependency_injection_1.transient(UserController_1),
    routing_controllers_openapi_1.OpenAPI({
        security: [{ basicAuth: [] }],
    }),
    tslib_1.__metadata("design:paramtypes", [data_service_1.DataService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map