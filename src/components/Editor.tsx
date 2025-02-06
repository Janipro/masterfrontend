import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

export default function Editor() {
  const [value, setValue] = useState("print(Hello World!)");
  const onChange = useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="300px"
      width="600px"
      extensions={[python()]}
      onChange={onChange}
    />
  );
}
