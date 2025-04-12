import { gql } from '@apollo/client';

export const GET_ALL_STUDENTS = gql`
  query AllStudents($classId: Int!, $schoolId: Int!) {
    allUsers(condition: { classId: $classId, schoolId: $schoolId, isAdmin: false }) {
      nodes {
        firstname
        lastname
        userId
        classByClassId {
          className
          grade
        }
        schoolBySchoolId {
          schoolName
        }
      }
    }
  }
`;
