import { AlertTriangle } from "lucide-react";
import React from "react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-destructive">
      <AlertTriangle className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default FormError;
