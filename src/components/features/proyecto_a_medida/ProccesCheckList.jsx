import { CheckCircle } from "lucide-react";

export default function ProcessChecklist({ items }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
