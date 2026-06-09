import { Prisma } from '@prisma/client';

export type SafeUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
    role: true;
    createdAt: true;
  };
}>;
