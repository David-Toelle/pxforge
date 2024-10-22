// CodeEditor.jsx
import { LiveEditor } from "react-live";

// eslint-disable-next-line react/prop-types
const CodeEditor = ({ code, setCode }) => {
    console.log("code: ", code);
  return (
    <div className="code-editor">
      {/* Ensure there's always valid JSX being passed */}
      <LiveEditor
        value={
          typeof code === "string"
            ? code
            : "const MyComponent = () => <button>Click me!</button>;"
        }
        onChange={(newCode) => {
          console.log("Updated code: ", newCode);
          setCode(newCode);
        }}
      />
    </div>
  );
};

export default CodeEditor;
