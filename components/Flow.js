import React from "react";
import { ReactFlow } from "@xyflow/react";
import MyCustomNode from "./MyCustomNode";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  myCustomNode: MyCustomNode,
};

// Sample initial nodes and edges
const initialNodes = [
  {
    id: "1",
    type: "myCustomNode",
    position: { x: 100, y: 100 },
    data: { label: "Node 1", content: "This is node 1" },
  },
  {
    id: "2",
    type: "myCustomNode",
    position: { x: 300, y: 200 },
    data: { label: "Node 2", content: "This is node 2" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function Flow() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={initialNodes}
        edges={initialEdges}
        fitView
      />
    </div>
  );
}

export default Flow;
