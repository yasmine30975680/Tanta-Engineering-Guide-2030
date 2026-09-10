import './globals.css';
import type { Metadata } from 'next';
import { Alexandria, Tajawal } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  variable: '--font-alexandria',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'بوصلة مهندس طنطا 2030 | استكشف التخصصات وابنِ مستقبلك الهندسي',
  description:
    'منصة إرشادية طلابية مستقلة تساعد طلاب كلية الهندسة بجامعة طنطا على استكشاف 15 تخصصًا وبرنامجًا، ومقارنة الدراسة والعمل، واكتشاف الميول، وترتيب الرغبات بقرار واعٍ.',
  keywords: [
    'هندسة طنطا',
    'كلية الهندسة جامعة طنطا',
    'اختيار التخصص',
    'إرشاد هندسي',
    'ميول هندسية',
    'تخصصات الهندسة',
    'بوصلة مهندس طنطا 2030',
  ],
  openGraph: {
    title: 'بوصلة مهندس طنطا 2030',
    description:
      'اعرف نفسك، استكشف التخصصات، وابنِ مستقبلك الهندسي بقرار واعٍ.',
    type: 'website',
    locale: 'ar_EG',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${alexandria.variable} ${tajawal.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
