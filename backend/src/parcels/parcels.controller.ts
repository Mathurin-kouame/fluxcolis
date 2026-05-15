import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateParcelDto } from './dto/create-parcel.dto';
import type { RequestWithUser } from 'src/auth/types/request-user.interface';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.parcelsService.findOne(req.user.userId, id, req.user.role);
  }
}
