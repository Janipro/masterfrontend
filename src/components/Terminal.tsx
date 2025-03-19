import { Box } from '@mui/material';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useEffect, useRef } from 'react';

interface TerminalProps {
  terminalCollapsed: boolean;
}

export default function Terminal({ terminalCollapsed }: TerminalProps) {
  const { outputHistory } = useTaskCodeStore();
  const terminalRef = useRef<HTMLDivElement | null>(null);

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
        padding: '10px',
        typography: 'body2',
        fontSize: '0.8em',
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
      {outputHistory.length > 0 ? (
        outputHistory.map((line, index) => (
          <pre key={index} style={{ margin: 0 }}>
            {line}
          </pre>
        ))
      ) : (
        <pre style={{ margin: 0 }}>Kjør koden for å se output...</pre>
      )}
    </Box>
  );
}
