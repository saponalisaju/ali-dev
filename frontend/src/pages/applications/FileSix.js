import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, application, innerRef } = this.props;
    const fileExtension = application?.file5?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/air_tickets/${application.file5}`;

    if (!application) {
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

const PrintButtonView5 = ({ apiUrl, application }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-outline-dark " onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint
          innerRef={contentRef}
          apiUrl={apiUrl}
          application={application}
        />
      </div>
    </div>
  );
};

export default PrintButtonView5;
