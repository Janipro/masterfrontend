import { Typography } from '@mui/material';
import { red, orange, green, blue } from '@mui/material/colors';

export default function Requirement(text: { value: string; size: string }) {
  const colorMapping: { [name: string]: string } = {
    'if-statement': red[400],
    'for-loop': orange[400],
    'while-loop': green[400],
    inheritance: blue[400],
  };

  const translation: { [name: string]: string } = {
    'if-statement': 'if-setning',
    'for-loop': 'for-løkke',
    'while-loop': 'while-løkke',
    inheritance: 'arv',
  };

  return (
    <Typography
      noWrap
      component="div"
      fontSize={text.size}
      sx={{
        backgroundColor: text.value in colorMapping ? colorMapping[text.value] : '#EDEBEB',
        borderRadius: 4,
        paddingTop: 0.25,
        paddingBottom: 0.25,
        paddingRight: 0.75,
        paddingLeft: 0.75,
        m: 0.25,
      }}
    >
      {text.value in translation ? translation[text.value] : text.value}
    </Typography>
  );
}
