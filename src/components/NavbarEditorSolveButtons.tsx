import { Button, Box, Typography } from '@mui/material';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import WbIncandescentRoundedIcon from '@mui/icons-material/WbIncandescentRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { NAV_COLORS } from '../types/navColors';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useState } from 'react';

const functions = ['Kjør', 'Hjelp', 'Lever', 'Innsendingshistorikk'];

export default function NavbarEditorSolveButtons() {
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const { executeCode, codeHelp, submitCode } = useTaskCodeStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async (fn: () => Promise<string | void>) => {
    setIsLoading(true);
    try {
      await fn();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: { xs: 0.95, sm: 2, md: 2, lg: 2, xl: 2 },
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          my: 2,
          color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkmodeEditor
            ? NAV_COLORS.editor_button_background_dark
            : NAV_COLORS.editor_button_background,
          borderRadius: 20,
          mx: 0,
          textTransform: 'none',
          height: '50%',
          px: 0,
          minWidth: 'auto',
          width: 'fit-content',
          boxShadow: 2,
        }}
      >
        <Button
          onClick={() => handleButtonClick(executeCode)}
          disabled={isLoading}
          key={functions[0]}
          sx={{
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            mx: 0,
            my: 0,
            textTransform: 'none',
            height: '100%',
            px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'inherit',
                zIndex: 1,
              }}
            />
          )}
          <NavigationRoundedIcon
            sx={{
              mx: 0.2,
              fontSize: 'large',
              transform: 'rotate(90deg)',
              color: '#00D100',
            }}
          />
          <Typography
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            }}
          >
            &nbsp;{functions[0]}
          </Typography>
        </Button>

        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderRadius: 0,
            mx: 0,
            height: '45%',
            padding: 0,
          }}
        >
          <Box
            sx={{
              display: 'block',
              width: '1.5px',
              height: '100%',
              backgroundColor: isDarkmodeEditor ? '#5E5E5E' : '#d7e1ed',
            }}
          ></Box>
        </Box>

        <Button
          onClick={() => handleButtonClick(codeHelp)}
          disabled={isLoading}
          key={functions[1]}
          sx={{
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderRadius: 0,
            mx: 0,
            my: 0,
            textTransform: 'none',
            height: '100%',
            px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'inherit',
                zIndex: 1,
              }}
            />
          )}
          <WbIncandescentRoundedIcon
            sx={{
              mx: 0.2,
              fontSize: 'large',
              transform: 'rotate(180deg)',
              color: '#FDA500',
            }}
          />
          <Typography
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            }}
          >
            &nbsp;{functions[1]}
          </Typography>
        </Button>

        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderRadius: 0,
            mx: 0,
            height: '45%',
            padding: 0,
          }}
        >
          <Box
            sx={{
              display: 'block',
              width: '1.5px',
              height: '100%',
              backgroundColor: isDarkmodeEditor ? '#5E5E5E' : '#d7e1ed',
            }}
          ></Box>
        </Box>

        <Button
          onClick={() => handleButtonClick(submitCode)}
          disabled={isLoading}
          key={functions[2]}
          sx={{
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            mx: 0,
            my: 0,
            textTransform: 'none',
            height: '100%',
            px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'inherit',
                zIndex: 1,
              }}
            />
          )}
          <CloudUploadRoundedIcon
            sx={{
              mx: 0.2,
              fontSize: 'large',
              color: '#00D100',
            }}
          />
          <Typography
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            }}
          >
            &nbsp;{functions[2]}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
