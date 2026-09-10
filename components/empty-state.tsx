import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-md mb-4">{description}</p>}
      {action}
    </div>
  );
}
