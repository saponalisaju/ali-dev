import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Page } from "@react-pdf/renderer";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, formData, innerRef } = this.props;
    const fileExtension = formData?.file?.split(".").pop().toLowerCase();
    const fileURL = `${apiUrl}/uploads/documents/${formData.file}`;

    if (!formData || !formData.file) {
      return <div ref={innerRef}>File data is missing or undefined.</div>;
    }

    return (
      <div ref={innerRef} style={{ width: "100%", height: window.innerHeight }}>
        {fileExtension === "pdf" ? (
          <Page size="A4">
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={fileURL}
              title="PDF viewer"
            />
          </Page>
        ) : (
          <img
            style={{ width: "100%", height: "100%" }}
            src={fileURL}
            alt="file"
          />
        )}
      </div>
    );
  }
}

const PrintButton = ({ apiUrl, formData }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint
          innerRef={contentRef}
          apiUrl={apiUrl}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default PrintButton;
