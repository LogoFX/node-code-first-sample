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





import { User } from '../model/user';
import { autoinject, transient } from 'aurelia-dependency-injection';
import { Param, Get, Post, Delete, Put, Body, JsonController, HttpCode } from 'routing-controllers';
import { DataService } from '../model/data.service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
@autoinject
@transient(UserController)
@OpenAPI({
  security: [{ basicAuth: [] }],
})
export class UserController {

  // eslint-disable-next-line no-unused-vars
  constructor(private dataService: DataService) {
  }

  @Get('/')
  @OpenAPI({ summary: 'Return a list of users' })
  @ResponseSchema(User, {
    contentType: 'application/json',
    description: 'A list of user objects',
    isArray: true,
    statusCode: '200'})
    public get(): User[] {
    const users = this.dataService.getUsers();
    return users;
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return a single user' })
  public getOne(@Param('id') id: number): User {
    return this.dataService.getUsers().find(user => id == user.id);
  }

  @HttpCode(201)
  @Post('/')
  @OpenAPI({ summary: 'Create a new user' })
  @ResponseSchema(User)
  public post(@Body({validate: true}) user: User) {
    return { ...user };
  }

  @Put('/')
  // eslint-disable-next-line no-unused-vars
  put(@Body({validate: true}) user: User) {
    return 'Updating a user...';
  }

  @Delete('/:id')
  // eslint-disable-next-line no-unused-vars
  delete(@Param('id') id: number) {
    return 'Removing user...';
  }
}