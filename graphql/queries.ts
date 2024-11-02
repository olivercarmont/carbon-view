import { gql } from '@apollo/client';

export const GET_COMPANY_EMISSIONS = gql`
  query GetCompanyEmissions($companyId: ID!) {
    emissions(companyId: $companyId) {
      year
      scope1
      scope2
      scope3
    }
  }
`;

export const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
      fullName
    }
  }
`;