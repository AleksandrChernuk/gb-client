import { TriangleIcon } from 'lucide-react';

interface FormErrorProps {
  message: string | undefined;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm bg-destructive/15 rounded-md gap-x-2 text-destructive">
      <TriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
