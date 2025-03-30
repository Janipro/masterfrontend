import { create } from 'zustand';

type DarkmodeState = {
  isDarkmode: boolean;
};

type DarkmodeAction = {
  setDarkmode: (updateDarkmodeState: boolean) => void;
};

const useDarkmodeStore = create<DarkmodeState & DarkmodeAction>()((set) => ({
  isDarkmode: localStorage.getItem('isDarkmode') === 'true',
  setDarkmode: (updateDarkmodeState) => {
    localStorage.setItem('isDarkmode', updateDarkmodeState.toString());
    set(() => ({ isDarkmode: updateDarkmodeState }));
  },
}));

export default useDarkmodeStore;
