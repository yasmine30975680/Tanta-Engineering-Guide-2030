'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Printer, Copy, Pencil, RotateCcw, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/use-app-store';
import { getTopRecommendations, getSurpriseRecommendation, computeTraitScores } from '@/lib/recommendation-engine';
import { getDepartmentBySlug, accentColors, departments } from '@/data/departments';
import { calculateSalary2030, formatSalary } from '@/lib/salary-calculator';
import { cn } from '@/lib/utils';

export default function ReportPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const quizCompleted = useAppStore((s) => s.quizCompleted);
  const quizCompletedAt = useAppStore((s) => s.quizCompletedAt);
  const priorities = useAppStore((s) => s.priorities);
  const wishlist = useAppStore((s) => s.wishlist);
  const resetQuiz = useAppStore((s) => s.resetQuiz);
  const [hydrated, setHydrated] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  if (!hydrated) return null;

  if (!quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 text-center max-w-2xl">
        <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">لا يوجد تقرير بعد</h1>
        <p className="text-sm text-muted-foreground mb-4">أكمل اختبار الميول لإنشاء تقرير القرار النهائي</p>
        <Link href="/quiz"><Button>ابدأ الاختبار</Button></Link>
      </div>
    );
  }

  const top5 = getTopRecommendations(quizAnswers, priorities, 5);
  const top3 = top5.slice(0, 3);
  const surprise = getSurpriseRecommendation(quizAnswers);
  const traitScores = computeTraitScores(quizAnswers);
  const topTraits = Object.entries(traitScores).sort(([, a], [, b]) => b - a).slice(0, 5);

  const traitLabels: Record<string, string> = {
    programming: 'البرمجة', electronics: 'الإلكترونيات', energy: 'الطاقة', mechanics: 'الميكانيكا',
    chemistry: 'الكيمياء', visual_design: 'التصميم البصري', spatial_thinking: 'التفكير المكاني',
    structures: 'المنشآت', urban: 'المدن', medical_tech: 'الطب والتكنولوجيا', management: 'الإدارة',
    lab: 'المختبر', field: 'الموقع', office: 'العمل المكتبي', math: 'الرياضيات', physics: 'الفيزياء',
    communication: 'التواصل', continuous_learning: 'التعلم المستمر', remote_work: 'العمل عن بعد',
    travel: 'السفر', stability: 'الاستقرار', entrepreneurship: 'ريادة الأعمال',
    safety_responsibility: 'المسؤولية والسلامة', deep_specialization: 'التخصص العميق',
    interdisciplinary: 'التخصص المتداخل', sustainability: 'الاستدامة', socialImpact: 'الأثر الاجتماعي', creativity: 'الإبداع',
  };

  const copySummary = () => {
    const text = `تقرير بوصلة مهندس طنطا 2030\nالاسم: ${name || 'غير محدد'}\nالتاريخ: ${quizCompletedAt?.split('T')[0] || 'غير محدد'}\n\nأعلى 5 تخصصات:\n${top5.map((r, i) => `${i + 1}. ${r.departmentName} (${r.finalScore})`).join('\n')}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Action buttons - no-print */}
      <div className="no-print flex flex-wrap items-center gap-2 mb-6">
        <Button onClick={() => window.print()} className="gap-2"><Printer className="h-4 w-4" /> طباعة / PDF</Button>
        <Button variant="outline" onClick={copySummary} className="gap-2"><Copy className="h-4 w-4" /> نسخ ملخص</Button>
        <Link href="/rank"><Button variant="outline" className="gap-2"><Pencil className="h-4 w-4" /> تعديل الرغبات</Button></Link>
        <Link href="/priorities"><Button variant="outline" className="gap-2"><Pencil className="h-4 w-4" /> تعديل الأولويات</Button></Link>
        <Button variant="ghost" className="gap-2" onClick={() => { resetQuiz(); }}><RotateCcw className="h-4 w-4" /> إعادة الاختبار</Button>
      </div>

      {/* Report header */}
      <Card className="mb-6 print-avoid-break">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-1">تقرير القرار النهائي</h1>
          <p className="text-sm text-muted-foreground">بوصلة مهندس طنطا 2030</p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="اسم الطالب (اختياري)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center text-sm border-b border-border bg-transparent py-1 px-2 outline-none focus:border-primary max-w-xs"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">تاريخ الاختبار: {quizCompletedAt?.split('T')[0] || 'غير محدد'}</p>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="mb-6 border-warning/30 bg-warning/5 print-avoid-break">
        <CardContent className="p-4 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة. النتائج مؤشرات إرشادية وليست حكمًا نهائيًا.</p>
        </CardContent>
      </Card>

      {/* Trait profile */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-lg">البصمة الهندسية</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {topTraits.map(([trait, score]) => (
            <div key={trait} className="flex items-center gap-3">
              <span className="text-sm font-medium w-32">{traitLabels[trait] || trait}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${score}%` }} />
              </div>
              <span className="text-xs w-8 text-left">{score}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 5 */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-lg">أعلى 5 تخصصات</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {top5.map((rec, i) => {
            const dept = getDepartmentBySlug(rec.departmentSlug);
            if (!dept) return null;
            return (
              <div key={rec.departmentSlug} className="flex items-center gap-3 border-b pb-2 last:border-0">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{dept.nameAr}</p>
                  <p className="text-xs text-muted-foreground">{rec.category} - {rec.finalScore}%</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top 3 comparison */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-lg">مقارنة أفضل 3</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">المعيار</th>
                  {top3.map(r => {
                    const d = getDepartmentBySlug(r.departmentSlug);
                    return <th key={r.departmentSlug} className="text-right p-2">{d?.nameAr}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2 font-medium">النتيجة</td>{top3.map(r => <td key={r.departmentSlug} className="p-2 font-bold">{r.finalScore}</td>)}</tr>
                <tr className="border-b"><td className="p-2 font-medium">العمل عن بعد</td>{top3.map(r => { const d = getDepartmentBySlug(r.departmentSlug); return <td key={r.departmentSlug} className="p-2">{d?.remoteWorkPotential}/5</td>; })}</tr>
                <tr className="border-b"><td className="p-2 font-medium">فرص الخليج</td>{top3.map(r => { const d = getDepartmentBySlug(r.departmentSlug); return <td key={r.departmentSlug} className="p-2">{d?.gulfPotential}/5</td>; })}</tr>
                <tr className="border-b"><td className="p-2 font-medium">ريادة الأعمال</td>{top3.map(r => { const d = getDepartmentBySlug(r.departmentSlug); return <td key={r.departmentSlug} className="p-2">{d?.entrepreneurshipPotential}/5</td>; })}</tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* First choice reasons */}
      {top5[0] && (
        <Card className="mb-6 print-avoid-break">
          <CardHeader><CardTitle className="text-lg">أسباب الرغبة الأولى: {getDepartmentBySlug(top5[0].departmentSlug)?.nameAr}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {top5[0].whatBoosted.length > 0 && (
              <div>
                <p className="font-semibold text-success text-xs mb-1">عوامل الرفع:</p>
                <ul className="space-y-0.5">{top5[0].whatBoosted.map((b, i) => <li key={i} className="text-xs text-muted-foreground">+ {b}</li>)}</ul>
              </div>
            )}
            {top5[0].whatReduced.length > 0 && (
              <div>
                <p className="font-semibold text-warning text-xs mb-1">عوامل الخفض:</p>
                <ul className="space-y-0.5">{top5[0].whatReduced.map((r, i) => <li key={i} className="text-xs text-muted-foreground">- {r}</li>)}</ul>
              </div>
            )}
            <div>
              <p className="font-semibold text-xs mb-1">التحديات:</p>
              <ul className="space-y-0.5">{top5[0].challenges.map((c, i) => <li key={i} className="text-xs text-muted-foreground">- {c}</li>)}</ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Salary 2030 */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-lg">رواتب 2030 في 3 سيناريوهات</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {top3.map(rec => {
            const dept = getDepartmentBySlug(rec.departmentSlug);
            if (!dept || dept.salaryFamilyMapping.length === 0) return null;
            const family = dept.salaryFamilyMapping[0];
            const calc = calculateSalary2030(dept.slug, family, 'egypt', 'fresh');
            if (!calc.baseline) return null;
            return (
              <div key={rec.departmentSlug} className="border-b pb-2 last:border-0">
                <p className="font-semibold text-sm mb-1">{dept.nameAr} ({family})</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">محافظ:</span> {formatSalary(calc.scenarios.conservative.nominal2030.mid, calc.baseline.currency)}</div>
                  <div><span className="text-muted-foreground">أساسي:</span> {formatSalary(calc.scenarios.base.nominal2030.mid, calc.baseline.currency)}</div>
                  <div><span className="text-muted-foreground">متفائل:</span> {formatSalary(calc.scenarios.optimistic.nominal2030.mid, calc.baseline.currency)}</div>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">الفرق بين الاسمي والحقيقي: القيمة الحقيقية بقوة شرائية 2026 أقل من الاسمية بسبب التضخم.</p>
        </CardContent>
      </Card>

      {/* Questions for advisor */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-lg">أسئلة للمرشد الأكاديمي</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>- هل نسبة القبول في {getDepartmentBySlug(top5[0]?.departmentSlug || '')?.nameAr || 'التخصص الأول'} تتوافق مع تقديري؟</li>
            <li>- ما هي فرص التدريب المتاحة في هذا التخصص؟</li>
            <li>- هل يمكنني الانتقال بين المسارات داخل التخصص؟</li>
            <li>- ما هي المواد التي قد تكون صعبة بالنسبة لي؟</li>
            <li>- هل هناك فرص عمل محلية في مدينتي بعد التخرج؟</li>
          </ul>
        </CardContent>
      </Card>

      {/* Wishlist */}
      {wishlist.length > 0 && (
        <Card className="mb-6 print-avoid-break">
          <CardHeader><CardTitle className="text-lg">ترتيب الرغبات الشخصي</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-1">
              {wishlist.map((w, i) => {
                const dept = getDepartmentBySlug(w.slug);
                return <li key={w.slug} className="text-sm">{i + 1}. {dept?.nameAr || w.slug}{w.notes ? ` - ${w.notes}` : ''}</li>;
              })}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Sources */}
      <Card className="mb-6 print-avoid-break">
        <CardHeader><CardTitle className="text-sm">المصادر</CardTitle></CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">راجع صفحة المصادر للتفاصيل الكاملة حول مصادر البيانات ودرجات الثقة.</p>
          <Link href="/sources" className="no-print"><Button variant="outline" size="sm" className="mt-2">صفحة المصادر</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
