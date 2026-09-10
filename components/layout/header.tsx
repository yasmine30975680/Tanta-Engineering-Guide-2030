'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Compass, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/departments', label: 'الأقسام' },
  { href: '/compare', label: 'المقارنة' },
  { href: '/quiz', label: 'اختبار الميول' },
  { href: '/results', label: 'النتائج' },
  { href: '/priorities', label: 'الأولويات' },
  { href: '/rank', label: 'ترتيب الرغبات' },
  { href: '/roadmap', label: 'خطة 4 سنوات' },
  { href: '/careers', label: 'الوظائف' },
  { href: '/salaries', label: 'الرواتب' },
  { href: '/report', label: 'التقرير' },
  { href: '/sources', label: 'المصادر' },
  { href: '/about', label: 'عن المنصة' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Compass className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">بوصلة مهندس طنطا 2030</span>
          <span className="sm:hidden">بوصلة 2030</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 7).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent',
                pathname === link.href && 'bg-accent text-accent-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent">
              المزيد
            </button>
            <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-card border rounded-lg shadow-lg p-2 min-w-[180px] z-50">
              {navLinks.slice(7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent',
                    pathname === link.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="تبديل الوضع"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t bg-background px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent',
                  pathname === link.href && 'bg-accent text-accent-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
