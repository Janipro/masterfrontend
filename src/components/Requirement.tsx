import { Typography } from '@mui/material';
import { red, orange, green, blue } from '@mui/material/colors';

export default function Requirement(text: { value: string; size: string }) {
  const mapping: { [name: string]: string } = {
    'if-statement': red[400],
    'for-loop': orange[400],
    'while-loop': green[400],
    inheritance: blue[400],
  };

  return (
    <Typography
      noWrap
      component="div"
      fontSize={text.size}
      sx={{
        backgroundColor: text.value in mapping ? mapping[text.value] : '#EDEBEB',
        borderRadius: 2,
        padding: 0.25,
        m: 0.25,
      }}
    >
      {text.value}
    </Typography>
  );
}
