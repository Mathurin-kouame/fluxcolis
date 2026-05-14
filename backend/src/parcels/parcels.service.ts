import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATION DE COLIS
  async create(userId: string, createParcelDto: CreateParcelDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('utilisateur non trouveé !');
    }

    const trackingNumber = this.generateTrackingNumber();

    return this.prisma.parcel.create({
      data: {
        trackingNumber,
        description: createParcelDto.description,
        weight: createParcelDto.weight,

        senderName: createParcelDto.senderName,
        recipientName: createParcelDto.recipientName,
        recipientPhone: createParcelDto.recipientPhone,
        destination: createParcelDto.destination,

        userId,
      },
    });
  }
  private generateTrackingNumber() {
    const random = Math.floor(100000 + Math.random() * 900000);

    return `FLX-${Date.now()}-${random}`;
  }

  async findAll(userId: string, role: string) {
    if (role === 'ADMIN') {
      return this.prisma.parcel.findMany({
        orderBy: {
          createdAt: 'desc',
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }
    return this.prisma.parcel.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
