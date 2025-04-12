import { gql } from '@apollo/client';

export const GET_RECOMMENDED_STUDENTS = gql`
  query GetRecommendedStudents($userId: Int!) {
    allRecommendedstudents(condition: { userId: $userId }) {
      nodes {
        recommendedStudentId
        recommendedByRecommendedId {
          deadline
          isActive
          recommendedId
          studyGroupId
          type
          taskByTaskId {
            taskId
            taskName
            taskDescription
            level
            difficulty
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
  }
`;
