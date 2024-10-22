// PreviewWindow.jsx
import { LivePreview, LiveError } from "react-live";

// eslint-disable-next-line react/prop-types
const PreviewWindow = ({ code }) => {
    console.log("code: ",code)
  return (
    <div className="preview-window">
      {/* Display the live preview of the component */}
      <LivePreview />
      {/* Show syntax or runtime errors */}
      <LiveError />
    </div>
  );
};

export default PreviewWindow;
