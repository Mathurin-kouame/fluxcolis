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

  // Create employee and assign
  async create(createParcelDto: CreateParcelDto & { employeeId: string }) {
    const employed = await this.prisma.user.findUnique({
      where: {
        id: createParcelDto.employeeId,
      },
    });

    if (!employed) {
      throw new NotFoundException('Employé assigné non trouvé !');
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

        userId: createParcelDto.employeeId,
      },
    });
  }
  //Dashboard list ass employ
  private generateTrackingNumber() {
    const random = Math.floor(100000 + Math.random() * 900000);

    return `FLX-${Date.now()}-${random}`;
  }

  //dashboard list All(Admin/employed)
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

    // // Filtre strict pour l'employé
    return this.prisma.parcel.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //  RECHERCHE / SÉCURITÉ : Consulter un colis spécifique
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
  async updateStatus(
    parcelId: string,
    userId: string,
    role: string,
    status: ParcelStatus,
    location?: string,
    note?: string,
  ) {
    const parcel = await this.prisma.parcel.findUnique({
      where: {
        id: parcelId,
      },
    });

    if (!parcel) {
      throw new NotFoundException('Colis introuvable');
    }

    // SÉCURITÉ : L'employé ne peut modifier que son colis assigné
    if (role !== 'ADMIN' && parcel.userId !== userId) {
      throw new ForbiddenException('Modification réfusée');
    }

    return this.prisma.$transaction(async (tx) => {
      //update parcel status
      const updatedParcel = await tx.parcel.update({
        where: {
          id: parcelId,
        },

        data: {
          status,
        },
      });

      //create trackingHistory
      const tracking = await tx.trackingHistory.create({
        data: {
          parcelId,
          status,
          location: location ?? 'Non defini',
          note: note ?? null,
        },
      });

      return {
        parcel: updatedParcel,
        tracking,
      };
    });
  }

  //Recherche par suivi /Scan
  async findByTrackingNumber(
    trackingNumber: string,
    userId: string,
    role: string,
  ) {
    const parcel = await this.prisma.parcel.findUnique({
      where: {
        trackingNumber,
      },
      include: {
        trackingHistory: true,
      },
    });

    if (!parcel) {
      throw new NotFoundException('colis non trouvé avec ce numéro');
    }

    if (role !== 'ADMIN' && parcel.userId !== userId) {
      throw new ForbiddenException('ce coli est assigné à un autre employé');
    }

    return parcel;
  }

  //Réassignation de coli(ADMIN)
  async reassignParcel(parcelId: string, employedId: string) {
    const employed = await this.prisma.user.findUnique({
      where: {
        id: employedId,
      },
    });

    if (!employed) {
      throw new NotFoundException('Employé introuvable');
    }

    return this.prisma.parcel.update({
      where: { id: parcelId },
      data: { userId: employedId },
    });
  }

  // Recherché un coli par son numéro
  async getTrackingHistory(parcelId: string) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id: parcelId },
    });

    if (!parcel) {
      throw new NotFoundException('Aucun colis trouvé avec ce numéro');
    }

    return this.prisma.trackingHistory.findMany({
      where: { parcelId },
      orderBy: { createdAt: 'asc' },
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
        ...(updateParcelDto.description && {
          description: updateParcelDto.description,
        }),
        ...(updateParcelDto.weight && { weight: updateParcelDto.weight }),
        ...(updateParcelDto.destination && {
          destination: updateParcelDto.destination,
        }),
        ...(updateParcelDto.recipientName && {
          recipientName: updateParcelDto.recipientName,
        }),
        ...(updateParcelDto.recipientPhone && {
          recipientPhone: updateParcelDto.recipientPhone,
        }),
      },
    });
  }

  //remove parcel
  async removeParcel(parcelId: string, role: string) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id: parcelId },
    });

    if (!parcel) {
      throw new NotFoundException('Colis introuvable');
    }

    if (role !== 'ADMIN') {
      throw new ForbiddenException(
        'Seul un administrateur peut supprimer un colis',
      );
    }

    if (parcel.status === 'DELIVERED') {
      throw new ForbiddenException(
        'Suppression impossible pour un colis livré',
      );
    }

    await this.prisma.parcel.delete({
      where: {
        id: parcelId,
      },
    });

    return { message: 'Colis supprimé avec succès' };
  }

  // dashboard stats Admin
  async getAdminDashboardStats() {
    const total = await this.prisma.parcel.count();

    const pending = await this.prisma.parcel.count({
      where: {
        status: 'PENDING',
      },
    });

    const inTransit = await this.prisma.parcel.count({
      where: {
        status: 'IN_TRANSIT',
      },
    });

    const delivered = await this.prisma.parcel.count({
      where: {
        status: 'DELIVERED',
      },
    });

    const cancelled = await this.prisma.parcel.count({
      where: {
        status: 'CANCELLED',
      },
    });

    return {
      total,
      pending,
      inTransit,
      delivered,
      cancelled,
    };
  }

  // dashboard stats Employee
  async getEmployeeDashboardStats(userId: string) {
    const total = await this.prisma.parcel.count({
      where: { userId },
    });

    const pending = await this.prisma.parcel.count({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    const inTransit = await this.prisma.parcel.count({
      where: {
        userId,
        status: 'IN_TRANSIT',
      },
    });

    const delivered = await this.prisma.parcel.count({
      where: {
        userId,
        status: 'DELIVERED',
      },
    });

    const cancelled = await this.prisma.parcel.count({
      where: {
        userId,
        status: 'CANCELLED',
      },
    });

    return {
      total,
      pending,
      inTransit,
      delivered,
      cancelled,
    };
  }

  //Tracking public
  async publicTracking(trackingNumber: string) {
    const parcel = await this.prisma.parcel.findFirst({
      where: {
        trackingNumber,
      },
      include: {
        trackingHistory: true,
      },
    });

    if (!parcel) {
      throw new NotFoundException('colis introuvable');
    }

    return {
      trackingNumber: parcel.trackingNumber,
      status: parcel.status,
      destination: parcel.destination,
      createdAt: parcel.createdAt,
      history: parcel.trackingHistory,
    };
  }

  //get last parcels
  async getLatestParcels(userId: string, role: string) {
    return await this.prisma.parcel.findMany({
      take: 5,
      where: role === 'ADMIN' ? {} : { userId },
      orderBy: {
        createdAt: 'desc',
      },

      select: {
        id: true,
        trackingNumber: true,
        recipientName: true,
        status: true,
        destination: true,
        createdAt: true,
      },
    });
  }
}
