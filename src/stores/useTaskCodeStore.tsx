import { create } from 'zustand';

interface CodeState {
  code: string;
  outputHistory: string[];
  selectedTaskId: number | null;
  setCode: (newCode: string) => void;
  setOutput: (newOutput: string) => void;
  setTask: (taskId: number) => Promise<void>;
  executeCode: () => Promise<void>;
}

export const useTaskCodeStore = create<CodeState>((set, get) => ({
  code: '',
  outputHistory: [],
  selectedTaskId: null,

  setCode: (newCode) => set({ code: newCode }),

  setOutput: (newOutput: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      outputHistory: [...state.outputHistory, `(${timestamp})`, newOutput.trim(), '--------------------------'],
    }));
  },

  // must set task, fetch & set previous code belonging to new task
  setTask: async (taskId) => set({ selectedTaskId: taskId }),

  executeCode: async () => {
    const { code, setOutput } = get();

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

      if (result.output) {
        setOutput(result.output);
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code');
    }
  },
}));
