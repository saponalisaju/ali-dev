import React, { useRef } from "react";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, formData, innerRef } = this.props;
    const fileExtension = formData?.file5?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/air_tickets/${formData.file5}`;

    if (!formData) {
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
          <img
            style={{ width: "100%", height: window.innerHeight }}
            src={fileURL}
            alt="attachment"
          />
        )}
      </div>
    );
  }
}

const PrintButton5 = ({ apiUrl, formData }) => {
  const contentRef = useRef(null);

  return (
    <div>
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

export default PrintButton5;
