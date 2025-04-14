import { CurrentUser } from './decorator/current-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: Record<string, string | number>) {
  //   return this.userService.findOne(+session.userId);
  // }
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    // return this.userService.findOne(+session.userId);
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: Record<string, string | number>) {
    session.userId = 0;
  }

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, string | number>,
  ) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, string | number>,
  ) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/users')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    console.log(id, '--id');
    return this.userService.findOne(id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<CreateUserDto>) {
    return this.userService.update(+id, body);
  }
}
