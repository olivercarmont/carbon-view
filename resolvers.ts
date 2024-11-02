import { prisma } from '../lib/prisma';

export const resolvers = {
  Query: {
    companies: async () => {
      return await prisma.company.findMany();
    },
    company: async (_, { id }) => {
      return await prisma.company.findUnique({
        where: { id },
      });
    },
    emissions: async (_, { companyId }) => {
      return await prisma.emission.findMany({
        where: { companyId },
        orderBy: { year: 'asc' },
      });
    },
  },
  Company: {
    emissions: async (parent) => {
      return await prisma.emission.findMany({
        where: { companyId: parent.id },
        orderBy: { year: 'asc' },
      });
    },
  },
};