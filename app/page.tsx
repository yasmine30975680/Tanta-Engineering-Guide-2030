'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Compass, ArrowLeft, GitCompareArrows, Brain, MapPin, DollarSign, FileText, Sparkles, ChevronLeft, Lightbulb, Target, TrendingUp, GraduationCap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { departments, getGeneralDepartments, getCreditDepartments, accentColors } from '@/data/departments';
import { useAppStore } from '@/store/use-app-store';
import { DepartmentCard } from '@/components/department-card';

const curiosityOptions = [
  { id: 'programming', labelAr: 'البرمجة والأنظمة الذكية', icon: 'Code', slugs: ['computer-control', 'artificial-intelligence', 'mechatronics'] },
  { id: 'electronics', labelAr: 'الإلكترونيات والاتصالات', icon: 'Radio', slugs: ['electronics-communications', 'computer-control'] },
  { id: 'power', labelAr: 'الكهرباء والطاقة', icon: 'Zap', slugs: ['electrical-power', 'energy-electrical-systems'] },
  { id: 'thermal', labelAr: 'الحرارة والآلات', icon: 'Flame', slugs: ['mechanical-power'] },
  { id: 'design', labelAr: 'التصميم والتصنيع', icon: 'Settings', slugs: ['production-design'] },
  { id: 'chemistry', labelAr: 'الكيمياء والعمليات', icon: 'FlaskConical', slugs: ['chemical-petrochemical'] },
  { id: 'architecture', labelAr: 'العمارة والفراغ', icon: 'Building2', slugs: ['architecture', 'environmental-architecture'] },
  { id: 'urban', labelAr: 'المدن والتخطيط', icon: 'Map', slugs: ['urban-planning'] },
  { id: 'structures', labelAr: 'المنشآت والبنية التحتية', icon: 'HardHat', slugs: ['civil-engineering', 'construction-engineering'] },
  { id: 'management', labelAr: 'إدارة المشروعات', icon: 'ClipboardList', slugs: ['construction-engineering', 'production-design'] },
  { id: 'robotics', labelAr: 'الروبوتات', icon: 'Bot', slugs: ['mechatronics', 'computer-control'] },
  { id: 'sustainability', labelAr: 'الاستدامة', icon: 'Leaf', slugs: ['environmental-architecture', 'energy-electrical-systems'] },
  { id: 'ai', labelAr: 'الذكاء الاصطناعي', icon: 'BrainCircuit', slugs: ['artificial-intelligence', 'computer-control'] },
  { id: 'medical', labelAr: 'الهندسة والطب', icon: 'HeartPulse', slugs: ['biomedical-engineering'] },
];

const faqs = [
  { q: 'هل هذه المنصة رسمية؟', a: 'لا، بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.' },
  { q: 'هل النتائج حكم نهائي؟', a: 'لا، النتائج مؤشر إرشادي فقط. يجب استخدامها كأداة مساعدة للاستكشاف، وليست بديلًا عن التفكير الشخصي أو استشارة المرشد الأكاديمي.' },
  { q: 'هل تُحفظ بياناتي؟', a: 'في النسخة الحالية، تُحفظ جميع بياناتك محليًا على متصفحك فقط. لا تُرسل أي بيانات إلى خادم.' },
  { q: 'كم تخصصًا متاحًا؟', a: '15 تخصصًا وبرنامجًا: 9 أقسام في الشعبة العامة و6 برامج مميزة بنظام الساعات المعتمدة.' },
  { q: 'هل الرواتب المعروضة دقيقة؟', a: 'الرواتب تقديرية مبنية على مصادر سوقية مع درجة ثقة. توقعات 2030 ناتجة عن سيناريو حسابي وليست ضمانًا.' },
];

