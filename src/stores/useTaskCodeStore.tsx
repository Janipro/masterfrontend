import { create } from 'zustand';

interface CodeState {
  code: string;
  outputHistory: string[];
  selectedTaskId: number | null;
  setCode: (newCode: string) => void;
  setOutput: (newOutput: string) => void;
  setAIOutput: (newAIOutput: string) => void;
  setTask: (taskId: number) => Promise<void>;
  executeCode: () => Promise<void>;
  codeHelp: () => Promise<void>;
}

export const useTaskCodeStore = create<CodeState>((set, get) => ({
  code: '',
  outputHistory: [],
  selectedTaskId: null,

  setCode: (newCode) => set({ code: newCode }),

  setOutput: (newOutput: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      outputHistory: [...state.outputHistory, `(${timestamp})\n${newOutput.trim()}\n--------------------------`],
    }));
  },

  setAIOutput: (newAIOutput: string) => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      outputHistory: [
        ...state.outputHistory,
        `(${timestamp})\nAI-assistent: ${newAIOutput.trim()}\n--------------------------`,
      ],
    }));
  },

  // must set task, fetch & set previous code belonging to new task
  // also, if no previous code by user, set code to the tasks code template
  // also create a variable and set to code template for the "view template tab"
  setTask: async (taskId) => set({ selectedTaskId: taskId }),

  // must send id of current task as well
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
    const { code, setAIOutput } = get();

    // must change from localhost to deployed server when server is online
    try {
      const response = await fetch('http://localhost:6001/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
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
