import { ParcelStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateParcelStatusDto {
  @IsEnum(ParcelStatus)
  status!: ParcelStatus;
}
