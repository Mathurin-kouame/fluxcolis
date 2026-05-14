import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParcelDto {
  @IsNotEmpty()
  description!: string;

  @Optional()
  @IsNumber()
  weight?: number;

  @IsNotEmpty()
  senderName!: string;

  @IsNotEmpty()
  recipientName!: string;

  @IsNotEmpty()
  recipientPhone!: string;

  @IsNotEmpty()
  destination!: string;
}
