import "./BasicBtn.css"; 

const BasicBtn = ({ label, size = "small", onClick }) => {
  return (
    <button className={`basic-btn ${size}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default BasicBtn;

