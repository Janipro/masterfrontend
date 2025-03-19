import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { highlightSelectionMatches } from '@codemirror/search';
import Box from '@mui/material/Box';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  '.cm-theme': {
    height: '100%',
  },
  '.cm-content': {
    caretColor: '#ffffff',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#000000',
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(173, 216, 230, 0.6) !important',
    borderRadius: '3px',
  },
  '.cm-gutters': {
    backgroundColor: '#ffffff',
    color: '#9A9A9A',
    border: 'none',
    padding: '0 10px',
  },
  '.cm-gutterElement': {
    padding: '0 8px',
    textAlign: 'center',
    minWidth: '30px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: 'black',
  },
  '.cm-indent-guide': {
    borderLeft: '1px dashed rgba(255, 217, 102, 0.5) !important',
    marginLeft: '4px',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'rgba(200, 230, 255, 0.4) !important',
    borderRadius: '3px',
  },
});

export default function Editor() {
  const { code, setCode } = useTaskCodeStore();

  const onChange = useCallback(
    (val: string) => {
      setCode(val);
    },
    [setCode]
  );

  return (
    <Box
      sx={{
        minHeight: '60px',
        marginRight: '2px',
        borderRadius: '0 0 10px 10px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: 'calc(100% - 24px) !important',
        '&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '5px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#ffffff',
          borderRadius: '0 0 3px 0',
          marginTop: '1.5px',
          marginBottom: '1.5px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#B7B7B7',
          borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#9E9E9E',
        },
      }}
    >
      <CodeMirror
        value={code}
        height="100%"
        width="100%"
        basicSetup={{ lineNumbers: true }}
        extensions={[python(), indentUnit.of('    '), EditorView.lineWrapping, highlightSelectionMatches()]}
        onChange={onChange}
        theme={lightTheme}
      />
    </Box>
  );
}
