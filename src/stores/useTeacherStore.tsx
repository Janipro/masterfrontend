import { create } from 'zustand';

type TeacherState = {
  isTeacher: boolean;
};

type TeacherAction = {
  setTeacher: (updateTeacherState: boolean) => void;
};

const useTeacherStore = create<TeacherState & TeacherAction>()((set) => ({
  isTeacher: false,
  setTeacher: (updateTeacherState) => set(() => ({ isTeacher: updateTeacherState })),
}));

export default useTeacherStore;
