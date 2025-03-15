export type task = {
  taskId: number;
  taskName: string;
  level: string;
  difficulty: string;
  courseByCourseId?: course;
  userByUserId?: user;
  taskrequirementsByTaskId?: noderequirementsProps;
  type: string;
  due: string;
  status: string;
  assigned: string;
  school: string;
  class: string;
  isActive: boolean;
  isPublic: boolean;
};

export type course = {
  courseId: number;
  courseName: string;
};

export type user = {
  userId: number;
  email: string;
};

export type recommended = {
  recommendedId: number;
  taskByTaskId: task;
};

export type requirement = {
  requirementId: number;
  requirementName: string;
};

export type announcement = {
  announcementId: number;
  title: string;
  content: string;
  datePublished: string;
};

export type taskRequirement = {
  taskRequirementId: number;
  taskId: number;
  requirementId: number;
  requirementByRequirementId: requirement;
};

export type noderequirementsProps = {
  nodes: taskRequirement[];
};

export type studygroup = {
  studyGroupId: number;
  studyGroupName: string;
  description: string;
  isActive: boolean;
};

export type enrolment = {
  studygroupByStudyGroupId: studygroup;
};

export type student = {
  id: number;
  title: string;
  level: string;
  class: string;
  school: string;
};
