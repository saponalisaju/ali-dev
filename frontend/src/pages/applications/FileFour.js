import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, file3, innerRef } = this.props;
    const fileExtension = file3?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/visa_form/${file3}`;

    if (!file3) {
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

const PrintButtonView3 = ({ apiUrl, file3 }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint innerRef={contentRef} apiUrl={apiUrl} file3={file3} />
      </div>
    </div>
  );
};

export default PrintButtonView3;
