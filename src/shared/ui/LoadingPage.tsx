export default function LoadingPage({ text }: { text: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-lg">{text}</p>
    </div>
  );
}
