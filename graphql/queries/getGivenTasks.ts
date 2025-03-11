import { gql } from '@apollo/client';

export const GET_GIVEN_TASKS = gql`
  query GivenTasks($userId: Int!) {
    allTasks(condition: { userId: $userId }, filter: { recommendedsByTaskId: { some: { userByUserIdExists: true } } }) {
      nodes {
        taskId
        difficulty
        imageUrl
        isActive
        publicAccess
        taskName
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
