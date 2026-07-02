import { ParcelStatus } from '@prisma/client';

export const parcelStatusMessages: Record<ParcelStatus, string> = {
  PENDING: 'Colis en attente de traitement',
  IN_TRANSIT: 'Colis en cours de livraison',
  DELIVERED: 'Colis livré au destinataire',
  CANCELLED: 'Livraison annulée',
};
