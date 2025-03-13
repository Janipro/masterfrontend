import { gql } from '@apollo/client';

export const GET_ALL_ANNOUNCEMENTS = gql`
  query AllAnnouncements($studyGroupId: Int!) {
    allAnnouncements(condition: { studyGroupId: $studyGroupId }) {
      nodes {
        content
        datePublished
        announcementId
        title
        studyGroupId
      }
    }
  }
`;
