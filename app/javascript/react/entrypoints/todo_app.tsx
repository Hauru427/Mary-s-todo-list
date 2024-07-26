import React from "react";
import { createRoot } from "react-dom/client";
import TodoApp from "../features/todos";

const container = document.getElementById("todo_app");
if (container) {
  const root = createRoot(container);
  root.render(<TodoApp />);
}