import { gql } from '@apollo/client';

export const GET_RECOMMENDEDS_BY_STUDY_GROUP_ID = gql`
  query GetRecommendeds($userId: Int!, $studyGroupId: Int!) {
    allRecommendeds(condition: { userId: $userId, studyGroupId: $studyGroupId }) {
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
