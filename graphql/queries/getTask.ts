import { gql } from '@apollo/client';

export const GET_TASK = gql`
  query task($taskId: Int!) {
    allTasks(filter: { taskId: { equalTo: $taskId } }) {
      nodes {
        taskId
        difficulty
        imageUrl
        isActive
        publicAccess
        taskDescription
        expectedOutput
        expectedCode
        codeTemplate
        taskName
        level
        type
        courseByCourseId {
          courseName
        }
        userByUserId {
          userId
          firstname
          lastname
        }
        taskrequirementsByTaskId {
          nodes {
            requirementByRequirementId {
              requirementId
              requirementName
            }
          }
        }
      }
    }
  }
`;
