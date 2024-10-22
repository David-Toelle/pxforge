import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "./MonacoEditor";
import {
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useFetchComponentByIdQuery,
} from "../componentApi";
import { useParams } from "react-router-dom";
import "../styles/ComponentEditor.css"

export default function MySandPack() {
  const { id } = useParams();
  const [createComponent] = useCreateComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();
  const { data: component, isLoading } = useFetchComponentByIdQuery(id, {
    skip: !id,
  });

  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [codeFromDB, setCodeFromDB] = useState("");

  useEffect(() => {
    if (component) {
      setComponentName(component.name);
      setComponentDescription(component.description);
      setCodeFromDB(component.code); // Set the initial code only once
    }
  }, [component]); // Ensure this only triggers when `component` changes

  const handleSave = async (code) => {
    const componentData = {
      name: componentName,
      description: componentDescription,
      code,
    };
    try {
      if (id) {
        await updateComponent({ id, ...componentData }).unwrap();
        alert("Component updated successfully!");
      } else {
        await createComponent(componentData).unwrap();
        alert("Component created successfully!");
      }
    } catch (error) {
      console.error("Error saving component", error);
      alert("Failed to save component");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <SandpackProvider template="react" theme="dark">
      <SandpackLayout>
        <div className="component-info">
          <input
            type="text"
            value={componentName}
            placeholder="Component Name"
            onChange={(e) => setComponentName(e.target.value)}
          />
          <textarea
            value={componentDescription}
            placeholder="Component Description"
            onChange={(e) => setComponentDescription(e.target.value)}
          />
        </div>
        <MonacoEditor codeFromDB={codeFromDB} onSave={handleSave} />
        <SandpackPreview style={{ height: "80vh" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
