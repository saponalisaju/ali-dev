import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div ref={this.props.innerRef}>
        <img
          style={{ width: "100%", height: window.innerHeight }}
          src={`${this.props.apiUrl}/uploads/documents/${this.props.formData.file}`}
          alt="logo"
        />
      </div>
    );
  }
}

const PrintButton = ({ apiUrl, formData }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <div>
        <ComponentToPrint
          innerRef={contentRef}
          apiUrl={apiUrl}
          formData={formData}
        />
      </div>
      <button className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default PrintButton;
