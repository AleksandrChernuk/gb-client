"use client";

export const InputError = ({ inputError }: { inputError: string | null }) => {
  return inputError ? (
    <div
      className="absolute top-0 right-0 z-50 p-1 text-xs text-white transform rounded-tr-lg rounded-bl-lg cursor-pointer w-fit h-fit bg-red "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {inputError}
    </div>
  ) : null;
};
