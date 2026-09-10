import Link from 'next/link';
import { Compass, AlertTriangle, Heart, Shield, FileText, Brain, GitCompareArrows, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
  title: 'عن المنصة | بوصلة مهندس طنطا 2030',
  description: 'بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة تساعد طلاب الهندسة على استكشاف التخصصات واتخاذ قرار واعٍ.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="h-8 w-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">عن المنصة</h1>
      </div>

      <Alert className="mb-6 border-warning/30 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-sm">تنبيه مهم</AlertTitle>
        <AlertDescription className="text-xs">
          بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.
          يجب الرجوع إلى المصادر الرسمية للتحقق من اللوائح وشروط القبول والمصروفات.
        </AlertDescription>
      </Alert>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">الرسالة</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            «اعرف نفسك، استكشف التخصصات، وابنِ مستقبلك الهندسي بقرار واعٍ.»
            <br /><br />
            نساعد طلاب كلية الهندسة بجامعة طنطا على استكشاف أقسام الشعبة العامة والبرامج المميزة،
            وفهم طبيعة الدراسة والعمل في كل تخصص، واكتشاف ميولهم الهندسية، واتخاذ قرار مبني على معلومات لا على ضغط الآخرين.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">ماذا نقدم؟</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: Compass, title: 'استكشاف الأقسام', desc: '15 تخصصًا وبرنامجًا بمعلومات تفصيلية' },
              { icon: GitCompareArrows, title: 'مقارنة شاملة', desc: 'قارن من 2 إلى 4 تخصصات بمعايير متعددة' },
              { icon: Brain, title: 'اختبار ميول', desc: '42 سؤالًا تقيس اهتماماتك وشخصيتك الهندسية' },
              { icon: TrendingUp, title: 'رواتب 2030', desc: 'نطاقات رواتب متوقعة بمنهجية شفافة' },
              { icon: FileText, title: 'تقرير قرار', desc: 'تقرير نهائي قابل للطباعة' },
              { icon: Heart, title: 'حفظ محلي', desc: 'بياناتك محفوظة على متصفحك فقط' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg border">
                <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">ماذا لا نقدم؟</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- لسنا موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.</li>
            <li>- لا نقدم لوائح رسمية. المحاور المعروضة هي محاور دراسية شائعة للاسترشاد فقط.</li>
            <li>- لا نضمن راتبًا أو وظيفة. الرواتب تقديرية بناءً على بيانات سوقية.</li>
            <li>- لا نقدم تقييمًا نفسيًا. الاختبار مؤشر إرشادي فقط.</li>
            <li>- لا نطلب معلومات شخصية حساسة.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg">الخصوصية</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              لا تُرسل إجاباتك إلى خادم في النسخة الحالية. جميع بياناتك محفوظة محليًا على متصفحك فقط.
              لا نطلب الرقم القومي أو البريد أو الهاتف أو أي معلومات حساسة.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">المصادر والتحديث</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            نعتمد على مصادر متعددة بدرجات ثقة مختلفة. راجع صفحة المصادر للتفاصيل الكاملة.
          </p>
          <Link href="/sources"><Button variant="outline" size="sm">صفحة المصادر</Button></Link>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Link href="/methodology"><Button variant="outline">منهجية التوصية</Button></Link>
        <Link href="/privacy"><Button variant="outline">الخصوصية والتخزين</Button></Link>
        <Link href="/"><Button>العودة للرئيسية</Button></Link>
      </div>
    </div>
  );
}
