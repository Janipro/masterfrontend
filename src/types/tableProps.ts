export type tableProps = {
  id: number;
  taskId: number;
  taskName?: string;
  requirement?: string[];
  level?: string;
  difficulty?: string;
  courseByCourseId?: string;
  userByUserId?: string;
  taskrequirementsByRequirementId?: string;
  type?: string;
  due?: string;
  status?: string;
  assigned?: string;
  school?: string;
  class?: string;
};
