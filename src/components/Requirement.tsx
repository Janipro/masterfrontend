import { Typography } from '@mui/material';
import { borderColorMapping, colorMapping, translation } from '../types/requirementData';

export default function Requirement(text: { value: string; size: string }) {
  return (
    <Typography
      noWrap
      component="div"
      fontSize={text.size}
      sx={{
        boxSizing: 'border-box',
        backgroundColor: text.value in colorMapping ? colorMapping[text.value] : '#EDEBEB',
        border: `${text.value in borderColorMapping ? borderColorMapping[text.value] : '#EDEBEB'} 3px solid`,
        paddingX: '3px',
        paddingY: '0.5px',
        borderRadius: '20px',
        fontWeight: 'medium',
        boxShadow: 3,
      }}
    >
      {text.value in translation ? translation[text.value] : text.value}
    </Typography>
  );
}
