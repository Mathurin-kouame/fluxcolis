import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    //private readonly jwtService: JwtService,
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
}
