import "../styles/ComponentCard.css";
import { useDeleteComponentMutation } from "../componentApi";

const ComponentCard = ({ component, onEdit }) => {
  const [deleteComponent] = useDeleteComponentMutation();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${component.name}?`)) {
      try {
        await deleteComponent(component.id).unwrap();
      } catch (err) {
        console.error("Failed to delete component:", err);
        alert("Failed to delete the component. Please try again.");
      }
    }
  };

  return (
    <div className="component-card bg-zinc-800 text-white border border-opacity-20 relative">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 focus:ring-2 focus:ring-red-500"
        title="Delete"
      >
        X
      </button>
      {/* Component Details */}
      <h2>{component.name}</h2>
      <button
        onClick={onEdit}
        className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Edit
      </button>
    </div>
  );
};

export default ComponentCard;
