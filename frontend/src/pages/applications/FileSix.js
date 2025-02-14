import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, file5, innerRef } = this.props;
    const fileExtension = file5?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/air_tickets/${file5}`;

    if (!file5) {
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

const PrintButtonView5 = ({ apiUrl, file5 }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className="">
      <button className="btn btn-secondary btn-sm " onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint innerRef={contentRef} apiUrl={apiUrl} file5={file5} />
      </div>
    </div>
  );
};

export default PrintButtonView5;
