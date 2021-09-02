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
  public async get(): Promise<User[]> {
    const users = await this.dataService.getUsers();
    return users;
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return a single user' })
  public async getOne(@Param('id') id: number): Promise<User> {
    return (await this.dataService.getUsers()).find(user => id == user.id);
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