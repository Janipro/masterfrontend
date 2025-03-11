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

export type taskRequirement = {
  taskRequirementId: number;
  taskId: number;
  requirementId: number;
  requirementByRequirementId: requirement;
};

export type noderequirementsProps = {
  nodes: taskRequirement[];
};
