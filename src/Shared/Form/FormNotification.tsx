import { CheckCircle } from "lucide-react";


const FormNotification = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 text-emerald-500 p-3 rounded-md flex items-center gap-2">
      <CheckCircle className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default FormNotification;
