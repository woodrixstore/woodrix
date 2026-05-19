import { PackageOpen } from "lucide-react";
import { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="bg-surface rounded-full p-6 mb-4 text-accent">
        {icon ?? <PackageOpen className="h-8 w-8" />}
      </div>
      <h3 className="font-serif text-2xl text-espresso mb-2">{title}</h3>
      {description && <p className="text-muted-foreground max-w-md mb-6">{description}</p>}
      {action}
    </div>
  );
}
