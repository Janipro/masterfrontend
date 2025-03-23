import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query AllTasks {
    allTasks(condition: { publicAccess: true }) {
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
