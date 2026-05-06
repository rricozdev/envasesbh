export function StepItem({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-body-md">{title}</h4>
        <p className="text-body-sm opacity-80">{description}</p>
      </div>
    </div>
  );
}
