import { create } from 'zustand';

type TeacherState = {
  isTeacher: boolean;
  isOwner: boolean;
};

type TeacherAction = {
  setTeacher: (updateTeacherState: boolean) => void;
  setIsOwner: (updateIsOwnerState: boolean) => void;
};

const useTeacherStore = create<TeacherState & TeacherAction>()((set) => ({
  isTeacher: false,
  isOwner: false,
  setTeacher: (updateTeacherState) => set(() => ({ isTeacher: updateTeacherState })),
  setIsOwner: (updateTeacherState) => set(() => ({ isOwner: updateTeacherState })),
}));

export default useTeacherStore;
