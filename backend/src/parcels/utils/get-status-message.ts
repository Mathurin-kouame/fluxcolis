import { ParcelStatus } from '@prisma/client';
import { parcelStatusMessages } from '../constants/parcel-status';

export function getParcelStatusMessage(status: ParcelStatus): string {
  return parcelStatusMessages[status];
}
