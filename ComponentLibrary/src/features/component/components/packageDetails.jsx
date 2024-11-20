import React, { useState, useEffect } from "react";
import { useFetchComponentsQuery } from "../componentApi";
import {
  useUpdatePackageMutation,
  usePublishPackageMutation,
  useFetchPackageByIdQuery,
} from "../packageApi";
import SelectableComponentCard from "./SelectableComponentCard";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const PackageDetails = ({ pkg, onClose }) => {
  const { data: components = [] } = useFetchComponentsQuery();
  const [updatePackage] = useUpdatePackageMutation();
  const [publishPackage] = usePublishPackageMutation();
  const { data: updatedPackage, refetch } = useFetchPackageByIdQuery(pkg.id);

  const [selectedComponents, setSelectedComponents] = useState([]);
  const [packageComponents, setPackageComponents] = useState(
    pkg.components || []
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [publishing, setPublishing] = useState(false); // Track publishing state
  const [publishStatus, setPublishStatus] = useState("");

  useEffect(() => {
    if (updatedPackage) {
      setPackageComponents(updatedPackage.components);
    }
  }, [updatedPackage]);

  const toggleSelectComponent = (component) => {
    setSelectedComponents((prevSelected) =>
      prevSelected.some((comp) => comp.id === component.id)
        ? prevSelected.filter((comp) => comp.id !== component.id)
        : [...prevSelected, component]
    );
  };

  const handleAddSelection = async () => {
    const updatedComponentIds = selectedComponents.map((comp) => comp.id);
    const payload = {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      components: updatedComponentIds,
    };
    setIsDrawerOpen(false);
    setPackageComponents(selectedComponents);
    setSelectedComponents([]);
    try {
      await updatePackage(payload).unwrap();
    } catch (error) {
      console.error("Failed to update package components:", error);
    }
  };

  const handlePublish = async () => {
    setPublishing(true); // Disable button and show "Publishing..."
    setPublishStatus(""); // Clear previous status
    try {
      await publishPackage(pkg.id).unwrap();
      setPublishStatus("Package published successfully!");
      refetch();
    } catch (error) {
      // Handle specific error for package name issues
      if (error.data?.error === "Failed to publish package. try another name") {
        alert(
          "The package name is invalid or already in use. Please try another name."
        );
      } else {
        alert("Failed to publish the package. Please try again.");
      }
      setPublishStatus("Failed to publish package.");
    } finally {
      setPublishing(false); // Re-enable the button
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-3xl font-bold text-white">
        Name: {updatedPackage?.name || pkg.name}
      </h2>
      <p className="text-gray-400 mt-2">
        Version: {updatedPackage?.version || pkg.version}
      </p>
      <p className="text-gray-400 mt-2">
        Description: {updatedPackage?.description || pkg.description}
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packageComponents.length > 0 ? (
          packageComponents.map((component) => (
            <div
              key={component.id}
              className="p-4 bg-gray-800 rounded-lg text-center"
            >
              <p className="text-white">
                {component.name || `Component ${component.id}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No components in this package. Add some!
          </p>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              className="py-2 px-4 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 focus:bg-neutral-700"
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Components
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-gray-900 text-white">
            <DrawerHeader>
              <DrawerTitle className="text-white">
                Select Components
              </DrawerTitle>
              <DrawerDescription className="text-gray-400">
                Choose components to add to this package.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 overflow-x-auto max-h-80 flex space-x-4">
              {components.map((component) => (
                <SelectableComponentCard
                  key={component.id}
                  component={component}
                  isSelected={selectedComponents.some(
                    (comp) => comp.id === component.id
                  )}
                  onClick={() => toggleSelectComponent(component)}
                />
              ))}
            </div>
            <DrawerFooter className="flex justify-between mt-4">
              <Button
                onClick={handleAddSelection}
                className="bg-neutral-800 text-white"
              >
                Add Selected Components
              </Button>
              <Button
                variant="outline"
                className="text-white border-gray-600 hover:bg-gray-800"
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button
          className="py-2 px-4 bg-red-600 text-white rounded-lg"
          onClick={onClose}
        >
          Back
        </Button>
        <Button
          className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          onClick={handlePublish}
          disabled={publishing} // Disable button when publishing
        >
          {publishing ? "Publishing..." : "Publish to NPM"}
        </Button>
      </div>
      {publishStatus && (
        <p className="mt-4 text-center text-sm text-yellow-400">
          {publishStatus}
        </p>
      )}
    </div>
  );
};

export default PackageDetails;
