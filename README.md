# Carbon View

![Carbon View](./readme-img-2.png)

## Overview

Carbon View is a Next.js application with GraphQL, Prisma, and PostgreSQL on Amazon RDS that visualizes corporate environmental impact through interactive emissions data charts.

## Tech Stack

- **Framework**: Next.js, React, TypeScript
- **Database**: PostgreSQL on Amazon RDS with Prisma ORM
- **API**: GraphQL with Apollo Client
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Deployment**: Vercel with AWS RDS

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL or access to an RDS instance
- npm or yarn

### Installation

1. Set up Amazon RDS:
   - Go to AWS RDS Console
   - Create a new PostgreSQL database instance
   - Configure VPC and security groups
   - Note down the endpoint URL, username, and password

2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carbon-view.git
   cd carbon-view
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/carbon_view"
   ```

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

[Rest of README remains the same...]

## Data Sources

All emissions data is sourced from official corporate sustainability reports:
- [Amazon Sustainability Report 2023](https://sustainability.aboutamazon.com/2023-amazon-sustainability-report.pdf)
- [Apple Environmental Progress Report 2024](https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf)
- [Meta Sustainability Report 2023](https://sustainability.fb.com/wp-content/uploads/2023/07/Meta-2023-Sustainability-Report-1.pdf)
- [Microsoft Environmental Sustainability Report 2023](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RW1lmju)
- [Google Environmental Report 2023](https://www.ownyourbeliefs.org/securities/GOOGL)

## Project Structure

```
carbon-view/
├── app/              # Next.js app router
├── components/       # React components
├── graphql/         # GraphQL schemas and queries
├── lib/             # Utility functions
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```
