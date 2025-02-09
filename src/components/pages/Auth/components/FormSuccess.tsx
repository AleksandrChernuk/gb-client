import { CircleCheckBig } from "lucide-react";

interface FormSuccessProps {
  message: string | undefined;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm bg-emerald-500/15 rounded-md gap-x-2 text-emerald-500">
      <CircleCheckBig className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
