import { useState, useRef, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodeIcon from '../../assets/code.svg?react';
import TerminalIcon from '../../assets/terminal.svg?react';
import DescriptionIcon from '../../assets/description.svg?react';
import WbIncandescentRoundedIcon from '@mui/icons-material/WbIncandescentRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import Editor from '../Editor';
import { Container, CssBaseline, Grid2, IconButton, useTheme } from '@mui/material';
import { NAV_COLORS } from '../../types/navColors';
import Requirement from '../Requirement';
import Terminal from '../Terminal';
import useDarkmodeEditorStore from '../../stores/useDarkmodeEditorStore';

export default function TeacherPlayGroundContent() {
  const theme = useTheme();
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const [showCode, setShowCode] = useState(true);
  const [terminalCollapsed, setTerminalCollapsed] = useState(() => {
    return localStorage.getItem('terminalCollapsed') === 'true';
  });
  const [taskCollapsed, setTaskCollapsed] = useState(() => {
    return localStorage.getItem('taskCollapsed') === 'true';
  });
  const [leftWidth, setLeftWidth] = useState(() => {
    return parseInt(localStorage.getItem('leftWidth') || '500', 10);
  });
  const [topRightHeight, setTopRightHeight] = useState(() => {
    return parseInt(localStorage.getItem('rightTopHeight') || '500', 10);
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const rightTopPaneRef = useRef<HTMLDivElement | null>(null);
  const rightBottomPaneRef = useRef<HTMLDivElement | null>(null);
  const isResizingVertical = useRef(false);
  const isResizingHorizontal = useRef(false);

  const taskDescription: string[] = ['VG1', 'Matematikk', 'Giga Elise'];
  const programmingConstructs = [
    'if-statement',
    'for-loop',
    'while-loop',
    'inheritance',
    'switch-statement',
    'do-while-loop',
    'recursion',
    'function-call',
    'array',
    'object',
    'class',
    'try-catch',
    'variable-declaration',
    'return-statement',
    'pointer',
    'operator',
    'lambda-function',
    'struct',
    'exception-handling',
    'promise',
    'callback',
    'bitwise-operation',
    'thread',
    'enum',
  ];

  const disableInteractions = useCallback(() => {
    if (leftPaneRef.current) {
      leftPaneRef.current.style.pointerEvents = 'none';
      leftPaneRef.current.style.userSelect = 'none';
    }
    if (rightTopPaneRef.current) {
      rightTopPaneRef.current.style.pointerEvents = 'none';
      rightTopPaneRef.current.style.userSelect = 'none';
    }
    if (rightBottomPaneRef.current) {
      rightBottomPaneRef.current.style.pointerEvents = 'none';
      rightBottomPaneRef.current.style.userSelect = 'none';
    }
  }, []);

  const enableInteractions = useCallback(() => {
    if (leftPaneRef.current) {
      leftPaneRef.current.style.pointerEvents = 'auto';
      leftPaneRef.current.style.userSelect = 'auto';
    }
    if (rightTopPaneRef.current) {
      rightTopPaneRef.current.style.pointerEvents = 'auto';
      rightTopPaneRef.current.style.userSelect = 'auto';
    }
    if (rightBottomPaneRef.current) {
      rightBottomPaneRef.current.style.pointerEvents = 'auto';
      rightBottomPaneRef.current.style.userSelect = 'auto';
    }
  }, []);

  const handleMouseMoveVertical = useCallback((e: MouseEvent) => {
    if (isResizingVertical.current && containerRef.current) {
      requestAnimationFrame(() => {
        const newWidth = e.clientX;
        if (newWidth > 200 && newWidth < window.innerWidth - 265) {
          containerRef.current!.style.setProperty('--left-width', `${newWidth - 2}px`);
        }
      });
    }
  }, []);

  const handleMouseMoveHorizontal = useCallback((e: MouseEvent) => {
    if (isResizingHorizontal.current && containerRef.current) {
      requestAnimationFrame(() => {
        const newHeight = e.clientY;
        if (newHeight > 160 && newHeight < window.innerHeight - 100) {
          let finalHeight = newHeight - 80;
          if (finalHeight < 82) {
            finalHeight = 82;
          }
          containerRef.current!.style.setProperty('--top-right-height', `${finalHeight}px`);
        }
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingVertical.current = false;
    isResizingHorizontal.current = false;
    enableInteractions();
    document.removeEventListener('mousemove', handleMouseMoveVertical);
    document.removeEventListener('mousemove', handleMouseMoveHorizontal);
    document.removeEventListener('mouseup', handleMouseUp);

    if (containerRef.current) {
      const leftWidth = parseInt(getComputedStyle(containerRef.current).getPropertyValue('--left-width'));
      setLeftWidth(leftWidth);
      const rightTopHeight = parseInt(getComputedStyle(containerRef.current).getPropertyValue('--top-right-height'));
      setTopRightHeight(rightTopHeight);

      console.log('save both');
      localStorage.setItem('leftWidth', leftWidth.toString());
      localStorage.setItem('rightTopHeight', rightTopHeight.toString());
    }
  }, [enableInteractions, handleMouseMoveVertical, handleMouseMoveHorizontal]);

  useEffect(() => {
    if (isDarkmodeEditor) {
      document.body.style.backgroundColor = NAV_COLORS.editor_background_dark;
    } else {
      document.body.style.backgroundColor = NAV_COLORS.editor_background;
    }

    return () => {
      document.body.style.removeProperty('background-color');
    };
  }, [isDarkmodeEditor]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveVertical);
      document.removeEventListener('mousemove', handleMouseMoveHorizontal);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMoveVertical, handleMouseMoveHorizontal, handleMouseUp]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !leftPaneRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const computedHeight = parseInt(
        getComputedStyle(containerRef.current).getPropertyValue('--top-right-height'),
        10
      );

      if (isNaN(computedHeight)) return;
      if (computedHeight > containerHeight - 108 && containerHeight - 108 >= 82) {
        const newHeight = containerHeight - 108;
        setTopRightHeight(newHeight);
        containerRef.current.style.setProperty('--top-right-height', `${newHeight}px`);
      } else if (computedHeight < 82 || computedHeight > containerHeight - 108) {
        const newHeight = 84;
        setTopRightHeight(newHeight);
        containerRef.current.style.setProperty('--top-right-height', `${newHeight}px`);
      }
    });

    if (leftPaneRef.current) {
      observer.observe(leftPaneRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !leftPaneRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const computedWidth = parseInt(getComputedStyle(containerRef.current).getPropertyValue('--left-width'), 10);

      if (isNaN(computedWidth)) return;
      if (computedWidth > containerWidth - 268 && containerWidth - 268 >= 82) {
        const newWidth = containerWidth - 268;
        setLeftWidth(newWidth);
        containerRef.current.style.setProperty('--left-width', `${newWidth}px`);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseDownVertical = () => {
    isResizingVertical.current = true;
    disableInteractions();
    document.addEventListener('mousemove', handleMouseMoveVertical);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDownHorizontal = () => {
    isResizingHorizontal.current = true;
    disableInteractions();
    document.addEventListener('mousemove', handleMouseMoveHorizontal);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTerminalCollapse = () => {
    setTerminalCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem('terminalCollapsed', newValue.toString());
      return newValue;
    });
  };

  const handleTaskCollapse = () => {
    setTaskCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem('taskCollapsed', newValue.toString());
      return newValue;
    });
  };

  const handleShowCode = () => {
    setShowCode(true);
  };

  const handleShowTemplate = () => {
    setShowCode(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
        display: 'flex',
        marginTop: '60px',
        width: '100vw',
        height: 'calc(100vh - 73px)',
        minHeight: '190px',
        '--left-width': `${leftWidth}px`,
        '--top-right-height': `${topRightHeight}px`,
        ...theme.mixins.toolbar,
      }}
    >
      {/* Left Pane */}
      <Box
        sx={{
          flexShrink: 0,
          minHeight: '190px',
          minWidth: taskCollapsed ? null : '222px',
          width: taskCollapsed ? '43.5px' : 'var(--left-width)',
        }}
      >
        <CssBaseline />
        <Container
          component={'main'}
          maxWidth={false}
          sx={{
            bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : NAV_COLORS.editor_pane_background,
            padding: '5px 7px 7px 14px !important',
            height: '100%',
            minHeight: '190.5px',
          }}
        >
          <Grid2
            component="div"
            ref={leftPaneRef}
            sx={{
              height: '100%',
              flexShrink: 0,
              textAlign: 'left',
              bgcolor: isDarkmodeEditor ? 'NAV_COLORS.editor_pane_background_dark' : NAV_COLORS.editor_pane_background,
              pointerEvents: 'auto',
              userSelect: 'auto',
            }}
          >
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: '3px',
                height: '100%',
                width: '100%',
                position: 'relative',
                borderTopRightRadius: '5px',
                borderTopLeftRadius: '5px',
                backgroundColor: isDarkmodeEditor
                  ? taskCollapsed
                    ? NAV_COLORS.editor_header_background_dark
                    : NAV_COLORS.editor_pane_background_dark
                  : taskCollapsed
                    ? NAV_COLORS.editor_header_background
                    : NAV_COLORS.editor_pane_background,
              }}
            >
              <Grid2
                container
                display={'flex'}
                flexDirection={'row'}
                justifyContent={taskCollapsed ? 'center' : 'space-between'}
                gap={0.5}
                bgcolor={
                  isDarkmodeEditor ? NAV_COLORS.editor_header_background_dark : NAV_COLORS.editor_header_background
                }
                alignItems="center"
                borderRadius="5px 5px 0 0"
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {taskCollapsed ? (
                    <DescriptionIcon
                      color="#218DFF"
                      width="1.1em"
                      height="1.1em"
                      style={{ marginLeft: '0em', marginRight: '0em', marginTop: '5px' }}
                    />
                  ) : (
                    <>
                      <DescriptionIcon
                        color="#218DFF"
                        width="1.1em"
                        height="1.1em"
                        style={{ marginLeft: '0.4em', marginRight: '0.2em' }}
                      />
                      <Box sx={{ userSelect: 'none', fontWeight: 550, typography: 'subtitle2', fontSize: '0.95em' }}>
                        Oppgavebeskrivelse
                      </Box>
                    </>
                  )}
                </Box>

                <IconButton onClick={handleTaskCollapse} sx={{ padding: 0, mx: 0.4 }}>
                  <ExpandLessRoundedIcon
                    sx={{
                      fontSize: '0.95em',
                      transform: taskCollapsed ? 'rotate(180deg)' : null,
                      color: isDarkmodeEditor
                        ? NAV_COLORS.editor_icon_expand_background_dark
                        : NAV_COLORS.editor_icon_expand_background,
                    }}
                  />
                </IconButton>
              </Grid2>
              {taskCollapsed ? null : (
                <Box
                  sx={{
                    padding: '20px',
                    gap: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100% - 24px)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginRight: '2px',
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
                  <Box sx={{ typography: 'h3', fontWeight: 'medium', fontSize: '2em' }}>Oppgave X</Box>
                  <Box
                    sx={{
                      typography: 'body2',
                      display: 'flex',
                      width: '100%',
                      flexWrap: 'wrap',
                      alignContent: 'normal',
                      justifyContent: 'left',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'black',
                    }}
                  >
                    {programmingConstructs.map((item) => (
                      <Requirement key={item} value={item} size="small" />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      typography: 'body2',
                      fontWeight: '600',
                      display: 'flex',
                      width: '100%',
                      flexWrap: 'wrap',
                      gap: '20px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      Nivå:&nbsp;<Box sx={{ fontWeight: 'medium' }}>{taskDescription[0]}</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      Fag:&nbsp;<Box sx={{ fontWeight: 'medium' }}>{taskDescription[1]}</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      Lærer:&nbsp;<Box sx={{ fontWeight: 'medium' }}>{taskDescription[2]}</Box>
                    </Box>
                  </Box>
                  <Box sx={{ typography: 'body2' }}>
                    LÆRERMODUS: Lag en funksjon, enterWords, som har ingen innparametre, og returnerer ei liste,
                    wordList, med ord som brukeren selv har skrevet inn. Brukeren kan avslutte innskriving av ord ved å
                    trykke enter ...
                  </Box>
                </Box>
              )}
            </Box>
          </Grid2>
        </Container>
      </Box>

      {/* Vertical Resizer */}
      {!taskCollapsed && (
        <Box
          sx={{
            width: '5px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : NAV_COLORS.editor_background,
            minHeight: '150px',
          }}
        >
          <Box
            sx={{
              cursor: 'col-resize',
              width: '100%',
              height: '120px',
              borderRadius: '20px',
              backgroundColor: isDarkmodeEditor ? '#6D6D6D' : '#B7B7B7',
              userSelect: 'none',
              ':hover': {
                backgroundColor: isDarkmodeEditor ? '#545454' : '#9E9E9E',
              },
            }}
            onMouseDown={handleMouseDownVertical}
          />
        </Box>
      )}

      {/* Right Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '150px', minWidth: '208px' }}>
        {/* Top Right Pane */}
        <Box>
          <CssBaseline />
          <Container
            component={'main'}
            maxWidth={false}
            sx={{
              bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : NAV_COLORS.editor_pane_background,
              padding: '5px 13px 7px 7px !important',
            }}
          >
            <Grid2
              component="div"
              ref={rightTopPaneRef}
              sx={{
                borderRadius: '5px',
                height: terminalCollapsed ? `calc(100vh - 122px)` : 'var(--top-right-height)',
                minHeight: terminalCollapsed ? '142px' : null,
                flexShrink: 0,
                textAlign: 'left',
                bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_pane_background_dark : NAV_COLORS.editor_pane_background,
                pointerEvents: 'auto',
                userSelect: 'auto',
              }}
            >
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: '3px',
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  borderTopRightRadius: '5px',
                  borderTopLeftRadius: '5px',
                }}
              >
                <Grid2
                  container
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  gap={0.5}
                  bgcolor={
                    isDarkmodeEditor ? NAV_COLORS.editor_header_background_dark : NAV_COLORS.editor_header_background
                  }
                  alignItems="center"
                  borderRadius="5px 5px 0 0"
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CodeIcon
                      color="#00D100"
                      width="1.35em"
                      height="1.35em"
                      style={{ marginLeft: '0.4em', marginRight: '0.2em' }}
                    />
                    <Typography sx={{ fontWeight: 'medium', userSelect: 'none', fontSize: '0.95em' }}>
                      Python Kode
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography
                      onClick={handleShowTemplate}
                      sx={{
                        textAlign: 'center',
                        minWidth: '59.4px',
                        fontWeight: 'medium',
                        fontSize: '0.75em',
                        margin: 0,
                        paddingX: '3.6px',
                        paddingY: '2.4px',
                        cursor: showCode ? 'pointer' : null,
                        userSelect: 'none',
                        borderRadius: '2px 0 0 0',
                        backgroundColor: isDarkmodeEditor
                          ? showCode
                            ? NAV_COLORS.editor_button_template_unselected_backgroundcolor_dark
                            : NAV_COLORS.editor_button_template_selected_backgroundcolor_dark
                          : showCode
                            ? NAV_COLORS.editor_button_template_unselected_backgroundcolor
                            : NAV_COLORS.editor_button_template_selected_backgroundcolor,
                        color: isDarkmodeEditor
                          ? showCode
                            ? NAV_COLORS.editor_button_template_unselected_color_dark
                            : NAV_COLORS.editor_button_template_selected_color_dark
                          : showCode
                            ? NAV_COLORS.editor_button_template_unselected_color
                            : NAV_COLORS.editor_button_template_selected_color,
                        '&:hover': {
                          backgroundColor: isDarkmodeEditor
                            ? showCode
                              ? NAV_COLORS.editor_button_template_hover_dark
                              : null
                            : showCode
                              ? NAV_COLORS.editor_button_template_hover
                              : null,
                        },
                      }}
                    >
                      Kodemal
                    </Typography>
                    <Typography
                      onClick={handleShowCode}
                      sx={{
                        textAlign: 'center',
                        minWidth: '59.4px',
                        fontWeight: 'medium',
                        fontSize: '0.75em',
                        margin: 0,
                        paddingX: '3.6px',
                        paddingY: '2.4px',
                        cursor: showCode ? null : 'pointer',
                        userSelect: 'none',
                        borderRadius: 'o 5px 0 0',
                        backgroundColor: isDarkmodeEditor
                          ? showCode
                            ? NAV_COLORS.editor_button_template_selected_backgroundcolor_dark
                            : NAV_COLORS.editor_button_template_unselected_backgroundcolor_dark
                          : showCode
                            ? NAV_COLORS.editor_pane_background
                            : NAV_COLORS.editor_button_template_unselected_backgroundcolor,
                        color: isDarkmodeEditor
                          ? showCode
                            ? NAV_COLORS.editor_button_template_selected_color_dark
                            : NAV_COLORS.editor_button_template_unselected_color_dark
                          : showCode
                            ? NAV_COLORS.editor_button_template_selected_color
                            : NAV_COLORS.editor_button_template_unselected_color,
                        '&:hover': {
                          backgroundColor: isDarkmodeEditor
                            ? showCode
                              ? null
                              : NAV_COLORS.editor_button_template_hover_dark
                            : showCode
                              ? null
                              : NAV_COLORS.editor_button_template_hover,
                        },
                      }}
                    >
                      Editor
                    </Typography>
                  </Box>
                </Grid2>
                <Editor showCode={showCode} />
              </Box>
            </Grid2>
          </Container>
        </Box>

        {/* Horizontal Resizer */}
        {!terminalCollapsed && (
          <Box
            sx={{
              height: '5px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : NAV_COLORS.editor_background,
            }}
          >
            <Box
              sx={{
                cursor: 'row-resize',
                height: '100%',
                width: '120px',
                borderRadius: '20px',
                backgroundColor: isDarkmodeEditor ? '#6D6D6D' : '#B7B7B7',
                userSelect: 'none',
                ':hover': {
                  backgroundColor: isDarkmodeEditor ? '#545454' : '#9E9E9E',
                },
              }}
              onMouseDown={handleMouseDownHorizontal}
            />
          </Box>
        )}

        {/* Bottom Right Pane */}
        <Box sx={{ flex: 1, overflowY: 'auto', minHeight: terminalCollapsed ? '37px' : '89.5px' }}>
          <CssBaseline />
          <Container
            component={'main'}
            maxWidth={false}
            sx={{
              bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : NAV_COLORS.editor_pane_background,
              padding: '7px 13px 7px 7px !important',
              height: '100%',
            }}
          >
            <Grid2
              component="div"
              ref={rightBottomPaneRef}
              sx={{
                borderRadius: '5px',
                height: terminalCollapsed ? '23px' : '100%',
                flexShrink: 0,
                textAlign: 'left',
                bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_pane_background_dark : NAV_COLORS.editor_pane_background,
                pointerEvents: 'auto',
                userSelect: 'auto',
              }}
            >
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: '3px',
                  height: terminalCollapsed ? null : '100%',
                  width: '100%',
                  position: 'relative',
                  borderTopRightRadius: '5px',
                  borderTopLeftRadius: '5px',
                }}
              >
                <Grid2
                  container
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  gap={0.5}
                  bgcolor={
                    isDarkmodeEditor ? NAV_COLORS.editor_header_background_dark : NAV_COLORS.editor_header_background
                  }
                  alignItems="center"
                  borderRadius={terminalCollapsed ? '5px' : '5px 5px 0 0'}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TerminalIcon
                      color="#00D100"
                      width="1.1em"
                      height="1.3em"
                      style={{ marginLeft: '0.45em', marginRight: '0.2em' }}
                    />
                    <Typography sx={{ fontWeight: 'medium', userSelect: 'none', fontSize: '0.95em' }}>
                      Terminal
                    </Typography>
                    <Box
                      sx={{
                        display: 'block',
                        width: '1.5px',
                        height: '13px',
                        backgroundColor: isDarkmodeEditor ? '#5E5E5E' : '#d7e1ed',
                        marginLeft: '0.2em',
                      }}
                    ></Box>
                    <WbIncandescentRoundedIcon
                      sx={{
                        marginLeft: 0.4,
                        marginRight: 0.2,
                        fontSize: 'large',
                        transform: 'rotate(180deg)',
                        color: '#FDA500',
                      }}
                    />
                    <Typography sx={{ fontWeight: 'medium', userSelect: 'none', fontSize: '0.95em' }}>Hjelp</Typography>
                  </Box>

                  <IconButton onClick={handleTerminalCollapse} sx={{ padding: 0, mx: 0.4 }}>
                    <ExpandLessRoundedIcon
                      sx={{
                        fontSize: '0.95em',
                        transform: terminalCollapsed ? 'rotate(180deg)' : null,
                        color: isDarkmodeEditor
                          ? NAV_COLORS.editor_icon_expand_background_dark
                          : NAV_COLORS.editor_icon_expand_background,
                      }}
                    />
                  </IconButton>
                </Grid2>
                <Terminal terminalCollapsed={terminalCollapsed} />
              </Box>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
