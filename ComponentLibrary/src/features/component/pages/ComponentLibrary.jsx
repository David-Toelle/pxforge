import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchComponentsQuery } from "../componentApi"; // Fetch components API call
import ComponentCard from "../components/ComponentCard";
// import LandingPage from "@pxforge/testing555"
const ComponentLibrary = () => {
  const navigate = useNavigate();
  const {
    data: components = [],
    isLoading,
    isError,
  } = useFetchComponentsQuery();

  const handleEdit = (component) => {
    navigate(`/components/${component.id}/edit`); // Navigate to edit page
  };

  const handleNewComponent = () => {
    navigate(`/components/new`); // Navigate to new component creation page
  };

  if (isError) {
    return <div>Error loading components</div>;
  }

  if (isLoading) {
    return <div>Loading components...</div>;
  }

  return (
    <div>
      
      <h1>Your Component Library</h1>
      <div className="component-grid">
        {components.length > 0 ? (
          components.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onEdit={() => handleEdit(component)}
            />
          ))
        ) : (
          <p>No components available. Add one!</p>
        )}
        <button onClick={handleNewComponent}>Add New Component</button>
      </div>
    </div>
  );
};

export default ComponentLibrary;
