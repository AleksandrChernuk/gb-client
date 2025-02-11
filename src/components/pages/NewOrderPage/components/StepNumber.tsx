import React from "react";

export default function StepNumber({ step }: { step: number }) {
  return <div className="w-6 h-6 text-base font-bold text-center text-white rounded-sm bg-primary">{step}</div>;
}
