import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { apiUrl, file1, innerRef } = this.props;
    const fileExtension = file1?.split(".").pop().toLowerCase();

    const fileURL = `${apiUrl}/uploads/lmias/${file1}`;

    if (!file1) {
      return <div ref={innerRef}>File data is missing or undefined.</div>;
    }

    return (
      <div ref={innerRef}>
        {fileExtension === "pdf" ? (
          <iframe style={{ width: "100%" }} src={fileURL} title="PDF viewer" />
        ) : (
          <img style={{ width: "100%" }} src={fileURL} alt="attachment" />
        )}
      </div>
    );
  }
}

const PrintButtonView1 = ({ apiUrl, file1 }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
        Print
      </button>
      <div ref={contentRef}>
        <ComponentToPrint innerRef={contentRef} apiUrl={apiUrl} file1={file1} />
      </div>
    </div>
  );
};

export default PrintButtonView1;
