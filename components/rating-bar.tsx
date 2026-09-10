import { cn } from '@/lib/utils';

interface RatingBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
}

export function RatingBar({ value, max = 5, label, showValue = true }: RatingBarProps) {
  const percentage = (value / max) * 100;
  const colorClass = value >= 4 ? 'bg-success' : value >= 3 ? 'bg-primary' : value >= 2 ? 'bg-warning' : 'bg-destructive';
  const textClass = value >= 4 ? 'rating-high' : value >= 3 ? 'text-primary' : value >= 2 ? 'rating-mid' : 'rating-low';
  const textLabel = value >= 4 ? 'عالي' : value >= 3 ? 'متوسط' : value >= 2 ? 'منخفض' : 'قليل جدًا';

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        {showValue && (
          <span className={cn('font-semibold', textClass)} aria-label={`${label}: ${textLabel}`}>
            {value}/{max} - {textLabel}
          </span>
        )}
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', colorClass)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
}
