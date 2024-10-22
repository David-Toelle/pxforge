import "../styles/ComponentCard.css";

const ComponentCard = ({ component, onEdit }) => {
  return (
    <div className="component-card">
      <h2>{component.name}</h2>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default ComponentCard;
