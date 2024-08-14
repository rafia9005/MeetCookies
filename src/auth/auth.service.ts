import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AuthEntity,
  RegisterResponse,
  UserResponse,
} from './entity/auth.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly Db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async login(username: string, password: string): Promise<AuthEntity> {
    const user = await this.Db.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.generateToken(user);
    return { token };
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    const existingUsername = await this.Db.user.findUnique({
      where: { username },
    });
    const existingEmail = await this.Db.user.findUnique({
      where: { email },
    });
    if (existingUsername && existingEmail) {
      throw new ConflictException('Email or Username already in use');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.Db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    //await this.databaseService.verifyToken.create({
    //  data: {
    //    token: verifyToken,
    //    usersId: newUser.id,
    //  },
    //});

    //await this.emailService.sendVerificationEmail(newUser.email, verifyToken);

    const userResponse: UserResponse = this.createUserResponse(newUser);
    const accessToken = this.generateToken(newUser);

    return {
      status: true,
      //message: `Registration successful. Please check your email to verify your account ${newUser.email}`,
      message: 'Registration successful',
      token: accessToken,
      data: userResponse,
    };
  }

  private createUserResponse(user: any): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private generateToken(user: any): string {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
