import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { ParcelStatus } from '@prisma/client';
import { UpdateParcelDto } from './dto/update-parcel-dto';

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

  //colis unique par employéé
  async findOne(userId: string, parcelId: string, role: string) {
    const parcel = await this.prisma.parcel.findUnique({
      where: {
        id: parcelId,
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

    if (!parcel) {
      throw new NotFoundException('Colis introuvable');
    }

    if (role !== 'ADMIN' && parcel.userId !== userId) {
      throw new ForbiddenException('Accès refusé');
    }

    return parcel;
  }

  // update status parcel
  async updateStatus(parcelId: string, status: ParcelStatus) {
    const parcel = await this.prisma.parcel.findUnique({
      where: {
        id: parcelId,
      },
    });

    if (!parcel) {
      throw new NotFoundException('colis introuvable');
    }

    return this.prisma.parcel.update({
      where: {
        id: parcelId,
      },

      data: {
        status,
      },
    });
  }

  // update parcel
  async updateParcel(
    parcelId: string,
    userId: string,
    role: string,
    updateParcelDto: UpdateParcelDto,
  ) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id: parcelId },
    });

    if (!parcel) {
      throw new NotFoundException('Colis introuvable');
    }

    if (role !== 'ADMIN' && parcel.userId !== userId) {
      throw new ForbiddenException('Accès refusé');
    }

    if (parcel.status === 'DELIVERED') {
      throw new ForbiddenException('Colis déjà livré, modification impossible');
    }

    return this.prisma.parcel.update({
      where: { id: parcelId },

      data: {
        description: updateParcelDto.description,
        weight: updateParcelDto.weight,
        destination: updateParcelDto.description,
        recipientName: updateParcelDto.recipientName,
        recipientPhone: updateParcelDto.recipientPhone,
      },
    });
  }
}
