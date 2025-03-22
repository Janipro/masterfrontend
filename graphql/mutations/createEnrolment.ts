import { gql } from '@apollo/client';

export const CREATE_ENROLMENT = gql`
  mutation CreateEnrolment($userId: Int!, $studyGroupId: Int!) {
    createStudygroup(input: { enrolment: { userId: $userId, studyGroupId: $studyGroupId } }) {
      enrolment {
        userId
        studyGroupId
      }
    }
  }
`;
