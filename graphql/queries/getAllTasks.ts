import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query AllTasks {
    allTasks {
      nodes {
        taskId
        difficulty
        imageUrl
        isActive
        publicAccess
        taskName
        level
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
