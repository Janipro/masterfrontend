import { gql } from '@apollo/client';

export const GET_ACTIVE_CREATED_TASKS = gql`
  query CreatedTasks($userId: Int!) {
    allTasks(condition: { userId: $userId, isActive: true }) {
      nodes {
        taskId
        difficulty
        imageUrl
        isActive
        publicAccess
        taskName
        level
        type
        userByUserId {
          email
        }
        taskstatusesByTaskId {
          nodes {
            status
          }
        }
        taskrequirementsByTaskId {
          nodes {
            requirementByRequirementId {
              requirementName
            }
          }
        }
        courseByCourseId {
          courseName
        }
      }
    }
  }
`;
