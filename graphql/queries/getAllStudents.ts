import { gql } from '@apollo/client';

export const GET_ALL_STUDENTS = gql`
  query AllStudents($classId: Int!) {
    allUsers(condition: { classId: $classId, isAdmin: false }) {
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
