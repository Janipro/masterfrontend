import { Typography } from '@mui/material';
import { red, orange, green, blue } from '@mui/material/colors';

export default function Requirement(text: { value: string; size: string }) {
  const mapping: { [name: string]: string } = {
    'if-setning': red[400],
    'for-løkke': orange[400],
    'while-løkke': green[400],
    arv: blue[400],
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
