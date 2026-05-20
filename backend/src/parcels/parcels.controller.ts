import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateParcelDto } from './dto/create-parcel.dto';
import type { RequestWithUser } from 'src/auth/types/request-user.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateParcelStatusDto } from './dto/update-status.dto';
import { UpdateParcelDto } from './dto/update-parcel-dto';

@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(
    @Request() req: RequestWithUser,
    @Body() createParcelDto: CreateParcelDto & { employeeId: string },
  ) {
    return this.parcelsService.create(createParcelDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: RequestWithUser) {
    return this.parcelsService.findAll(req.user.userId, req.user.role);
  }

  @Get('search/:trackingNumber')
  @UseGuards(JwtAuthGuard)
  searchByTracking(
    @Param('trackingNumber') trackingNumber: string,
    @Request() req: RequestWithUser,
  ) {
    return this.parcelsService.findByTrackingNumber(
      trackingNumber,
      req.user.userId,
      req.user.role,
    );
  }

  @Get('dashboard/latest')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getLatestParcels(@Request() req: RequestWithUser) {
    return this.parcelsService.getLatestParcels(req.user.userId, req.user.role);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EMPLOYEE')
  updateStatus(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() updateParcelStatusDto: UpdateParcelStatusDto,
  ) {
    return this.parcelsService.updateStatus(
      id,
      req.user.userId,
      req.user.role,
      updateParcelStatusDto.status,
      updateParcelStatusDto.location,
      updateParcelStatusDto.note,
    );
  }

  // Réassignation d'un colis existant à un autre employé (Admin)
  @Patch(':id/reassign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  reassign(@Param('id') id: string, @Body('employedId') employedId: string) {
    return this.parcelsService.reassignParcel(id, employedId);
  }

  //Statistiques globales du système (Admin)
  @Get('dashboard/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAdminDashboardStats() {
    return this.parcelsService.getAdminDashboardStats();
  }

  @Get('employee/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'EMPLOYEE')
  getEmployeeStats(@Request() req: RequestWithUser) {
    return this.parcelsService.getEmployeeDashboardStats(req.user.userId);
  }

  @Get('public/:trackingNumber')
  publicTracking(@Param('trackingNumber') trackingNumber: string) {
    return this.parcelsService.publicTracking(trackingNumber);
  }

  // Historique des étapes d'un colis
  @Get(':id/tracking')
  @UseGuards(JwtAuthGuard)
  getTrackingHistory(@Param('id') id: string) {
    return this.parcelsService.getTrackingHistory(id);
  }

  // Consultation d'un colis (Protégé : l'employé doit être l'assigné)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.parcelsService.findOne(req.user.userId, id, req.user.role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() updateParcelDto: UpdateParcelDto,
  ) {
    return this.parcelsService.updateParcel(
      id,
      req.user.userId,
      req.user.role,
      updateParcelDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.parcelsService.removeParcel(id, req.user.role);
  }
}
