import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.emission.deleteMany({});
  await prisma.company.deleteMany({});

  const companies = [
    { id: 'AAPL', name: 'Apple', fullName: 'Apple, Inc.' },
    { id: 'GOOGL', name: 'Google', fullName: 'Alphabet, Inc.' },
    { id: 'AMZN', name: 'Amazon', fullName: 'Amazon.com, Inc.' },
    { id: 'MSFT', name: 'Microsoft', fullName: 'Microsoft Corporation' },
    { id: 'META', name: 'Meta', fullName: 'Meta Platforms, Inc.' },
  ];

  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: company,
      create: company,
    });
  }

  // Add some sample emissions data
  const emissionsData = [
    {
      companyId: 'AMZN',
      year: 2019,
      scope1: 5.76,
      scope2: 5.50,
      scope3: 39.91,
    },
    {
      companyId: 'AMZN',
      year: 2020,
      scope1: 9.62,
      scope2: 5.27,
      scope3: 45.75,
    },
    {
      companyId: 'AMZN',
      year: 2021,
      scope1: 12.11,
      scope2: 4.07,
      scope3: 55.36,
    },
    {
      companyId: 'AMZN',
      year: 2022,
      scope1: 13.32,
      scope2: 3.14,
      scope3: 54.28,
    },
    {
      companyId: 'AMZN',
      year: 2023,
      scope1: 14.27,
      scope2: 2.79,
      scope3: 51.76,
    },
        {
          companyId: 'GOOGL',
          year: 2019,
          scope1: 0.067,
          scope2: 0.794,
          scope3: 11.670,
        },
        {
          companyId: 'GOOGL',
          year: 2020,
          scope1: 0.039,
          scope2: 0.911,
          scope3: 9.370,
        },
        {
          companyId: 'GOOGL',
          year: 2021,
          scope1: 0.045,
          scope2: 1.820,
          scope3: 9.500,
        },
        {
          companyId: 'GOOGL',
          year: 2022,
          scope1: 0.091,
          scope2: 2.490,
          scope3: 7.600,
        },
        {
          companyId: 'MSFT',
          year: 2020,
          scope1: 0.118,
          scope2: 0.456,
          scope3: 11.325,
        },
        {
          companyId: 'MSFT',
          year: 2021,
          scope1: 0.124,
          scope2: 0.429,
          scope3: 12.512,
        },
        {
          companyId: 'MSFT',
          year: 2022,
          scope1: 0.139,
          scope2: 0.288,
          scope3: 12.360,
        },
        {
          companyId: 'MSFT',
          year: 2023,
          scope1: 0.145,
          scope2: 0.393,
          scope3: 14.819,
        },
            {
              companyId: 'META',
              year: 2019,
              scope1: 0.044,
              scope2: 0.208,
              scope3: 4.078,
            },
            {
              companyId: 'META',
              year: 2020,
              scope1: 0.029,
              scope2: 0.009,
              scope3: 5.091,
            },
            {
              companyId: 'META',
              year: 2021,
              scope1: 0.055,
              scope2: 0.002,
              scope3: 5.773,
            },
            {
              companyId: 'META',
              year: 2022,
              scope1: 0.067,
              scope2: 0.000,
              scope3: 8.466,
            },
                {
                  companyId: 'AAPL',
                  year: 2019,
                  scope1: 0.053,
                  scope2: 0.000,
                  scope3: 24.980,
                },
                {
                  companyId: 'AAPL',
                  year: 2020,
                  scope1: 0.047,
                  scope2: 0.000,
                  scope3: 22.550,
                },
                {
                  companyId: 'AAPL',
                  year: 2021,
                  scope1: 0.055,
                  scope2: 0.003,
                  scope3: 23.128,
                },
                {
                  companyId: 'AAPL',
                  year: 2022,
                  scope1: 0.055,
                  scope2: 0.003,
                  scope3: 20.546,
                },
                {
                  companyId: 'AAPL',
                  year: 2023,
                  scope1: 0.055,
                  scope2: 0.003,
                  scope3: 15.980,
                }
  ];

  for (const emission of emissionsData) {
    await prisma.emission.create({
      data: emission,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });