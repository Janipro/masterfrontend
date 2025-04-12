import { Box } from '@mui/material';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useEffect, useRef } from 'react';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { NAV_COLORS } from '../types/navColors';

interface TerminalProps {
  terminalCollapsed: boolean;
}

export default function Terminal({ terminalCollapsed }: TerminalProps) {
  const { outputHistory } = useTaskCodeStore();
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const { isDarkmodeEditor } = useDarkmodeEditorStore();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputHistory]);

  if (terminalCollapsed) return null;

  return (
    <Box
      ref={terminalRef}
      sx={{
        lineBreak: 'anywhere',
        padding: '10px',
        typography: 'body2',
        fontSize: '0.8em',
        marginRight: '2px',
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
      {outputHistory.length > 0 ? (
        outputHistory.map((line, index) => (
          <pre key={index} style={{ margin: 0, textWrap: 'wrap' }}>
            {line}
          </pre>
        ))
      ) : (
        <pre style={{ margin: 0, textWrap: 'wrap' }}>Kjør koden for å se output...</pre>
      )}
    </Box>
  );
}
