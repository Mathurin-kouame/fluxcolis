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
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: RequestWithUser,
    @Body() createParcelDto: CreateParcelDto,
  ) {
    return this.parcelsService.create(req.user.userId, createParcelDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: RequestWithUser) {
    return this.parcelsService.findAll(req.user.userId, req.user.role);
  }

  @Get('dashboard/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getDashboardStats() {
    return this.parcelsService.getDashboardStats();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatus(
    @Param('id') id: string,
    @Body() updateParcelStatusDto: UpdateParcelStatusDto,
  ) {
    return this.parcelsService.updateStatus(
      id,
      updateParcelStatusDto.status,
      updateParcelStatusDto.location,
      updateParcelStatusDto.note,
    );
  }

  @Get(':id/tracking')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTrackingHistory(@Param('id') id: string) {
    return this.parcelsService.getTrackingHistory(id);
  }

  @Get('public/:trackingNumber')
  publicTracking(@Param('trackingNumber') trackingNumber: string) {
    return this.parcelsService.publicTracking(trackingNumber);
  }

  @Get('dashboard/latest')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getLatestParcels() {
    return this.parcelsService.getLatestParcels();
  }

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
