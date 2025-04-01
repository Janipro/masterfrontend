import { gql } from '@apollo/client';

export const GET_ALL_STUDY_GROUPS = gql`
  query AllStudygroups($userId: Int!) {
    allStudygroups(condition: { userId: $userId }) {
      nodes {
        description
        isActive
        courseId
        studyGroupId
        studyGroupName
        courseByCourseId {
          courseName
          courseId
        }
        schoolBySchoolId {
          schoolId
          schoolName
        }
      }
    }
  }
`;
