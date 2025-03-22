import { gql } from '@apollo/client';

export const GET_GIVEN_TASKS = gql`
  query GivenTasks($userId: Int!) {
    allTasks(filter: { recommendedsByTaskId: { some: { userId: { equalTo: $userId } } } }) {
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
