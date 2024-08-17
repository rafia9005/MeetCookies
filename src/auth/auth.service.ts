import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity, RegisterResponse } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserResponse } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<AuthEntity> {
    if (!username) {
      throw new NotFoundException('Email must be provided');
    }

    const user = await this.databaseService.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    };
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    if (!email) {
      throw new ConflictException('Email must be provided');
    }

    const existingUser = await this.databaseService.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.databaseService.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const userResponse: UserResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    return {
      status: true,
      message: `Registration successful. Please check your email to verify your account. ${newUser.email}`,
      data: userResponse,
    };
  }
}
