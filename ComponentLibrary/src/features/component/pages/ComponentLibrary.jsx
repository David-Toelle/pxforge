import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchComponentsQuery } from "../componentApi";
import { Packages } from "../components/Packages";
import { Components } from "../components/Components";
const ComponentLibrary = () => {
  const navigate = useNavigate();
  const {
    data: components = [],
    isLoading,
    isError,
  } = useFetchComponentsQuery();

  const handleEdit = (component) => {
    navigate(`/components/${component.id}/edit`);
  };

  const handleNewComponent = () => {
    navigate(`/components/new`);
  };

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading components</div>
    );
  }

  return (
    <div className="relative max-h-screen min-h-screen overflow-hidden flex justify-center bg-black p-6">
      <Components
        components={components}
        isLoading={isLoading}
        handleNewComponent={handleNewComponent}
        handleEdit={handleEdit}
      ></Components>
      <Packages components={components} isLoading={isLoading}></Packages>
    </div>
  );
};

export default ComponentLibrary;
