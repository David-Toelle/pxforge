import React, { useState } from "react";
import Loading from "@/components/Loading/Loading";
import PackageCard from "./packageCard";
import PackageDetails from "./packageDetails";
import {
  useFetchUserPackagesQuery,
  useCreatePackageMutation,
} from "../packageApi";

export const Packages = () => {
  const { data: packages = [], isLoading } = useFetchUserPackagesQuery();
  const [createPackage] = useCreatePackageMutation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isCreatingNewPackage, setIsCreatingNewPackage] = useState(false);
  const [newPackageData, setNewPackageData] = useState({
    name: "",
    description: "",
  });

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg); // Show package details view
  };

  const handleCloseDetails = () => {
    setSelectedPackage(null); // Return to package list view
  };

  const handleAddNewPackage = () => {
    setIsCreatingNewPackage(true);
  };

  const handleCreatePackage = async () => {
    const { name, description } = newPackageData;

    // Check that both fields are filled before proceeding
    if (!name || !description) {
      alert("Please provide both a name and description for the package.");
      return;
    }

    try {
      // Call the createPackage mutation with the new package data
      await createPackage({ ...newPackageData, components: [] }).unwrap();

      // Reset fields and close the creation form
      setNewPackageData({ name: "", description: "" });
      setIsCreatingNewPackage(false);
    } catch (error) {
      console.error("Failed to create package:", error);
    }
  };

  if (isLoading) {
    return <Loading size="60px" color="#3498db" />;
  }

  return (
    <div className="w-full m-5 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track bg-black rounded-2xl shadow-lg p-6 border border-gray-200 border-opacity-20">
      {selectedPackage ? (
        <PackageDetails pkg={selectedPackage} onClose={handleCloseDetails} />
      ) : (
        <div className="max-h-80">
          <h1 className="text-3xl font-bold text-center text-white dark:text-white border-b mb-6">
            NPM Packages
          </h1>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Manage your custom packages or create a new one to get started.
            </p>
          </div>
          <div className="flex justify-center mt-4 mb-6">
            <button
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleAddNewPackage}
            >
              Add New Package
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={() => handleEdit(pkg)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-neutral-400">
                No packages available. Add one!
              </p>
            )}
          </div>
          {isCreatingNewPackage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Create New Package</h2>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Package Name"
                  value={newPackageData.name}
                  onChange={(e) =>
                    setNewPackageData({
                      ...newPackageData,
                      name: e.target.value,
                    })
                  }
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Package Description"
                  value={newPackageData.description}
                  onChange={(e) =>
                    setNewPackageData({
                      ...newPackageData,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => setIsCreatingNewPackage(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleCreatePackage}
                  >
                    Create Package
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