export default function HomePage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const [selectedCuriosity, setSelectedCuriosity] = useState<string | null>(null);

  useEffect(() => { hydrate(); }, [hydrate]);

  const generalDepts = getGeneralDepartments();
  const creditDepts = getCreditDepartments();

  return (
    <div className="bg-grid-dark">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-primary">
              <Compass className="h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-balance leading-tight">
            اختيار القسم ليس اختيار مواد فقط، بل اختيار لنوع المشكلات التي ستقضي سنوات في حلها.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            استكشف 15 تخصصًا وبرنامجًا في هندسة طنطا، قارن الدراسة والعمل، اكتشف ميولك، ورتّب رغباتك بخطوات واضحة.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/quiz">
              <Button size="lg" className="gap-2">
                <Brain className="h-5 w-5" />
                ابدأ اختبار التخصص
              </Button>
            </Link>
            <Link href="/departments">
              <Button size="lg" variant="outline" className="gap-2">
                <Compass className="h-5 w-5" />
                استكشف الأقسام
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="gap-2">
                <GitCompareArrows className="h-5 w-5" />
                قارن الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Curiosity Panel */}
      <section className="py-12 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">ما الذي يثير فضولك؟</h2>
          <p className="text-sm text-muted-foreground">اختر مجالًا يثير اهتمامك لنرشدك للتخصصات المناسبة</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {curiosityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCuriosity(selectedCuriosity === opt.id ? null : opt.id)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all hover:shadow-md ${selectedCuriosity === opt.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border'}`}
            >
              {opt.labelAr}
            </button>
          ))}
        </div>

        {selectedCuriosity && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
            {curiosityOptions.find((c) => c.id === selectedCuriosity)?.slugs.map((slug) => {
              const dept = departments.find((d) => d.slug === slug);
              if (!dept) return null;
              return <DepartmentCard key={dept.slug} department={dept} />;
            })}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">كيف تعمل البوصلة؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Brain, title: 'اختبر ميولك', desc: 'اختبار 42 سؤالًا يقيس اهتماماتك وشخصيتك الهندسية', href: '/quiz' },
              { icon: Compass, title: 'استكشف الأقسام', desc: '15 تخصصًا بمعلومات تفصيلية عن الدراسة والعمل', href: '/departments' },
              { icon: GitCompareArrows, title: 'قارن بين التخصصات', desc: 'مقارنة شاملة من 2 إلى 4 تخصصات بمعايير متعددة', href: '/compare' },
              { icon: FileText, title: 'احصل على تقرير', desc: 'تقرير قرار نهائي قابل للطباعة', href: '/report' },
            ].map((step, i) => (
              <Link key={i} href={step.href}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 text-center">
                    <div className="flex justify-center mb-3 text-primary">
                      <step.icon className="h-10 w-10" />
                    </div>
                    <h3 className="font-bold mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* General Departments */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">الأقسام العامة</h2>
            <p className="text-sm text-muted-foreground">9 أقسام في الشعبة العامة</p>
          </div>
          <Link href="/departments/general">
            <Button variant="ghost" className="gap-1 text-sm">
              عرض الكل <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generalDepts.slice(0, 6).map((dept) => (
            <DepartmentCard key={dept.slug} department={dept} />
          ))}
        </div>
      </section>

      {/* Credit Programs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">البرامج المميزة</h2>
              <p className="text-sm text-muted-foreground">6 برامج بنظام الساعات المعتمدة</p>
            </div>
            <Link href="/departments/credit">
              <Button variant="ghost" className="gap-1 text-sm">
                عرض الكل <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creditDepts.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="py-12 container mx-auto px-4">
        <Card className="overflow-hidden">
          <CardContent className="p-8 text-center">
            <GitCompareArrows className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">قارن قبل أن تختار</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
              لا تعتمد على الانطباع وحده. قارن بين تخصصين أو أكثر من حيث الدراسة والوظائف والرواتب والمهارات.
            </p>
            <Link href="/compare">
              <Button className="gap-2">
                ابدأ المقارنة <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Try before you choose */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Lightbulb className="h-10 w-10 text-warning mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">جرّب التخصص قبل أن ترتبه</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
            لكل تخصص تحدٍ مصغر من 30 إلى 60 دقيقة يساعدك على تجربة نوع المشكلات قبل الالتزام.
          </p>
          <Link href="/departments">
            <Button variant="outline">استكشف التحديات</Button>
          </Link>
        </div>
      </section>

      {/* Roadmap to market */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold">خطة الجامعة إلى سوق العمل</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { year: 'السنة الأولى', title: 'أساسيات أكاديمية', desc: 'بناء الأساس في الرياضيات والفيزياء والبرمجة' },
            { year: 'السنة الثانية', title: 'أدوات التخصص', desc: 'بداية التعمق في أدوات ومواد التخصص' },
            { year: 'السنة الثالثة', title: 'اختيار المسار', desc: 'تحديد المسار الرئيسي والمساعد والتدريب' },
            { year: 'السنة الرابعة', title: 'الانطلاق', desc: 'مشروع التخرج، CV، مقابلات، تقديم للوظائف' },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-2">{item.year}</Badge>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/roadmap">
            <Button variant="outline" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              خطط لأربع سنوات
            </Button>
          </Link>
        </div>
      </section>

      {/* Careers 2030 */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Target className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">وظائف ومهارات 2030</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
            ابدأ من الوظيفة ثم اعرف التخصصات المؤدية إليها، واكتشف المهارات المطلوبة حتى 2030.
          </p>
          <Link href="/careers">
            <Button variant="outline">مستكشف الوظائف</Button>
          </Link>
        </div>
      </section>

      {/* Not a final verdict */}
      <section className="py-12 container mx-auto px-4">
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-6 flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold mb-1">ليست النتيجة حكمًا نهائيًا</h2>
              <p className="text-sm text-muted-foreground">
                النتائج مؤشرات إرشادية تساعدك على الاستكشاف، وليست حكمًا على قدرتك أو مستقبلك.
                استخدمها كنقطة بداية للتفكير، وليس كنقطة نهاية للقرار.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="py-12 container mx-auto px-4 max-w-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-right">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-10 w-10 text-calm-gold mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-4">ابدأ من نفسك، لا من ضغط الآخرين.</h2>
          <Link href="/quiz">
            <Button size="lg" className="gap-2">
              <Brain className="h-5 w-5" />
              ابدأ الاختبار الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
