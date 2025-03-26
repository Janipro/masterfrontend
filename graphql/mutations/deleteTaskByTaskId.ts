import { gql } from '@apollo/client';

export const DELETE_TASK_BY_TASK_ID = gql`
  mutation DeleteTaskByTaskId($taskId: Int!) {
    deleteTaskByTaskId(input: { taskId: $taskId }) {
      task {
        taskId
      }
    }
  }
`;
