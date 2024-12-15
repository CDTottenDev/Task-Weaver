import React from "react";

function MyCustomNode({ data }) {
  return (
    <div className="custom-node">
      <div className="custom-node-header">{data.label || "Node"}</div>
      <div className="custom-node-content">{data.content || "Content"}</div>
    </div>
  );
}

export default MyCustomNode;
