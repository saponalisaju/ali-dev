import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, file, innerRef } = this.props;
    const fileExtension = file?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/job_letters/${file}`;

    if (!file) {
      return <div ref={innerRef}>File data is missing or undefined.</div>;
    }

    return (
      <div ref={innerRef}>
        {fileExtension === "pdf" ? (
          <iframe
            style={{ width: "100%", height: window.innerHeight }}
            src={fileURL}
            title="PDF viewer"
          />
        ) : (
          <img style={{ width: "100%" }} src={fileURL} alt="attachment" />
        )}
      </div>
    );
  }
}

const PrintButtonView = ({ apiUrl, file }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-secondary" onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint innerRef={contentRef} apiUrl={apiUrl} file={file} />
      </div>
    </div>
  );
};

export default PrintButtonView;
