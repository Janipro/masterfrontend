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
  executeCode: () => Promise<void>;
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

    if (taskId !== selectedTaskId) {
      set({ selectedTaskId: taskId });
      if (taskId) {
        localStorage.setItem('currentTaskId', taskId.toString());
      } else {
        localStorage.removeItem('currentTaskId');
      }
      setCode('');
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
      }

      if (result.output) {
        setOutput(result.output);
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
  taskId: number | null;
  title: string;
  description: string;
  codeTemplate: string;
  expectedOutput: string;
  expectedCode: string;
  requirements: requirement[];
  level: string;
  imageUrl: string;
  publicAccess: boolean;
  isActive: boolean;
  courseId: number;
  userId: number;
  setTaskId: (taskId: number | null) => void;
  setTitle: (newCode: string) => void;
  setDescription: (newOutput: string) => void;
  setCodeTemplate: (newCodeTemplate: string) => void;
  setExpectedOutput: (newExpectedOutput: string) => void;
  setExpectedCode: (newExpectedCode: string) => void;
  setRequirements: (newRequirements: requirement[]) => void;
  setLevel: (newLevel: string) => void;
  setImageUrl: (newImageUrl: string) => void;
  setPublicAccess: (newPublicAccess: boolean) => void;
  setIsActive: (newIsActive: boolean) => void;
  setCourseId: (newCourseId: number) => void;
  setUserId: (newUserId: number) => void;
  postTask: () => Promise<void>;
}

export const useNewTaskStore = create<newTaskState>((set) => ({
  taskId: null,
  title: '',
  description: '',
  codeTemplate: '',
  expectedOutput: '',
  expectedCode: '',
  requirements: [],
  level: '',
  imageUrl: '',
  publicAccess: false,
  isActive: false,
  courseId: 0,
  userId: 0,
  setTaskId: (newTaskId: number | null) => set({ taskId: newTaskId }),
  setTitle: (newTitle: string) => set({ title: newTitle }),
  setDescription: (newDescription: string) => set({ description: newDescription }),
  setCodeTemplate: (newCodeTemplate: string) => set({ codeTemplate: newCodeTemplate }),
  setExpectedOutput: (newExpectedOutput: string) => set({ expectedOutput: newExpectedOutput }),
  setRequirements: (newRequirements: requirement[]) => set({ requirements: newRequirements }),
  setExpectedCode: (newExpectedCode: string) => set({ expectedCode: newExpectedCode }),
  setLevel: (newLevel: string) => set({ level: newLevel }),
  setImageUrl: (newImageUrl: string) => set({ imageUrl: newImageUrl }),
  setPublicAccess: (newPublicAccess: boolean) => set({ publicAccess: newPublicAccess }),
  setIsActive: (newIsActive: boolean) => set({ isActive: newIsActive }),
  setCourseId: (newCourseId: number) => set({ courseId: newCourseId }),
  setUserId: (newUserId: number) => set({ userId: newUserId }),

  postTask: async () => {
    const code = useCodeStore.getState().code;
    const selectedTaskId = useTaskCodeStore.getState().selectedTaskId;

    // must change from localhost to deployed server when server is online
    try {
      const response = await fetch('http://localhost:6001/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, taskId: selectedTaskId }),
      });

      const result = await response.json();
      console.log(result.message);
      /*
      if (result.error) {
        setAIOutput(`Error: ${result.error}`);
        return;
      }

      if (result.message) {
        setAIOutput(result.message);
      }*/
    } catch (error) {
      console.error('Error analyzing code:', error);
    }
  },
}));
