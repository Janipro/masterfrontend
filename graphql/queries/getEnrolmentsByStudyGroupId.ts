import { gql } from '@apollo/client';

export const GET_ENROLMENTS_BY_STUDY_GROUP_ID = gql`
  query AllEnrolments($studyGroupId: Int!) {
    allEnrolments(condition: { studyGroupId: $studyGroupId }) {
      nodes {
        userId
      }
    }
  }
`;
