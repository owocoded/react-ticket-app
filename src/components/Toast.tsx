import React from "react";
import { useToast } from "../context/ToastContext";

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  const colorMap: { [key: string]: string } = {
    success: "#10b981",  // green
    error: "#ef4444",    // red
    info: "#3b82f6",     // blue
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast"
          style={{ backgroundColor: colorMap[toast.type] }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

// Export a hook that can be used to show toasts from components
export const useToastForComponents = () => {
  const { addToast } = useToast();
  return {
    show: (message: string, type: "success" | "error" | "info" = "info") => addToast(message, type)
  };
};