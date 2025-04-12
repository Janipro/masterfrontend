import { useCallback, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { highlightSelectionMatches } from '@codemirror/search';
import Box from '@mui/material/Box';
import { useCodeStore, useNewTaskStore, useTaskCodeStore } from '../stores/useTaskCodeStore';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { NAV_COLORS } from '../types/navColors';
import useEditorViewStore from '../stores/useEditorViewStore';
import useOwnerStore from '../stores/useOwnerStore';

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: NAV_COLORS.editor_pane_background,
    color: NAV_COLORS.editor_text,
  },
  '.cm-content': {
    minHeight: '100%',
    caretColor: NAV_COLORS.editor_pane_background,
    '--indent-marker-bg-color': 'rgb(221, 221, 221) !important',
    '--indent-marker-active-bg-color': 'rgb(221, 221, 221) !important',
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
    padding: 0,
    marginLeft: '10px',
    marginRight: '0px',
    maxWidth: '50px',
  },
  '.cm-gutterElement': {
    padding: '0 8px',
    textAlign: 'center',
    minWidth: '30px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
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
  '.cm-content': {
    caretColor: NAV_COLORS.editor_pane_background_dark,
    '--indent-marker-bg-color': 'rgb(107, 107, 107) !important',
    '--indent-marker-active-bg-color': 'rgb(107, 107, 107) !important',
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
    padding: 0,
    marginLeft: '10px',
    marginRight: '0px',
    maxWidth: '50px',
  },
  '.cm-gutterElement': {
    padding: '0 8px',
    textAlign: 'center',
    minWidth: '30px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
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

type TerminalProps = {
  showCode: boolean;
  currentCodeTemplate: string; // TeacherPlaygroundContent sends currentCodeTemplate = '' every time
};

export default function Editor({ showCode, currentCodeTemplate }: TerminalProps) {
  const { code, setCode } = useCodeStore();
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const { selectedTaskId } = useTaskCodeStore();
  const { newCodeTemplate, setNewCodeTemplate } = useNewTaskStore();
  const { isOwner } = useOwnerStore();

  const onChange = useCallback(
    (val: string) => {
      if (!showCode && isOwner && selectedTaskId === null) {
        setNewCodeTemplate(val);
      } else if ((showCode && isOwner && selectedTaskId === null) || !isOwner) {
        setCode(val);
      }
    },
    [setCode, setNewCodeTemplate, showCode, currentCodeTemplate, selectedTaskId, newCodeTemplate, isOwner]
  );

  useEffect(() => {
    if (code === '' && isOwner === false) {
      setCode(currentCodeTemplate);
    }
  }, [currentCodeTemplate, code, setCode, isOwner]);

  return (
    <Box
      sx={{
        minHeight: '60px',
        borderRadius: '0 0 10px 10px',
        height: 'calc(100% - 24px) !important',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          '& .cm-theme': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          '& .cm-editor': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
            borderRadius: '5px',
          },
          '& .cm-scroller': {
            flex: 1,
            overflow: 'auto',
            marginRight: '2px',
            marginBottom: '0.5px',
            marginLeft: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0)',

            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: isDarkmodeEditor
                ? NAV_COLORS.editor_pane_background_dark
                : NAV_COLORS.editor_pane_background,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#B7B7B7',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#9E9E9E',
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: 'rgb(0, 0, 0, 0)',
              borderRadius: '3px',
            },
          },

          '& .cm-content': {
            minHeight: '100%',
          },
        }}
      >
        <CodeMirror
          value={
            showCode
              ? code
              : isOwner
                ? selectedTaskId === null
                  ? newCodeTemplate
                  : newCodeTemplate
                    ? newCodeTemplate
                    : 'Ingen kode tilgjengelig..'
                : currentCodeTemplate
                  ? currentCodeTemplate
                  : 'Ingen kodemal tilgjengelig...'
          }
          height="100%"
          width="100%"
          basicSetup={{ lineNumbers: true }}
          extensions={[
            python(),
            indentationMarkers(),
            indentUnit.of('    '),
            highlightSelectionMatches(),
            EditorView.editable.of(
              showCode
                ? isOwner && selectedTaskId !== null
                  ? false
                  : true
                : isOwner && selectedTaskId === null
                  ? true
                  : false
            ),
          ]}
          onChange={onChange}
          theme={isDarkmodeEditor ? darkTheme : lightTheme}
          onCreateEditor={(view) => {
            useEditorViewStore.getState().setEditorView(view);
          }}
        />
      </Box>
    </Box>
  );
}
