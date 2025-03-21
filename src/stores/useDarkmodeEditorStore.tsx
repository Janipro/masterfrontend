import { create } from 'zustand';

type DarkmodeEditorState = {
  isDarkmodeEditor: boolean;
};

type DarkmodeEditorAction = {
  setDarkmodeEditor: (updateDarkmodeEditorState: boolean) => void;
};

const useDarkmodeEditorStore = create<DarkmodeEditorState & DarkmodeEditorAction>()((set) => ({
  isDarkmodeEditor: false,
  setDarkmodeEditor: (updateDarkmodeEditorState) => set(() => ({ isDarkmodeEditor: updateDarkmodeEditorState })),
}));

export default useDarkmodeEditorStore;
