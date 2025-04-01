export const classTranslations: { [grade: number]: string } = {
  1: '1. klasse',
  2: '2. klasse',
  3: '3. klasse',
  4: '4. klasse',
  5: '5. klasse',
  6: '6. klasse',
  7: '7. klasse',
  8: '8. klasse',
  9: '9. klasse',
  10: '10. klasse',
  11: 'VG1',
  12: 'VG2',
  13: 'VG3',
};

export const courseTranslations: { [course: string]: number } = {
  '1T': 11,
  '1P': 11,
  R1: 12,
  S1: 12,
  R2: 13,
  S2: 13,
  F1: 12,
  F2: 13,
  IT1: 12,
  IT2: 13,
  '2P': 12,
};

type Enum<T> = T[keyof T];

export const typeTranslations = {
  exercise: 'Øving',
  obligatory: 'Obligatorisk',
} as const;
type typeTranslations = Enum<typeof typeTranslations>;

export const requirementTranslations: { [name: string]: string } = {
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
