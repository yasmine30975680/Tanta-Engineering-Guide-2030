import Link from 'next/link';
import { Brain, GitCompareArrows, DollarSign, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata = {
  title: 'منهجية التوصية | بوصلة مهندس طنطا 2030',
  description: 'كيف تعمل محرك التوصية وحاسبة الرواتب في بوصلة مهندس طنطا 2030.',
};

export default function MethodologyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">منهجية التوصية</h1>
      </div>

      <Alert className="mb-6 border-warning/30 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-sm">منصة إرشادية مستقلة</AlertTitle>
        <AlertDescription className="text-xs">
          بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.
          يجب الرجوع إلى المصادر الرسمية للتحقق من اللوائح وشروط القبول والمصروفات.
        </AlertDescription>
      </Alert>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5" /> محرك التوصية</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>محرك التوصية محلي تمامًا ولا يستخدم ذكاءً اصطناعيًا خارجيًا. يعمل كالتالي:</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">50%</span><span>الاهتمامات والأنشطة: مطابقة دوافع الطالب مع أنشطة التخصص.</span></div>
            <div className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">20%</span><span>طبيعة الدراسة: مستوى الرياضيات والفيزياء والبرمجة والمختبر.</span></div>
            <div className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">15%</span><span>بيئة العمل: العمل عن بعد، السفر، الاستقرار.</span></div>
            <div className="flex items-start gap-2"><span className="font-bold text-primary shrink-0">15%</span><span>الأهداف المهنية: ريادة الأعمال، التعلم المستمر، التخصص العميق.</span></div>
          </div>
          <p>الراتب ليس جزءًا من تطابق الشخصية الأساسي. يُضاف كعامل منفصل عبر صفحة الأولويات.</p>
          <p>تطبق تخفيضات منطقية عند رفض البرمجة أو الكيمياء أو الرسم أو المواقع أو الفيزياء أو المسؤولية أو التعلم المستمر، لكن لا يُستبعد أي تخصص نهائيًا.</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-base">تصنيفات النتائج</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><span className="font-bold text-success">85-100:</span> توافق قوي جدًا</li>
            <li><span className="font-bold text-success">75-84:</span> توافق قوي</li>
            <li><span className="font-bold text-primary">65-74:</span> توافق جيد</li>
            <li><span className="font-bold text-warning">55-64:</span> يستحق الاستكشاف</li>
            <li><span className="font-bold text-muted-foreground">أقل من 55:</span> توافق أولي محدود</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><DollarSign className="h-5 w-5" /> منهجية رواتب 2030</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>لا نخترع أرقامًا. نستخدم منهجية شفافة:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>نبدأ من بيانات أساسية موثقة من 2025 أو 2026.</li>
            <li>نربط كل تخصص بعائلات وظيفية فعلية، لا باسم القسم فقط.</li>
            <li>نعرض 2030 بثلاثة سيناريوهات: محافظ (8%)، أساسي (12%)، متفائل (18%).</li>
            <li>نستخدم معادلة Compound Growth: <code className="text-xs bg-muted px-1 py-0.5 rounded">salary2030 = salaryBaseline × (1 + annualGrowthRate) ^ numberOfYears</code></li>
            <li>نعرض القيمة الاسمية والقيمة الحقيقية بقوة شراء سنة الأساس.</li>
            <li>لا نصف الناتج بأنه توقع مؤكد.</li>
          </ol>
          <Alert className="border-warning/30 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-xs">
              توقعات 2030 ناتجة عن سيناريو حسابي مبني على بيانات سنة الأساس وافتراض نمو اسمي، وليست ضمانًا أو توقعًا رسميًا.
              ارتفاع الراتب الاسمي لا يعني بالضرورة ارتفاع القوة الشرائية.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GitCompareArrows className="h-5 w-5" /> منهجية المقارنة</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>تدعم المقارنة أوضاعًا متعددة: سريعة، الدراسة، الوظائف، الرواتب، الشخصية، الأولويات، خطة الأربع سنوات.</p>
          <p>تعرض نقاط القوة والتنازلات وشرح الفروق الحقيقية بين التخصصات.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">مستويات الثقة في البيانات</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><span className="font-bold text-success">مرتفع:</span> أكثر من مصدر حديث ومتقارب.</li>
            <li><span className="font-bold text-warning">متوسط:</span> مصدر حديث واحد أو عدة تقديرات متباعدة.</li>
            <li><span className="font-bold text-muted-foreground">منخفض:</span> بيانات محدودة أو مشتقة.</li>
            <li><span className="font-bold text-destructive">يحتاج مراجعة:</span> لا توجد بيانات كافية.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Link href="/sources"><Button variant="outline" className="gap-1"><FileText className="h-4 w-4" /> المصادر</Button></Link>
        <Link href="/"><Button variant="outline">العودة للرئيسية</Button></Link>
      </div>
    </div>
  );
}
