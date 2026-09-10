'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, GitCompareArrows, Brain, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/departments', label: 'الأقسام', icon: LayoutGrid },
  { href: '/compare', label: 'المقارنة', icon: GitCompareArrows },
  { href: '/quiz', label: 'الاختبار', icon: Brain },
  { href: '/report', label: 'التقرير', icon: FileText },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="no-print md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors min-w-[56px]',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
