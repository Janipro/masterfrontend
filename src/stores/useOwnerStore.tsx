import { create } from 'zustand';

type OwnerState = {
  isOwner: boolean;
};

type OwnerAction = {
  setIsOwner: (updateIsOwnerState: boolean) => void;
};

const useOwnerStore = create<OwnerState & OwnerAction>()((set) => ({
  isOwner: localStorage.getItem('isOwner') === 'true',
  setIsOwner: (updateOwnerState) => set(() => ({ isOwner: updateOwnerState })), // decides if user can edit in editor/template or not
}));

export default useOwnerStore;
