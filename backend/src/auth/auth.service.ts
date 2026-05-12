import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //Inscription
  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    // Vérifie si l'utilisateur existe déjà
    if (existingUser) {
      throw new UnauthorizedException('Utilisateur existe déjà');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return { message: 'compte crée avec succès !', newUser };
  }

  //Connexion

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser)
      throw new UnauthorizedException({
        error: 'mot de password ou adresse incorrect',
      });

    const isPassWordValid = await this.isPassWordValid(
      password,
      existingUser.password,
    );

    if (!isPassWordValid)
      throw new UnauthorizedException({
        error: 'mot de password ou adresse incorrect',
      });
    return this.authentificateUser(existingUser);
  }

  private async isPassWordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async authentificateUser(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    //'singAsync' pour génerer le token
    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'connexion reussite !',
      access_token: token,
      type: 'Bearer',
      user: { id: user.id, name: user.name },
    };
  }
}
