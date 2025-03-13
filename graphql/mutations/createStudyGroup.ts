import { gql } from '@apollo/client';

export const CREATE_STUDY_GROUP = gql`
  mutation CreateStudygroup(
    $courseId: Int!
    $description: String!
    $schoolId: Int!
    $studyGroupName: String!
    $userId: Int!
  ) {
    createStudygroup(
      input: {
        studygroup: {
          courseId: $courseId
          description: $description
          isActive: true
          schoolId: $schoolId
          studyGroupName: $studyGroupName
          userId: $userId
        }
      }
    ) {
      studygroup {
        courseId
        description
        isActive
        schoolId
        studyGroupName
        userId
      }
    }
  }
`;
