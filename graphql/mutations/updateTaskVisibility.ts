import { gql } from '@apollo/client';

export const UPDATE_TASK_VISIBILITY = gql`
  mutation UpdateTaskByTaskId($taskId: Int!, $isActive: Boolean!) {
    updateTaskByTaskId(input: { taskId: $taskId, taskPatch: { isActive: $isActive } }) {
      task {
        taskId
        isActive
      }
    }
  }
`;
