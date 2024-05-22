import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as any as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma;
}
