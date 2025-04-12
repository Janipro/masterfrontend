import { create } from 'zustand';
import { requirement } from '../types/tableProps';

interface CodeState {
  code: string;
  setCode: (newCode: string) => void;
}

// code and setCode lagged when writing fast in editor, tried const code = useTaskCodeStore((state) => state.code);
// but it did not fix it. A new store fixed the lag
export const useCodeStore = create<CodeState>((set) => ({
  code: localStorage.getItem('currentCode') || '',
  setCode: (newCode) => {
    set({ code: newCode });
    localStorage.setItem('currentCode', newCode);
  },
}));

interface execState {
  outputHistory: string[];
  selectedTaskId: number | null;
  setOutput: (newOutput: string) => void;
  setAIOutput: (newAIOutput: string) => void;
  setTaskId: (taskId: number | null) => Promise<void>;
  executeCode: () => Promise<string>;
  codeHelp: () => Promise<void>;
}

export const useTaskCodeStore = create<execState>((set, get) => ({
  outputHistory: JSON.parse(localStorage.getItem('outputHistory') || '[]'),
  selectedTaskId: localStorage.getItem('currentTaskId') ? parseInt(localStorage.getItem('currentTaskId')!) : null,

  setOutput: (newOutput: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      outputHistory: [...state.outputHistory, `(${timestamp})\n${newOutput.trim()}\n--------------------------`],
    }));
    localStorage.setItem('outputHistory', JSON.stringify(get().outputHistory));
  },

  setAIOutput: (newAIOutput: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      outputHistory: [
        ...state.outputHistory,
        `(${timestamp})\nAI-assistent: ${newAIOutput.trim()}\n--------------------------`,
      ],
    }));
    localStorage.setItem('outputHistory', JSON.stringify(get().outputHistory));
  },

  setTaskId: async (taskId) => {
    const selectedTaskId = useTaskCodeStore.getState().selectedTaskId;
    const setCode = useCodeStore.getState().setCode;
    const setOutput = useTaskCodeStore.getState().setOutput;

    if (taskId !== selectedTaskId) {
      set({ selectedTaskId: taskId });
      if (taskId) {
        localStorage.setItem('currentTaskId', taskId.toString());
      } else {
        localStorage.removeItem('currentTaskId');
      }
      setCode('');
      setOutput('');
      localStorage.setItem('outputHistory', JSON.stringify([]));
      set({ outputHistory: [] });
    }
  },

  // must send id of current task as well
  executeCode: async () => {
    const code = useCodeStore.getState().code;

    const { setOutput } = get();

    // must change from localhost to deployed server when server is online
    try {
      const response = await fetch('http://localhost:6001/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      console.log(result.output);

      if (result.error) {
        setOutput(`Error: ${result.error}`);
        return;
      }

      if (result.output === '') {
        setOutput(`Your code ran, but didn't produce any output. Did you forget a print()?`);
        return;
      }

      if (result.output) {
        setOutput(result.output);
        return result.output;
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code');
    }
  },

  // must send id of current task as well
  codeHelp: async () => {
    const code = useCodeStore.getState().code;
    const selectedTaskId = useTaskCodeStore.getState().selectedTaskId;
    const { setAIOutput } = get();

    // must change from localhost to deployed server when server is online
    try {
      const response = await fetch('http://localhost:6001/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, taskId: selectedTaskId }),
      });

      const result = await response.json();
      console.log(result.message);

      if (result.error) {
        setAIOutput(`Error: ${result.error}`);
        return;
      }

      if (result.message) {
        setAIOutput(result.message);
      }
    } catch (error) {
      console.error('Error analyzing code:', error);
      setAIOutput('Error analyzing code');
    }
  },
}));

interface newTaskState {
  newTaskId: number | null;
  newTitle: string;
  newDescription: string;
  newCodeTemplate: string;
  newExpectedOutput: string;
  newExpectedCode: string;
  newRequirements: requirement[];
  newLevel: string;
  // newImageUrl: string;
  newPublicAccess: boolean;
  newIsActive: boolean;
  newCourseId: number;
  newUserId: number;
  setNewTaskId: (taskId: number | null) => void;
  setNewTitle: (newCode: string) => void;
  setNewDescription: (newOutput: string) => void;
  setNewCodeTemplate: (newCodeTemplate: string) => void;
  setNewExpectedOutput: (newExpectedOutput: string) => void;
  setNewExpectedCode: (newExpectedCode: string) => void;
  setNewRequirements: (newRequirements: requirement[]) => void;
  setNewLevel: (newLevel: string) => void;
  // setNewImageUrl: (newImageUrl: string) => void;
  setNewPublicAccess: (newPublicAccess: boolean) => void;
  setNewIsActive: (newIsActive: boolean) => void;
  setNewCourseId: (newCourseId: number) => void;
  setNewUserId: (newUserId: number) => void;
  resetNewTask: () => void;
}

const initialNewTaskState = {
  newTaskId: null,
  newTitle: '',
  newDescription: '',
  newCodeTemplate: '',
  newExpectedOutput: '',
  newExpectedCode: '',
  newRequirements: [] as requirement[],
  newLevel: '',
  newPublicAccess: false,
  newIsActive: false,
  newCourseId: 0,
  newUserId: 0,
  // newImageUrl: '',
};

export const useNewTaskStore = create<newTaskState>((set) => ({
  ...initialNewTaskState,
  setNewTaskId: (newTaskId: number | null) => set({ newTaskId: newTaskId }),
  setNewTitle: (newTitle: string) => set({ newTitle: newTitle }),
  setNewDescription: (newDescription: string) => set({ newDescription: newDescription }),
  setNewCodeTemplate: (newCodeTemplate: string) => set({ newCodeTemplate: newCodeTemplate }),
  setNewExpectedOutput: (newExpectedOutput: string) => set({ newExpectedOutput: newExpectedOutput }),
  setNewRequirements: (newRequirements: requirement[]) => set({ newRequirements: newRequirements }),
  setNewExpectedCode: (newExpectedCode: string) => set({ newExpectedCode: newExpectedCode }),
  setNewLevel: (newLevel: string) => set({ newLevel: newLevel }),
  // setImageUrl: (newImageUrl: string) => set({ newImageUrl: newImageUrl }),
  setNewPublicAccess: (newPublicAccess: boolean) => set({ newPublicAccess: newPublicAccess }),
  setNewIsActive: (newIsActive: boolean) => set({ newIsActive: newIsActive }),
  setNewCourseId: (newCourseId: number) => set({ newCourseId: newCourseId }),
  setNewUserId: (newUserId: number) => set({ newUserId: newUserId }),

  resetNewTask: () => set(initialNewTaskState),
}));
