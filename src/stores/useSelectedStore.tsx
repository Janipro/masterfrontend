import { GridRowSelectionModel } from '@mui/x-data-grid';
import { create } from 'zustand';
// Modified with help from GPT 4.o 26.03.25 for creating multiple states
type SelectedState = {
  allTasksSelectionModel: GridRowSelectionModel;
  recommendedSelectionModel: GridRowSelectionModel;
  studentSelectionModel: GridRowSelectionModel;
  studygroupSelectionModel: GridRowSelectionModel;
};

type SelectedAction = {
  setAllTasksSelectionModel: (updateSelectedState: GridRowSelectionModel) => void;
  setRecommendedSelectionModel: (updateSelectedState: GridRowSelectionModel) => void;
  setStudentSelectionModel: (updateSelectedState: GridRowSelectionModel) => void;
  setStudygroupSelectionModel: (updateSelectedState: GridRowSelectionModel) => void;
};

const useSelectedStore = create<SelectedState & SelectedAction>()((set) => ({
  allTasksSelectionModel: [],
  recommendedSelectionModel: [],
  studentSelectionModel: [],
  studygroupSelectionModel: [],
  setAllTasksSelectionModel: (updateSelectedState) => set(() => ({ allTasksSelectionModel: updateSelectedState })),
  setRecommendedSelectionModel: (updateSelectedState) =>
    set(() => ({ recommendedSelectionModel: updateSelectedState })),
  setStudentSelectionModel: (updateSelectedState) => set(() => ({ studentSelectionModel: updateSelectedState })),
  setStudygroupSelectionModel: (updateSelectedState) => set(() => ({ studygroupSelectionModel: updateSelectedState })),
}));

export default useSelectedStore;
