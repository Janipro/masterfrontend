import { gql } from '@apollo/client';

export const DELETE_RECOMMENDED_BY_RECOMMENDED_ID = gql`
  mutation DeleteRecommendedByRecommendedId($taskId: Int!) {
    deleteRecommendedByRecommendedId(input: { recommendedId: $recommendedId }) {
      recommended {
        recommendedId
      }
    }
  }
`;
