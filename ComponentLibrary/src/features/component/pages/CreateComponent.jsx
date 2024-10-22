import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sandpack } from "@codesandbox/sandpack-react";
import {
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useFetchComponentByIdQuery,
  useFetchComponentsQuery,
} from "../componentApi";
import { clearCurrentComponent } from "../componentSlice";

const ComponentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = !!id;
  const { data: component, isLoading } = useFetchComponentByIdQuery(id, {
    skip: !isEditing,
  });

  const { refetch } = useFetchComponentsQuery();

  const [createComponent] = useCreateComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (isEditing && component) {
      setName(component.name);
      setDescription(component.description);
      setCode(component.code); // Set the existing component code when editing
    } else {
      dispatch(clearCurrentComponent()); // Clear when creating a new component
      setCode(""); // Make sure code is empty for new components
    }
  }, [id, isEditing, component, dispatch]);

  const handleSave = async () => {
    const componentData = { name, description, code }; // Send the updated code

    try {
      if (isEditing) {
        console.log("componentdata: ", componentData);
        await updateComponent({ id, ...componentData }).unwrap();
        refetch();
      } else {
        await createComponent(componentData).unwrap();
        refetch(); // Refetch components after saving a new one
      }
      navigate("/components/library");
    } catch (error) {
      console.error("Error saving component:", error);
      alert("Failed to save component");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCodeChange = (newCode) => {
    setCode(newCode); // Updates the code state with the new value
  };

  return (
    <div>
      <h1>{isEditing ? "Edit Component" : "Create a New Component"}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Component Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Component Description"
      />
      <Sandpack
        template="react"
        theme="dark"
        files={{
          "/App.js": {
            code: code, // Use the correct code from the state
          },
        }}
        options={{
          showLineNumbers: true,
          showTabs: true,
        }}
        onCodeChange={() => handleCodeChange} // Ensure code changes are reflected
      />
      <button onClick={handleSave}>
        {isEditing ? "Update Component" : "Add to Library"}
      </button>
    </div>
  );
};

export default ComponentEditor;
