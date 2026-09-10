'use client';

import { useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Heart, GitCompareArrows, Plus, Clock, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, Briefcase, DollarSign, GraduationCap, Wrench, Users, MapPin, ChevronLeft, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RatingBar } from '@/components/rating-bar';
import { SectionHeading } from '@/components/section-heading';
import { departments, getDepartmentBySlug, accentColors } from '@/data/departments';
import { getCareersByDepartment } from '@/data/careers';
import { getSalaryBaselines, confidenceLabels } from '@/data/salaryBaselines';
import { calculateSalary2030, formatSalary } from '@/lib/salary-calculator';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';

export default function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hydrate = useAppStore((s) => s.hydrate);
  const favorites = useAppStore((s) => s.favorites);
  const compareList = useAppStore((s) => s.compareList);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const addToWishlist = useAppStore((s) => s.addToWishlist);
  const challengeResults = useAppStore((s) => s.challengeResults);
  const setChallengeResult = useAppStore((s) => s.setChallengeResult);

  useEffect(() => { hydrate(); }, [hydrate]);

  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  const accent = accentColors[dept.accentColor];
  const isFav = favorites.includes(dept.slug);
  const inCompare = compareList.includes(dept.slug);
  const compareFull = compareList.length >= 4 && !inCompare;
  const relatedDepts = dept.relatedDepartments.map(s => getDepartmentBySlug(s)).filter(Boolean);
  const careers = getCareersByDepartment(dept.slug);
  const challengeResult = challengeResults[dept.slug];

  const ratingLabels: { key: keyof typeof dept.ratings; label: string }[] = [
    { key: 'math', label: 'الرياضيات' },
    { key: 'physics', label: 'الفيزياء' },
    { key: 'chemistry', label: 'الكيمياء' },
    { key: 'programming', label: 'البرمجة' },
    { key: 'design', label: 'التصميم' },
    { key: 'lab', label: 'المختبر' },
    { key: 'field', label: 'الموقع' },
    { key: 'teamwork', label: 'العمل الجماعي' },
    { key: 'communication', label: 'التواصل' },
    { key: 'continuousLearning', label: 'التعلم المستمر' },
    { key: 'safetyResponsibility', label: 'مسؤولية السلامة' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Link href="/departments" className="text-muted-foreground hover:text-foreground">الأقسام</Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="font-medium">{dept.nameAr}</span>
      </div>

      {/* Hero */}
      <div className={cn('relative overflow-hidden rounded-2xl border p-6 md:p-10 mb-6', accent.border, accent.bg)}>
        <div className={cn('absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l', accent.from, accent.to)} />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={dept.category === 'general' ? 'default' : 'secondary'}>
                {dept.category === 'general' ? 'قسم عام' : 'برنامج مميز'}
              </Badge>
              <span className="text-sm text-muted-foreground" dir="ltr">{dept.abbreviation}</span>
            </div>
            <h1 className="text-xl md:text-3xl font-bold mb-1">{dept.nameAr}</h1>
            <p className="text-sm text-muted-foreground mb-3" dir="ltr">{dept.nameEn}</p>
            <p className={cn('text-base md:text-lg font-medium', accent.text)}>{dept.cinematicTagline}</p>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl">{dept.detailedOverview}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="icon" onClick={() => toggleFavorite(dept.slug)} aria-label="المفضلة" className={cn(isFav && 'text-destructive border-destructive')}>
              <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => toggleCompare(dept.slug)} disabled={compareFull} aria-label="مقارنة" className={cn(inCompare && 'text-primary border-primary')}>
              <GitCompareArrows className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => addToWishlist(dept.slug)} aria-label="إضافة للرغبات">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: TrendingUp, label: 'العمل عن بعد', value: `${dept.remoteWorkPotential}/5` },
          { icon: MapPin, label: 'فرص الخليج', value: `${dept.gulfPotential}/5` },
          { icon: Sparkles, label: 'ريادة الأعمال', value: `${dept.entrepreneurshipPotential}/5` },
          { icon: Briefcase, label: 'السفر', value: `${dept.travelPotential}/5` },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-3 text-center">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="font-bold text-sm">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="study">الدراسة</TabsTrigger>
          <TabsTrigger value="tracks">المسارات</TabsTrigger>
          <TabsTrigger value="careers">الوظائف</TabsTrigger>
          <TabsTrigger value="salary">الرواتب</TabsTrigger>
          <TabsTrigger value="roadmap">خطة 4 سنوات</TabsTrigger>
          <TabsTrigger value="challenge">جرّب قبل أن تختار</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6 mt-4">
          {/* In a minute */}
          <Card>
            <CardHeader><CardTitle className="text-lg">القسم في دقيقة</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { q: 'ماذا تدرس؟', a: dept.commonStudyTopics.slice(0, 4).join('، ') },
                { q: 'ماذا تصنع؟', a: dept.whatEngineersDo.slice(0, 3).join('، ') },
                { q: 'أي مشكلة تحل؟', a: dept.problemsSolved.slice(0, 2).join('، ') },
                { q: 'أين تعمل؟', a: dept.workEnvironments.slice(0, 3).join('، ') },
                { q: 'ما أكبر تحدٍ؟', a: dept.realisticChallenges[0] },
              ].map((item, i) => (
                <div key={i} className="border-r-2 border-primary/30 pr-3">
                  <div className="text-xs text-muted-foreground">{item.q}</div>
                  <div className="text-sm font-medium">{item.a}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What you'll love */}
          <Card>
            <CardHeader><CardTitle className="text-lg">ماذا ستحب داخل القسم؟</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dept.favoriteActivities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What might exhaust you */}
          <Card>
            <CardHeader><CardTitle className="text-lg">ما الذي قد يرهقك؟</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dept.realisticChallenges.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Personality fit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base text-success">قد يناسبك إذا كنت...</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dept.personalityFit.map((p, i) => <Badge key={i} variant="outline" className="text-success border-success/30">{p}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base text-muted-foreground">قد لا يناسبك إذا...</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dept.personalityMismatch.map((p, i) => <Badge key={i} variant="outline" className="text-muted-foreground">{p}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market 2030 */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm mb-1">سوق 2030</h3>
                  <p className="text-sm text-muted-foreground">{dept.market2030}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study */}
        <TabsContent value="study" className="space-y-6 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">طبيعة الدراسة</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{dept.studyStyle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ratingLabels.map(({ key, label }) => (
                  <RatingBar key={key} label={label} value={dept.ratings[key]} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">محاور دراسية شائعة</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">الأساسيات</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.foundationalTopics.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">قلب التخصص</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.appliedTopics.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">تطبيقات</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.commonStudyTopics.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">موضوعات متقدمة</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.advancedTopics.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">الأدوات والمهارات</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">الأدوات</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.tools.map((t, i) => <Badge key={i} variant="secondary" dir="ltr">{t}</Badge>)}
                </div>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">المهارات التقنية</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.technicalSkills.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">المهارات الشخصية</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.softSkills.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracks */}
        <TabsContent value="tracks" className="space-y-4 mt-4">
          <SectionHeading title="المسارات الفرعية" subtitle={`${dept.tracks.length} مسارات داخل ${dept.nameAr}`} />
          {dept.tracks.map((track, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">{track.nameAr}</CardTitle>
                <p className="text-xs text-muted-foreground" dir="ltr">{track.nameEn}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{track.description}</p>
                <div>
                  <h4 className="font-semibold text-xs mb-1">ما الذي تتعلمه:</h4>
                  <div className="flex flex-wrap gap-1">
                    {track.whatYouLearn.map((t, j) => <Badge key={j} variant="outline" className="text-[10px]">{t}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-xs mb-1">الأدوات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {track.tools.map((t, j) => <Badge key={j} variant="secondary" className="text-[10px]" dir="ltr">{t}</Badge>)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div><span className="font-semibold">مشروع Portfolio:</span> {track.portfolioProject}</div>
                  <div><span className="font-semibold">تدريب مستهدف:</span> {track.trainingTarget}</div>
                  <div><span className="font-semibold">بيئة العمل:</span> {track.workEnvironment}</div>
                  <div><span className="font-semibold">العمل عن بعد:</span> {track.remotePotential}/5</div>
                  <div><span className="font-semibold">فرص الخليج:</span> {track.gulfPotential}/5</div>
                </div>
                <div className="text-xs">
                  <p><span className="font-semibold">أثر AI:</span> {track.aiImpact}</p>
                  <p className="mt-1"><span className="font-semibold">مستقبل 2030:</span> {track.future2030}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Careers */}
        <TabsContent value="careers" className="space-y-4 mt-4">
          <SectionHeading title="الوظائف المحتملة" subtitle={`وظائف مرتبطة بـ${dept.nameAr}`} />
          {careers.length > 0 ? careers.map((career, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm">{career.titleAr}</h3>
                    <p className="text-xs text-muted-foreground" dir="ltr">{career.titleEn}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{career.workEnvironment}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{career.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div><span className="font-semibold">المهارات:</span> {career.skills.join('، ')}</div>
                  <div><span className="font-semibold">طريق الدخول:</span> {career.entryPath}</div>
                  <div><span className="font-semibold">مشروع Portfolio:</span> {career.portfolioProject}</div>
                </div>
              </CardContent>
            </Card>
          )) : <p className="text-sm text-muted-foreground">لا تتوفر بيانات وظيفية كافية لهذا التخصص.</p>}
        </TabsContent>

        {/* Salary */}
        <TabsContent value="salary" className="space-y-4 mt-4">
          <SectionHeading title="رواتب 2026 وتوقعات 2030" subtitle="نطاقات الرواتب حسب المسار" />
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <p>توقعات 2030 ناتجة عن سيناريو حسابي مبني على بيانات سنة الأساس وافتراض نمو اسمي، وليست ضمانًا أو توقعًا رسميًا. ارتفاع الراتب الاسمي لا يعني بالضرورة ارتفاع القوة الشرائية.</p>
              </div>
            </CardContent>
          </Card>
          {dept.salaryFamilyMapping.map((family) => {
            const baselines = getSalaryBaselines(dept.slug, family);
            if (baselines.length === 0) return null;
            const calc = calculateSalary2030(dept.slug, family, 'egypt', 'fresh');
            return (
              <Card key={family}>
                <CardHeader>
                  <CardTitle className="text-base">{family}</CardTitle>
                  {calc.baseline && (
                    <Badge variant="outline" className={cn('text-xs w-fit', confidenceLabels[calc.baseline.confidenceLevel].color)}>
                      الثقة: {confidenceLabels[calc.baseline.confidenceLevel].ar}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {calc.baseline ? (
                    <div className="space-y-2 text-sm">
                      <div className="font-semibold text-xs text-muted-foreground">خريج جديد في مصر ({calc.baseline.year}):</div>
                      <div className="flex gap-3">
                        <span className="text-xs">الحد الأدنى: {formatSalary(calc.baseline.freshGradLow, calc.baseline.currency)}</span>
                        <span className="text-xs">الوسطي: {formatSalary(calc.baseline.freshGradMid, calc.baseline.currency)}</span>
                        <span className="text-xs">الأعلى: {formatSalary(calc.baseline.freshGradHigh, calc.baseline.currency)}</span>
                      </div>
                      <div className="font-semibold text-xs text-muted-foreground mt-2">توقع 2030 (سيناريو أساسي - اسمي):</div>
                      <div className="flex gap-3">
                        <span className="text-xs">الحد الأدنى: {formatSalary(calc.scenarios.base.nominal2030.low, calc.baseline.currency)}</span>
                        <span className="text-xs">الوسطي: {formatSalary(calc.scenarios.base.nominal2030.mid, calc.baseline.currency)}</span>
                        <span className="text-xs">الأعلى: {formatSalary(calc.scenarios.base.nominal2030.high, calc.baseline.currency)}</span>
                      </div>
                      <div className="font-semibold text-xs text-muted-foreground mt-2">توقع 2030 (قوة شرائية 2026):</div>
                      <div className="flex gap-3">
                        <span className="text-xs">الحد الأدنى: {formatSalary(calc.scenarios.base.real2030.low, calc.baseline.currency)}</span>
                        <span className="text-xs">الوسطي: {formatSalary(calc.scenarios.base.real2030.mid, calc.baseline.currency)}</span>
                        <span className="text-xs">الأعلى: {formatSalary(calc.scenarios.base.real2030.high, calc.baseline.currency)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">لا تتوفر بيانات موثوقة كافية لهذا المسار.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
          <Link href="/salaries">
            <Button variant="outline" className="w-full gap-2">
              <DollarSign className="h-4 w-4" /> حاسبة الرواتب الكاملة
            </Button>
          </Link>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap" className="space-y-4 mt-4">
          <SectionHeading title="خطة الأربع سنوات" subtitle="تزيد الخطة قدرتك التنافسية" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dept.fourYearRoadmap.map((year, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {year.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {year.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link href="/roadmap">
            <Button variant="outline" className="w-full gap-2">
              <MapPin className="h-4 w-4" /> خطط مفصلة لكل مسار
            </Button>
          </Link>
        </TabsContent>

        {/* Try before you choose */}
        <TabsContent value="challenge" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-warning" />
                {dept.miniChallenge.title}
              </CardTitle>
              <Badge variant="outline" className="text-xs w-fit">
                <Clock className="h-3 w-3 ml-1" />
                {dept.miniChallenge.durationMinutes} دقيقة
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{dept.miniChallenge.description}</p>
              <div>
                <h4 className="font-semibold text-sm mb-2">الخطوات:</h4>
                <ol className="space-y-2">
                  {dept.miniChallenge.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs shrink-0">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">أسئلة للتأمل:</h4>
                <ul className="space-y-1">
                  {dept.miniChallenge.reflectionQuestions.map((q, i) => (
                    <li key={i} className="text-sm text-muted-foreground">- {q}</li>
                  ))}
                </ul>
              </div>
              {challengeResult && (
                <div className="p-3 rounded-lg bg-muted text-sm">
                  <span className="font-semibold">نتيجتك السابقة:</span> {challengeResult.enjoyed ? 'استمتعت بالتحدي' : 'لم تستمتع كثيرًا'}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={challengeResult?.enjoyed ? 'default' : 'outline'}
                  onClick={() => setChallengeResult(dept.slug, { enjoyed: true })}
                >
                  استمتعت بالتحدي
                </Button>
                <Button
                  size="sm"
                  variant={!challengeResult || challengeResult.enjoyed ? 'outline' : 'default'}
                  onClick={() => setChallengeResult(dept.slug, { enjoyed: false })}
                >
                  لم أستمتع كثيرًا
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related departments */}
      {relatedDepts.length > 0 && (
        <div className="mt-8">
          <SectionHeading title="أقسام قريبة منه" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedDepts.map((d) => d && <DepartmentCardMini key={d.slug} dept={d} />)}
          </div>
        </div>
      )}

      {/* Does it fit you? */}
      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="p-5 text-center">
          <h3 className="font-bold mb-2">هل يناسبك هذا التخصص؟</h3>
          <p className="text-sm text-muted-foreground mb-3">اكتشف مدى تطابق هذا التخصص مع ميولك من خلال الاختبار</p>
          <Link href="/quiz">
            <Button className="gap-2"><Brain className="h-4 w-4" /> ابدأ الاختبار</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function DepartmentCardMini({ dept }: { dept: NonNullable<ReturnType<typeof getDepartmentBySlug>> }) {
  const accent = accentColors[dept.accentColor];
  return (
    <Link href={`/departments/${dept.slug}`}>
      <Card className={cn('hover:shadow-lg transition-shadow', accent.border)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground" dir="ltr">{dept.abbreviation}</span>
          </div>
          <h3 className="font-bold text-sm">{dept.nameAr}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{dept.shortDescription}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
