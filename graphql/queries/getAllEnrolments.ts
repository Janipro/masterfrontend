import { gql } from '@apollo/client';

export const GET_ALL_ENROLMENTS = gql`
  query AllEnrolments($userId: Int!) {
    allEnrolments(condition: { userId: $userId }) {
      nodes {
        studygroupByStudyGroupId {
          description
          isActive
          courseId
          studyGroupId
          studyGroupName
        }
      }
    }
  }
`;
