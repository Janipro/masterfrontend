import { gql } from '@apollo/client';

export const CREATE_RECOMMENDED = gql`
  mutation CreateRecommended($userId: Int!, $taskId: Int!) {
    createRecommended(input: { recommended: { userId: $userId, taskId: $taskId } }) {
      recommended {
        userId
        taskId
      }
    }
  }
`;
