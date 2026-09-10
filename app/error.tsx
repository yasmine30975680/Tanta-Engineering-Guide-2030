'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <AlertCircle className="h-16 w-16 text-destructive/40 mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">حدث خطأ غير متوقع</h1>
      <p className="text-sm text-muted-foreground mb-6">
        عذرًا، حدث خطأ أثناء تحميل الصفحة. يمكنك المحاولة مرة أخرى أو العودة للرئيسية.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={reset} className="gap-2"><RotateCcw className="h-4 w-4" /> المحاولة مرة أخرى</Button>
        <Link href="/"><Button variant="outline" className="gap-2"><Home className="h-4 w-4" /> الرئيسية</Button></Link>
      </div>
    </div>
  );
}
