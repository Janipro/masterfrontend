import { gql } from '@apollo/client';

export const CREATE_TASK_REQUIREMENT = gql`
  mutation CreateTaskRequirement($taskId: Int!, $requirementId: Int!) {
    createTaskrequirement(input: { taskrequirement: { taskId: $taskId, requirementId: $requirementId } }) {
      taskrequirement {
        taskRequirementId
        taskId
        requirementId
      }
    }
  }
`;
