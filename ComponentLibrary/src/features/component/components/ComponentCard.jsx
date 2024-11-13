import "../styles/ComponentCard.css";

const ComponentCard = ({ component, onEdit }) => {
  return (
    <div className="component-card bg-zinc-800 text-white border border-opacity-20">
      <h2>{component.name}</h2>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default ComponentCard;
