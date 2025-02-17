import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, file4, innerRef } = this.props;
    const fileExtension = file4?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/work_permits/${file4}`;

    if (!file4) {
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

const PrintButtonView4 = ({ apiUrl, file4 }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint innerRef={contentRef} apiUrl={apiUrl} file4={file4} />
      </div>
    </div>
  );
};

export default PrintButtonView4;
