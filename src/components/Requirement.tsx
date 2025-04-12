import { Typography } from '@mui/material';
import { borderColorMapping, colorMapping } from '../types/requirementData';
import { requirementTranslations } from '../types/translations';

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
        paddingX: '4px',
        paddingY: '0.5px',
        borderRadius: '20px',
        fontWeight: 'medium',
        boxShadow: 2,
        textAlign: 'center',
        color: '#000000',
      }}
    >
      {text.value in requirementTranslations ? requirementTranslations[text.value] : text.value}
    </Typography>
  );
}
