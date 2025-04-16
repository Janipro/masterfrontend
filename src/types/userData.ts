import { GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from '../components/renderRequirement';

export const rows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-løkke', 'if-setning'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    assigned: '8AB',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-løkke'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    assigned: 'R1',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-løkke', 'while-løkke'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
    assigned: 'R2',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
    assigned: '8CD',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-setning', 'while-løkke'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    assigned: '10EF',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-løkke', 'if-setning'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    assigned: '1T',
  },
];

export const rows2 = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-løkke', 'if-setning'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-løkke'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-løkke', 'while-løkke'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-setning', 'while-løkke'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-løkke', 'if-setning'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 7,
    title: 'Peter Cooner',
    requirement: ['while-løkke', 'if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 8,
    title: 'Sexy Sigma',
    requirement: ['if-setning'],
    level: '10',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
];

export const rows3 = [
  {
    id: 1,
    title: 'Petter Banh Cuon',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 2,
    title: 'Petter Kjaken',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 3,
    title: 'Petter Ballestad',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 4,
    title: 'Petter Rizzler',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 5,
    title: 'Petter Dass',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 6,
    title: 'Petter Slalom',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 7,
    title: 'Petter Mammasønn',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 8,
    title: 'Petter Rambølseter',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
];

export const columns: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 280 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (_, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 340,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'difficulty', headerName: 'Vanskelighetsgrad', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  /*{ field: 'due', headerName: 'Frist', width: 160 },*/
];

export const columns2: GridColDef[] = [
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 300 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (_, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 340,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 80 },
  { field: 'difficulty', headerName: 'Vanskelighetsgrad', width: 100 },
  { field: 'owner', headerName: 'Laget av', width: 200 },
];

export const columns3: GridColDef[] = [
  { field: 'title', headerName: 'Elev', width: 240 },
  { field: 'level', headerName: 'Trinn', width: 60 },
  { field: 'class', headerName: 'Klasse', width: 60 },
  { field: 'school', headerName: 'Skole', width: 200 },
];

export const columns4: GridColDef[] = [
  { field: 'title', headerName: 'Undervisningsgruppe', width: 240 },
  { field: 'level', headerName: 'Trinn', width: 60 },
  { field: 'class', headerName: 'Fag', width: 60 },
  { field: 'school', headerName: 'Skole', width: 200 },
];

export const columns5: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 280 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (_, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 340,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'difficulty', headerName: 'Vanskelighetsgrad', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'due', headerName: 'Frist', width: 160 },
];
