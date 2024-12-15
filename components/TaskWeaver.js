"use client";

import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { HexColorPicker } from "react-colorful";
import { PlusCircle, Flag } from "lucide-react";

const TaskNode = ({ data }) => {
  return (
    <div
      className="p-4 rounded-lg shadow-lg min-w-[200px] text-white"
      style={{ backgroundColor: data.color || "#ff6b6b" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">{data.label}</span>
        {data.urgency === "high" && <Flag className="w-5 h-5" />}
      </div>
      <div className="text-sm opacity-80">Category: {data.category}</div>
    </div>
  );
};

const nodeTypes = {
  task: TaskNode,
};

const initialNodes = [
  {
    id: "1",
    type: "task",
    position: { x: 250, y: 100 },
    data: {
      label: "Main Project",
      urgency: "high",
      color: "#ff6b6b",
      category: "project",
    },
  },
];

const initialEdges = [];

function TaskWeaver() {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");

  useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewTask = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "task",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      data: {
        label: `Task ${nodes.length + 1}`,
        urgency: Math.random() > 0.5 ? "high" : "normal",
        color: selectedColor,
        category: "subtask",
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, selectedColor, setNodes]);

  if (!mounted) return null;

  return (
    <div className="w-full h-screen">
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <button
          onClick={addNewTask}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Task
        </button>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Color
        </button>
        {showColorPicker && (
          <div className="absolute top-12 left-0">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
        )}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default TaskWeaver;
