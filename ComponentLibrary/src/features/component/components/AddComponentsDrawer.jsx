import React, { useState } from "react";
import ComponentCard from "./ComponentCard";

const AddComponentsDrawer = ({ components, onClose, onAddComponents }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const toggleSelectComponent = (component) => {
    setSelectedComponents((prev) =>
      prev.includes(component)
        ? prev.filter((comp) => comp !== component)
        : [...prev, component]
    );
  };

  const handleAddSelection = () => {
    onAddComponents(selectedComponents);
    setSelectedComponents([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="w-1/3 h-full bg-gray-800 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Select Components</h2>
        <div className="grid grid-cols-1 gap-4">
          {components.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onClick={() => toggleSelectComponent(component)}
              className={
                selectedComponents.includes(component)
                  ? "border-blue-500 border-2"
                  : ""
              }
            />
          ))}
        </div>
        <button
          className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg"
          onClick={handleAddSelection}
        >
          Add Selected Components
        </button>
        <button
          className="mt-2 py-2 px-4 bg-red-600 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddComponentsDrawer;
