import { gql } from '@apollo/client';

export const GET_STUDY_GROUP_BY_STUDY_GROUP_ID = gql`
  query StudygroupByStudyGroupId($studyGroupId: Int!) {
    studygroupByStudyGroupId(studyGroupId: $studyGroupId) {
      studyGroupName
      description
    }
  }
`;
