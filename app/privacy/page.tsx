import Link from 'next/link';
import { Shield, HardDrive, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
  title: 'الخصوصية والتخزين المحلي | بوصلة مهندس طنطا 2030',
  description: 'كيف نحفظ بياناتك محليًا على متصفحك فقط دون إرسالها لأي خادم.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">الخصوصية والتخزين المحلي</h1>
      </div>

      <Alert className="mb-6 border-success/30 bg-success/5">
        <Shield className="h-4 w-4 text-success" />
        <AlertTitle className="text-sm">لا تُرسل إجاباتك إلى خادم</AlertTitle>
        <AlertDescription className="text-xs">
          في النسخة الحالية، جميع بياناتك محفوظة محليًا على متصفحك فقط باستخدام localStorage.
        </AlertDescription>
      </Alert>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">ماذا نحفظ؟</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- المفضلة: قائمة التخصصات التي وضعتها في المفضلة.</li>
            <li>- قائمة المقارنة: التخصصات التي اخترتها للمقارنة.</li>
            <li>- إجابات الاختبار: إجاباتك على أسئلة اختبار الميول.</li>
            <li>- الأولويات: توزيع النقاط على أولوياتك المهنية.</li>
            <li>- قائمة الرغبات: ترتيبك الشخصي للتخصصات وملاحظاتك.</li>
            <li>- تقدم خطة الأربع سنوات: العناصر التي أكملتها.</li>
            <li>- نتائج التحديات المصغرة: هل استمتعت بالتحدي أم لا.</li>
            <li>- إعدادات حاسبة الرواتب: آخر إعداداتك (التخصص، المسار، الدولة...).</li>
            <li>- الوضع الداكن أو الفاتح.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">ماذا لا نطلب؟</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- لا نطلب الرقم القومي.</li>
            <li>- لا نطلب البريد الإلكتروني.</li>
            <li>- لا نطلب رقم الهاتف.</li>
            <li>- لا نطلب الجنس أو الدين.</li>
            <li>- لا نطلب الدخل الأسري.</li>
            <li>- لا نطلب الحالة الصحية.</li>
            <li>- لا نطلب أي معلومات حساسة.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><HardDrive className="h-5 w-5" /> أين تُحفظ البيانات؟</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            تُحفظ جميع البيانات في متصفحك فقط (localStorage) تحت مفتاح خاص بالمشروع.
            لا تُرسل إلى أي خادم. إذا مسحت بيانات المتصفح أو استخدمت متصفحًا آخر، لن تجد بياناتك.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Trash2 className="h-5 w-5" /> كيف أمسح بياناتي؟</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            يمكنك مسح جميع بياناتك من صفحة البيانات المحفوظة بزر «مسح جميع بياناتي» مع تأكيد واضح.
          </p>
          <Link href="/saved"><Button variant="outline" size="sm">الذهاب للبيانات المحفوظة</Button></Link>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">الاختبار ليس تقييمًا نفسيًا</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              اختبار الميول الهندسية أداة إرشادية تساعدك على الاستكشاف، وليس تقييمًا نفسيًا أو تشخيصًا.
              النتائج مؤشرات فقط وليست حكمًا على قدرتك أو شخصيتك.
            </p>
          </div>
        </CardContent>
      </Card>

      <Link href="/"><Button variant="outline">العودة للرئيسية</Button></Link>
    </div>
  );
}
