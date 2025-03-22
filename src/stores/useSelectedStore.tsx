import { GridRowSelectionModel } from '@mui/x-data-grid';
import { create } from 'zustand';

type SelectedState = {
  selectionModel: GridRowSelectionModel;
};

type SelectedAction = {
  setSelectionModel: (updateSelectedState: GridRowSelectionModel) => void;
};

const useSelectedStore = create<SelectedState & SelectedAction>()((set) => ({
  selectionModel: [],
  setSelectionModel: (updateSelectedState) => set(() => ({ selectionModel: updateSelectedState })),
}));

export default useSelectedStore;
