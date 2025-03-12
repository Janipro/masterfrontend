import { Typography } from '@mui/material';

export default function Requirement(text: { value: string; size: string }) {
  const colorMapping: { [name: string]: string } = {
    // kravene er generert av gpt, noen av dem hører ikke til python,
    // men kan byttes ut senere. Alle fargene kan sees i editor:
    'if-statement': '#EA6C6C', // Red
    'for-loop': '#FFA857', // Ligth Orange
    'while-loop': '#6ECFFF', // Dark Sky Blue
    inheritance: '#7CFF6E', // Light Green
    'switch-statement': '#E48AFF', // Pink Purple
    'do-while-loop': '#FFED66', // Light Yellow
    recursion: '#FF69B4', // Bright Pink
    'function-call': '#9cdfff', // Sky Blue
    array: '#A3E76E', // Grass Green
    object: '#ffa36b', // Peach Orange
    class: '#adcaff', // Dull Blue
    'try-catch': '#cd8aff', // Dull Purple
    'variable-declaration': '#ffe957', // Yellow
    'return-statement': '#71de5f', // Strong Green
    pointer: '#ff9494', // Dull Red
    operator: '#61aeff', // Medium Blue
    'lambda-function': '#FC9B3F', // Strong Orange
    struct: '#7feb82', // Lush Green
    'exception-handling': '#ff7569', // Dull Red
    promise: '#b09cff', // Indigo
    callback: '#ff94e5', // Strong Bright Pink
    'bitwise-operation': '#79e8d5', // Teal
    thread: '#f590ad', // Dull Pink Red
    enum: '#d67cf7', // Strong Purple
  };

  const borderColorMapping: { [name: string]: string } = {
    'if-statement': '#EC3939',
    'for-loop': '#FC9B3F',
    'while-loop': '#6ABCF2',
    inheritance: '#53EC67',
    'switch-statement': '#C66CFC',
    'do-while-loop': '#ffd53b',
    recursion: '#d94c80',
    'function-call': '#73c7f0',
    array: '#84d450',
    object: '#ff8940',
    class: '#8ba9e0',
    'try-catch': '#aa6cd9',
    'variable-declaration': '#f0d941',
    'return-statement': '#48d132',
    pointer: '#e06e6e',
    operator: '#478be6',
    'lambda-function': '#e37e34',
    struct: '#64d964',
    'exception-handling': '#D1584B',
    promise: '#906ceb',
    callback: '#ed6bcd',
    'bitwise-operation': '#53c9b5',
    thread: '#d16685',
    enum: '#b85dd9',
  };

  const translation: { [name: string]: string } = {
    'if-statement': 'if-setning',
    'for-loop': 'for-løkke',
    'while-loop': 'while-løkke',
    inheritance: 'arv',
    'switch-statement': 'switch-setning',
    'do-while-loop': 'do-while-løkke',
    recursion: 'rekursjon',
    'function-call': 'funksjonskall',
    array: 'array',
    object: 'objekt',
    class: 'klasse',
    'try-catch': 'try-catch-blokk',
    'variable-declaration': 'variabeldeklarasjon',
    'return-statement': 'return-setning',
    pointer: 'peker',
    operator: 'operator',
    'lambda-function': 'lambda-funksjon',
    struct: 'struktur',
    'exception-handling': 'unntakshåndtering',
    promise: 'løfte',
    callback: 'tilbakekall',
    'bitwise-operation': 'bitvis operasjon',
    thread: 'tråd',
    enum: 'enum',
  };

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
