import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { indentUnit } from '@codemirror/language';

export default function Editor() {
  const [value, setValue] = useState(`def fortnite():\n    print("9 crowns")`);
  const onChange = useCallback((val: string) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="300px"
      width="600px"
      extensions={[python(), indentUnit.of('    ')]}
      onChange={onChange}
    />
  );
}
