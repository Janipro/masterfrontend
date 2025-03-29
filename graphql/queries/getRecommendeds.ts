import { gql } from '@apollo/client';

export const GET_RECOMMENDEDS = gql`
  query GetRecommendeds($userId: Int!) {
    allRecommendeds(condition: { userId: $userId }) {
      nodes {
        recommendedId
        deadline
        studyGroupId
        isActive
        type
        taskByTaskId {
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
  }
`;
