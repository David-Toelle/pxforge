import React from "react";
import { useDeletePackageMutation } from "../packageApi";

const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const PackageCard = ({ pkg, onEdit }) => {
  const [deletePackage] = useDeletePackageMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the package "${pkg.name}"?`
    );
    if (confirmed) {
      try {
        await deletePackage(pkg.id).unwrap();
        console.log("Package deleted successfully");
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white">Name: {pkg.name}</h2>
      <p className="text-gray-400 mt-2">
        Version: {truncate(pkg.version, 100)}
      </p>
      <p className="text-gray-400 mt-2">
        Description: {truncate(pkg.description, 100)}
      </p>
      <button
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="mt-4 ml-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-700"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PackageCard;
