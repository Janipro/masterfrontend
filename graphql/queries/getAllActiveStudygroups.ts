import { gql } from '@apollo/client';

export const GET_ALL_ACTIVE_STUDY_GROUPS = gql`
  query AllStudygroups($userId: Int!) {
    allStudygroups(condition: { userId: $userId, isActive: true }) {
      nodes {
        description
        isActive
        courseId
        studyGroupId
        studyGroupName
      }
    }
  }
`;
