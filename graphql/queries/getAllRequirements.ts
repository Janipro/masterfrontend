import { gql } from '@apollo/client';

export const GET_ALL_REQUIREMENTS = gql`
  query AllRequirements {
    allRequirements {
      nodes {
        requirementId
        requirementName
      }
    }
  }
`;
