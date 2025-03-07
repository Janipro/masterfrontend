import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
    query GetTasks () {
    allTasks {
    nodes {
      taskName
      taskId
      difficulty
      courseId
      taskDescription
      isActive
      imageUrl
      taskstatusesByTaskId {
        nodes {
          status
          lastUpdated
        }
      }
      taskrequirementsByTaskId {
        nodes {
          requirementByRequirementId {
            requirementName
            requirementId
          }
        }
      }
    }
  }
}
`;
