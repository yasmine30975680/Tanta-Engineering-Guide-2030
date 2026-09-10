import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <Compass className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold mb-2">الصفحة غير موجودة</h1>
      <p className="text-sm text-muted-foreground mb-6">
        عذرًا، الصفحة التي تبحث عنها غير متوفرة. ربما تم نقلها أو حذفها.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/"><Button className="gap-2"><Home className="h-4 w-4" /> العودة للرئيسية</Button></Link>
        <Link href="/departments"><Button variant="outline">تصفح الأقسام</Button></Link>
      </div>
    </div>
  );
}
