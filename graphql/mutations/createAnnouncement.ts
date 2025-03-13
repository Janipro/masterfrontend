import { gql } from '@apollo/client';

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement(
    $userId: Int!
    $title: String!
    $content: String!
    $datePublished: Date!
    $studyGroupId: Int!
  ) {
    createAnnouncement(
      input: {
        announcement: {
          userId: $userId
          title: $title
          content: $content
          datePublished: $datePublished
          studyGroupId: $studyGroupId
        }
      }
    ) {
      announcement {
        userId
        title
        content
        datePublished
        studyGroupId
      }
    }
  }
`;
