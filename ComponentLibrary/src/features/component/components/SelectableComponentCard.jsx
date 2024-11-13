import React from "react";
import { Check } from "lucide-react"; // Using Lucide for the checkmark icon

const SelectableComponentCard = ({ component, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer 
        ${isSelected ? "border-2 border-blue-500" : "border border-gray-600"}`}
    >
      <p className="text-white text-sm">{component.name}</p>
      {isSelected && (
        <div className="absolute top-1 right-1">
          <Check className="w-5 h-5 text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default SelectableComponentCard;
