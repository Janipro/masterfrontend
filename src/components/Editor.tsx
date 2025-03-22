import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { highlightSelectionMatches } from '@codemirror/search';
import Box from '@mui/material/Box';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { NAV_COLORS } from '../types/navColors';

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: NAV_COLORS.editor_pane_background,
    color: NAV_COLORS.editor_text,
  },
  '.cm-theme': {
    height: '100%',
  },
  '.cm-content': {
    caretColor: NAV_COLORS.editor_pane_background,
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: NAV_COLORS.editor_text,
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(173, 216, 230, 0.6) !important',
    borderRadius: '3px',
  },
  '.cm-gutters': {
    backgroundColor: NAV_COLORS.editor_pane_background,
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
    color: NAV_COLORS.editor_text,
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

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: NAV_COLORS.editor_pane_background_dark,
    color: NAV_COLORS.editor_text_dark,
  },
  '.cm-theme': {
    height: '100%',
  },
  '.cm-content': {
    caretColor: NAV_COLORS.editor_pane_background_dark,
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: NAV_COLORS.editor_text_dark,
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(150, 150, 150, 0.6) !important',
    borderRadius: '3px',
  },
  '.cm-gutters': {
    backgroundColor: NAV_COLORS.editor_pane_background_dark,
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
    backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: NAV_COLORS.editor_text_dark,
  },
  '.cm-indent-guide': {
    borderLeft: '1px dashed rgba(255, 217, 102, 0.5) !important',
    marginLeft: '4px',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'rgba(107, 107, 107, 0.5) !important',
    borderRadius: '3px',
  },
  '.cm-foldPlaceholder': {
    backgroundColor: NAV_COLORS.editor_button_background_dark,
    border: `1.2px solid ${NAV_COLORS.editor_header_background_dark}`,
  },
});

export default function Editor() {
  const { code, setCode } = useTaskCodeStore();
  const { isDarkmodeEditor } = useDarkmodeEditorStore();

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
        borderRadius: '0 0 10px 10px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: 'calc(100% - 24px) !important',
        '&::-webkit-scrollbar': {
          width: '6px',
          borderRadius: '5px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: isDarkmodeEditor
            ? NAV_COLORS.editor_pane_background_dark
            : NAV_COLORS.editor_pane_background,
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
        theme={isDarkmodeEditor ? darkTheme : lightTheme}
      />
    </Box>
  );
}
