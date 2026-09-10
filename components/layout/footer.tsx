import Link from 'next/link';
import { Compass, AlertTriangle } from 'lucide-react';

const footerLinks = [
  { href: '/methodology', label: 'المنهجية' },
  { href: '/sources', label: 'المصادر' },
  { href: '/about', label: 'عن المنصة' },
  { href: '/privacy', label: 'الخصوصية' },
  { href: '/saved', label: 'البيانات المحفوظة' },
];

export function SiteFooter() {
  return (
    <footer className="no-print border-t bg-muted/30 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Compass className="h-5 w-5 text-primary" />
            <span>بوصلة مهندس طنطا 2030</span>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.
              يجب الرجوع إلى المصادر الرسمية للتحقق من اللوائح وشروط القبول والمصروفات.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            © 2026 بوصلة مهندس طنطا 2030. جميع البيانات إرشادية ولا تغني عن المصادر الرسمية.
          </p>
        </div>
      </div>
    </footer>
  );
}
