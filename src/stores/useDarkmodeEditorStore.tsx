import { create } from 'zustand';

type DarkmodeEditorState = {
  isDarkmodeEditor: boolean;
};

type DarkmodeEditorAction = {
  setDarkmodeEditor: (updateDarkmodeEditorState: boolean) => void;
};

const useDarkmodeEditorStore = create<DarkmodeEditorState & DarkmodeEditorAction>()((set) => ({
  isDarkmodeEditor: localStorage.getItem('isDarkmodeEditor') === 'true',
  setDarkmodeEditor: (updateDarkmodeEditorState) => {
    localStorage.setItem('isDarkmodeEditor', updateDarkmodeEditorState.toString());
    set(() => ({ isDarkmodeEditor: updateDarkmodeEditorState }));
  },
}));

export default useDarkmodeEditorStore;
