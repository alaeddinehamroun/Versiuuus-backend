import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDTO } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async login(user: LoginDTO) {
    const email = user.email;
    const payload = { email: email };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(registerDTO: RegisterDTO) {
    const { email, password } = registerDTO;
    //validateRegistration
    const user = await this.UserModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(password);
    const createdUser = new this.UserModel({
      email: email,
      hashedPassword: hashedPassword,
    });
    await createdUser.save();
    return createdUser;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: LoginDTO = await this.UserModel.findOne({ email: email });
    const isValidPassword = await this.comparePasswords(
      password,
      user.hashedPassword,
    );

    if (user && isValidPassword) {
      return {
        _id: user._id,
        email: user.email,
      };
    }
    return null;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
