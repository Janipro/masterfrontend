import { gql } from '@apollo/client';

export const UPDATE_STUDY_GROUP_BY_STUDY_GROUP_ID = gql`
  mutation UpdateStudygroupByStudyGroupId(
    $studyGroupId: Int!
    $description: String!
    $studyGroupName: String!
    $courseId: Int!
  ) {
    updateStudygroupByStudyGroupId(
      input: {
        studyGroupId: $studyGroupId
        studygroupPatch: { description: $description, studyGroupName: $studyGroupName, courseId: $courseId }
      }
    ) {
      studygroup {
        studyGroupId
        studyGroupName
        description
      }
    }
  }
`;
