'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, Lightbulb, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTopRecommendations, getSurpriseRecommendation, getNeedsTrialRecommendations, getScoreCategory, computeTraitScores } from '@/lib/recommendation-engine';
import { useAppStore } from '@/store/use-app-store';
import { getDepartmentBySlug, accentColors } from '@/data/departments';
import { cn } from '@/lib/utils';

export default function ResultsPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const quizCompleted = useAppStore((s) => s.quizCompleted);
  const priorities = useAppStore((s) => s.priorities);
  const resetQuiz = useAppStore((s) => s.resetQuiz);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  if (!hydrated) return null;

  if (!quizCompleted || Object.keys(quizAnswers).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <Brain className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">لم تكمل الاختبار بعد</h1>
        <p className="text-sm text-muted-foreground mb-4">أكمل اختبار الميول للحصول على نتائج التوصية</p>
        <Link href="/quiz"><Button className="gap-2"><Brain className="h-4 w-4" /> ابدأ الاختبار</Button></Link>
      </div>
    );
  }

  const top5 = getTopRecommendations(quizAnswers, priorities, 5);
  const surprise = getSurpriseRecommendation(quizAnswers);
  const needsTrial = getNeedsTrialRecommendations(quizAnswers);
  const traitScores = computeTraitScores(quizAnswers);

  // Top 5 traits
  const topTraits = Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const traitLabels: Record<string, string> = {
    programming: 'البرمجة', electronics: 'الإلكترونيات', energy: 'الطاقة', mechanics: 'الميكانيكا',
    chemistry: 'الكيمياء', visual_design: 'التصميم البصري', spatial_thinking: 'التفكير المكاني',
    structures: 'المنشآت', urban: 'المدن', medical_tech: 'الطب والتكنولوجيا', management: 'الإدارة',
    lab: 'المختبر', field: 'الموقع', office: 'العمل المكتبي', math: 'الرياضيات', physics: 'الفيزياء',
    communication: 'التواصل', continuous_learning: 'التعلم المستمر', remote_work: 'العمل عن بعد',
    travel: 'السفر', stability: 'الاستقرار', entrepreneurship: 'ريادة الأعمال',
    safety_responsibility: 'المسؤولية والسلامة', deep_specialization: 'التخصص العميق',
    interdisciplinary: 'التخصص المتداخل', sustainability: 'الاستدامة', socialImpact: 'الأثر الاجتماعي',
    creativity: 'الإبداع',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">البصمة الهندسية</h1>
      <p className="text-sm text-muted-foreground mb-6">النتيجة مؤشر إرشادي، وليست حكمًا على قدرة الطالب.</p>

      {/* Trait profile */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">أقوى 5 دوافع</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {topTraits.map(([trait, score]) => (
            <div key={trait} className="flex items-center gap-3">
              <span className="text-sm font-medium w-32">{traitLabels[trait] || trait}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${score}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-left">{score}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 5 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">أفضل 5 تخصصات لك</h2>
        <div className="space-y-3">
          {top5.map((rec, i) => {
            const dept = getDepartmentBySlug(rec.departmentSlug);
            if (!dept) return null;
            const accent = accentColors[dept.accentColor];
            const cat = getScoreCategory(rec.finalScore);
            return (
              <Card key={rec.departmentSlug} className={cn('print-avoid-break', accent.border)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">{i + 1}</span>
                        <Link href={`/departments/${dept.slug}`} className="font-bold text-sm hover:underline">{dept.nameAr}</Link>
                      </div>
                      <p className={cn('text-xs', accent.text)}>{dept.cinematicTagline}</p>
                    </div>
                    <div className="text-center shrink-0">
                      <div className={cn('text-2xl font-bold', cat.color)}>{rec.finalScore}</div>
                      <div className={cn('text-[10px]', cat.color)}>{cat.label}</div>
                    </div>
                  </div>

                  {priorities && (
                    <div className="flex gap-3 text-[10px] text-muted-foreground mb-2">
                      <span>الأساسي: {rec.baseScore}</span>
                      <span>الأولويات: {rec.priorityScore}</span>
                      <span>النهائي: {rec.finalScore}</span>
                    </div>
                  )}

                  {rec.whatBoosted.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-success mb-1">ما الذي رفع النتيجة:</p>
                      <ul className="space-y-0.5">
                        {rec.whatBoosted.map((b, j) => <li key={j} className="text-xs text-muted-foreground">+ {b}</li>)}
                      </ul>
                    </div>
                  )}
                  {rec.whatReduced.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-warning mb-1">ما الذي خفضها:</p>
                      <ul className="space-y-0.5">
                        {rec.whatReduced.map((r, j) => <li key={j} className="text-xs text-muted-foreground">- {r}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="mb-2">
                    <p className="text-xs font-semibold mb-1">تحديات:</p>
                    <ul className="space-y-0.5">
                      {rec.challenges.map((c, j) => <li key={j} className="text-xs text-muted-foreground">- {c}</li>)}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground italic">ما قد يغير القرار: {rec.whatCouldChangeDecision}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Surprise */}
      <Card className="mb-4 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-sm">تخصص قد يفاجئك</h3>
          </div>
          <p className="text-sm font-medium">{surprise.departmentName}</p>
          <p className="text-xs text-muted-foreground mt-1">قد لا يكون في ترتيبك الأول، لكن يستحق الاستكشاف قبل اتخاذ القرار.</p>
          <Link href={`/departments/${surprise.departmentSlug}`}>
            <Button variant="outline" size="sm" className="mt-2 gap-1">استكشف <ArrowLeft className="h-3 w-3" /></Button>
          </Link>
        </CardContent>
      </Card>

      {/* Needs trial */}
      {needsTrial.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              تخصصات تحتاج تجربة عملية قبل الاختيار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {needsTrial.map((rec) => (
                <Link key={rec.departmentSlug} href={`/departments/${rec.departmentSlug}?tab=challenge`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">{rec.departmentName}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Link href="/priorities"><Button variant="outline" className="gap-2">تعديل الأولويات</Button></Link>
        <Link href="/rank"><Button variant="outline" className="gap-2">ترتيب الرغبات</Button></Link>
        <Link href="/report"><Button variant="outline" className="gap-2">عرض التقرير</Button></Link>
        <Button variant="ghost" className="gap-2" onClick={() => { resetQuiz(); }}><RotateCcw className="h-4 w-4" /> إعادة الاختبار</Button>
      </div>
    </div>
  );
}
