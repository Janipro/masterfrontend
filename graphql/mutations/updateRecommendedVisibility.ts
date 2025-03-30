import { gql } from '@apollo/client';

export const UPDATE_RECOMMENDED_VISIBILITY = gql`
  mutation UpdateRecommendedByRecommendedId($recommendedId: Int!, $isActive: Boolean!) {
    updateRecommendedByRecommendedId(
      input: { recommendedId: $recommendedId, recommendedPatch: { isActive: $isActive } }
    ) {
      recommended {
        recommendedId
        isActive
      }
    }
  }
`;
