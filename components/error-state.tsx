import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({ title = 'حدث خطأ', description = 'يرجى المحاولة مرة أخرى' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive/40 mb-4" />
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
