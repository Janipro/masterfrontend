import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask(
    $taskName: String!
    $taskDescription: String!
    $expectedCode: String
    $expectedOutput: String
    $codeTemplate: String
    $difficulty: String
    $level: String
    $type: String
    $courseId: Int
    $userId: Int!
    $publicAccess: Boolean
    $imageUrl: String
    $isActive: Boolean
  ) {
    createTask(
      input: {
        task: {
          taskName: $taskName
          taskDescription: $taskDescription
          expectedCode: $expectedCode
          expectedOutput: $expectedOutput
          codeTemplate: $codeTemplate
          difficulty: $difficulty
          level: $level
          type: $type
          courseId: $courseId
          userId: $userId
          publicAccess: $publicAccess
          imageUrl: $imageUrl
          isActive: $isActive
        }
      }
    ) {
      task {
        taskId
        taskName
        taskDescription
        publicAccess
        isActive
        userId
      }
    }
  }
`;
