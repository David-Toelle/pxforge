import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "../components/MonacoEditor";
import {
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useFetchComponentByIdQuery,
} from "../componentApi";
import { useParams } from "react-router-dom";
import "../styles/ComponentEditor.css";
import BasicBtn from "../../../components/buttons/BasicBtn/BasicBtn";
import Loading from "../../../components/Loading/Loading";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MySandPack() {
  const { id } = useParams();
  const [createComponent] = useCreateComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();
  const { data: component, isLoading } = useFetchComponentByIdQuery(id, {
    skip: !id,
  });
  const navigate = useNavigate()

  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [codeFromDB, setCodeFromDB] = useState("");

  useEffect(() => {
    if (component) {
      setComponentName(component.name);
      setComponentDescription(component.description);
      setCodeFromDB(component.code);
    }
  }, [component]);

  const onClose = () => {
    navigate("/components/library")
  }

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

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-black">
        <Loading size="60px" color="#3498db" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex-col bg-black p-6">
      <div className="flex justify-start ml-12 mb-1 bg-black rounded-2xl">
        <input
          type="text"
          value={componentName}
          placeholder="Component Name"
          onChange={(e) => setComponentName(e.target.value)}
          className="w-50 h-10 p-4 mr-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
        />
        {/* <Button
          className="w-20 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </Button> */}
        <Button
          className="w-20 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-700"
          onClick={onClose}
        >
          Back
        </Button>
      </div>

      {/* Resizable Panel Group */}
      <div className="flex-1 bg-black rounded-2xl shadow-lg p-6 border border-gray-200 border-opacity-20">
        <SandpackProvider template="react" theme="dark">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={20}>
              <SandpackLayout>
                <MonacoEditor codeFromDB={codeFromDB} onSave={handleSave} />
              </SandpackLayout>
            </ResizablePanel>
            <ResizableHandle className="bg-gray-600 w-2 cursor-col-resize" />
            <ResizablePanel defaultSize={50} minSize={20}>
              <SandpackPreview
                style={{
                  height: "80vh",
                  backgroundColor: "#1e1e1e",
                  borderRadius: "0.5rem",
                }}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </SandpackProvider>
      </div>
    </div>
  );
}
