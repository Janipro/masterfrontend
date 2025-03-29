import { gql } from '@apollo/client';

export const CREATE_RECOMMENDED = gql`
  mutation CreateRecommended($userId: Int!, $taskId: Int!, $studyGroupId: Int!) {
    createRecommended(
      input: { recommended: { userId: $userId, taskId: $taskId, studyGroupId: $studyGroupId, type: "exercise" } }
    ) {
      recommended {
        userId
        taskId
        studyGroupId
      }
    }
  }
`;
