import { gql } from '@apollo/client';

export const GET_RECOMMENDED_TASKS = gql`
  query GetRecommendeds($userId: Int!) {
    allRecommendeds(condition: { userId: $userId }) {
      nodes {
        taskByTaskId {
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
  }
`;
