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
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<AuthEntity> {
    const user = await this.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

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
    await this.ensureUserDoesNotExist(username, email);

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.createUser(username, email, hashedPassword);

    // Uncomment and implement if needed
    // const verifyToken = this.generateVerificationToken();
    // await this.dbService.verifyToken.create({ data: { token: verifyToken, usersId: newUser.id } });
    // await this.emailService.sendVerificationEmail(newUser.email, verifyToken);

    const userResponse = this.createUserResponse(newUser);
    const accessToken = this.generateToken(newUser);

    return {
      status: true,
      message: 'Registration successful',
      token: accessToken,
      data: userResponse,
    };
  }

  private async findUserByUsername(username: string) {
    return this.dbService.user.findUnique({ where: { username } });
  }

  private async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async ensureUserDoesNotExist(
    username: string,
    email: string,
  ): Promise<void> {
    const [existingUsername, existingEmail] = await Promise.all([
      this.dbService.user.findUnique({ where: { username } }),
      this.dbService.user.findUnique({ where: { email } }),
    ]);

    if (existingUsername || existingEmail) {
      throw new ConflictException('Email or Username already in use');
    }
  }

  private async createUser(username: string, email: string, password: string) {
    return this.dbService.user.create({
      data: {
        username,
        email,
        password,
      },
    });
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
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Uncomment and implement if needed
  // private generateVerificationToken(): string {
  //   return this.jwtService.sign({ id: user.id }, { expiresIn: '1d' });
  // }

  private decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
