import { Icon } from "./Icon";

export function FeatureItem({ icon, children }) {
  return (
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="text-primary text-xl" />
      <span className="font-semibold font-secondary text-sm">{children}</span>
    </div>
  );
}
