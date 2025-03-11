import { create } from 'zustand';

type DarkmodeState = {
  isDarkmode: boolean;
};

type DarkmodeAction = {
  setDarkmode: (updateDarkmodeState: boolean) => void;
};

const useDarkmodeStore = create<DarkmodeState & DarkmodeAction>()((set) => ({
  isDarkmode: false,
  setDarkmode: (updateDarkmodeState) => set(() => ({ isDarkmode: updateDarkmodeState })),
}));

export default useDarkmodeStore;
