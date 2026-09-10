import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ title, subtitle, icon, className }: SectionHeadingProps) {
  return (
    <div className={cn('space-y-1 mb-4', className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
