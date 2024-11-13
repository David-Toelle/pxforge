import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  SandpackStack,
  FileTabs,
  useSandpack,
  useActiveCode,
} from "@codesandbox/sandpack-react";

function MonacoEditor({ codeFromDB, onSave }) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  // Track if the code has been initialized with data from the DB
  const [initialized, setInitialized] = useState(false);

  const handleSaveClick = () => {
    onSave(code); // Pass the current code to save
  };  

  // Ensure the code is only updated with `codeFromDB` once
  useEffect(() => {
    if (codeFromDB && !initialized) {
      updateCode(codeFromDB); // Set the initial code from DB
      setInitialized(true); // Mark as initialized to prevent re-running
    }
  }, [codeFromDB, initialized, updateCode]);

  return (
    <SandpackStack style={{ height: "80vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          value={code}
          onChange={(value) => updateCode(value || "")} // Update code on change
        />
      </div>
      <button onClick={handleSaveClick}>Save Component</button>
    </SandpackStack>
  );
}

export default MonacoEditor;
