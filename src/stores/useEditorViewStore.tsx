import { create } from 'zustand';
import { EditorView } from '@codemirror/view';

type EditorViewStore = {
  editorView: EditorView | null;
  setEditorView: (view: EditorView) => void;
};

const useEditorViewStore = create<EditorViewStore>((set) => ({
  editorView: null,
  setEditorView: (view) => set({ editorView: view }),
}));

export default useEditorViewStore;
