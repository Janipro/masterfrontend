import { gql } from '@apollo/client';

export const UPDATE_TASK = gql`
  mutation UpdateTaskDetails($taskId: Int!, $taskName: String!, $taskDescription: String!, $publicAccess: Boolean!) {
    updateTaskByTaskId(
      input: {
        taskId: $taskId
        taskPatch: { taskName: $taskName, taskDescription: $taskDescription, publicAccess: $publicAccess }
      }
    ) {
      task {
        taskId
        taskName
        taskDescription
        publicAccess
      }
    }
  }
`;
