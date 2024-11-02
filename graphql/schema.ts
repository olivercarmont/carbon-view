import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
    fullName: String!
    emissions: [Emission!]!
  }

  type Emission {
    id: ID!
    year: Int!
    scope1: Float!
    scope2: Float!
    scope3: Float!
    company: Company!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    companies: [Company!]!
    company(id: ID!): Company
    emissions(companyId: ID!): [Emission!]!
  }
`;