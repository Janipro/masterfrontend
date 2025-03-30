import { gql } from '@apollo/client';

export const CREATE_RECOMMENDED_STUDENT = gql`
  mutation CreateRecommendedStudent($userId: Int!, $recommendedId: Int!) {
    createRecommendedstudent(input: { recommendedstudent: { recommendedId: $recommendedId, userId: $userId } }) {
      recommendedstudent {
        recommendedId
        userId
      }
    }
  }
`;
