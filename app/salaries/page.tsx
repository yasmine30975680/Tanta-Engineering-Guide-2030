'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { departments, getDepartmentBySlug } from '@/data/departments';
import { salaryBaselines, getSalaryBaselines, confidenceLabels } from '@/data/salaryBaselines';
import { calculateSalary2030, formatSalary, getSalaryGrowthData } from '@/lib/salary-calculator';
import { sources } from '@/data/sources';

export default function SalariesPage() {
  const [deptSlug, setDeptSlug] = useState(departments[0].slug);
  const [careerFamily, setCareerFamily] = useState('');
  const [country, setCountry] = useState('egypt');
  const [experience, setExperience] = useState('fresh');
  const [scenario, setScenario] = useState('base');
  const [growthRate, setGrowthRate] = useState(12);
  const [inflationRate, setInflationRate] = useState(10);
  const [nominalMode, setNominalMode] = useState(true);

  useEffect(() => {
    const families = Array.from(new Set(salaryBaselines.filter(s => s.departmentSlug === deptSlug).map(s => s.careerFamily)));
    if (families.length > 0 && !families.includes(careerFamily)) {
      setCareerFamily(families[0]);
    }
  }, [deptSlug, careerFamily]);

  const families = Array.from(new Set(salaryBaselines.filter(s => s.departmentSlug === deptSlug).map(s => s.careerFamily)));
  const calc = calculateSalary2030(
    deptSlug, careerFamily,
    country as 'egypt' | 'saudi' | 'uae' | 'remote',
    experience as 'fresh' | 'mid' | 'senior',
    growthRate / 100,
    inflationRate / 100
  );

  const dept = getDepartmentBySlug(deptSlug);
  const currency = calc.baseline?.currency || 'EGP';
  const scenarioData = scenario === 'conservative' ? calc.scenarios.conservative : scenario === 'optimistic' ? calc.scenarios.optimistic : calc.scenarios.base;
  const displayData = nominalMode ? scenarioData.nominal2030 : scenarioData.real2030;
  const growthData = getSalaryGrowthData(calc.baseline?.freshGradMid || 0, growthRate / 100, calc.baseline?.year || 2026);

  const countryLabels: Record<string, string> = { egypt: 'مصر', saudi: 'السعودية', uae: 'الإمارات', remote: 'عن بعد (دولار)' };
  const experienceLabels: Record<string, string> = { fresh: 'خريج جديد', mid: 'خبرة متوسطة', senior: 'خبرة عالية' };
  const scenarioLabels: Record<string, string> = { conservative: 'محافظ', base: 'أساسي', optimistic: 'متفائل' };

  const relevantSources = sources.filter(s => s.departmentSlugs.includes(deptSlug));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">رواتب 2026 وتوقعات 2030</h1>
      <p className="text-sm text-muted-foreground mb-6">نطاقات الرواتب المحتملة لخريجي التخصص حسب المسار</p>

      {/* Disclaimer */}
      <Alert className="mb-6 border-warning/30 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-sm">تنبيه مهم</AlertTitle>
        <AlertDescription className="text-xs">
          توقعات 2030 ناتجة عن سيناريو حسابي مبني على بيانات سنة الأساس وافتراض نمو اسمي، وليست ضمانًا أو توقعًا رسميًا.
          ارتفاع الراتب الاسمي لا يعني بالضرورة ارتفاع القوة الشرائية.
        </AlertDescription>
      </Alert>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="text-xs mb-1">التخصص</Label>
          <Select value={deptSlug} onValueChange={setDeptSlug}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {departments.map(d => <SelectItem key={d.slug} value={d.slug}>{d.nameAr}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs mb-1">المسار</Label>
          <Select value={careerFamily} onValueChange={setCareerFamily}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {families.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs mb-1">الدولة</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="egypt">مصر</SelectItem>
              <SelectItem value="saudi">السعودية</SelectItem>
              <SelectItem value="uae">الإمارات</SelectItem>
              <SelectItem value="remote">عن بعد</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs mb-1">الخبرة</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fresh">خريج جديد</SelectItem>
              <SelectItem value="mid">خبرة متوسطة</SelectItem>
              <SelectItem value="senior">خبرة عالية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">معدل نمو الأجر السنوي</Label>
              <span className="text-sm font-bold">{growthRate}%</span>
            </div>
            <Slider value={[growthRate]} min={1} max={30} step={1} onValueChange={(v) => setGrowthRate(v[0])} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">معدل التضخم السنوي</Label>
              <span className="text-sm font-bold">{inflationRate}%</span>
            </div>
            <Slider value={[inflationRate]} min={0} max={25} step={1} onValueChange={(v) => setInflationRate(v[0])} />
          </CardContent>
        </Card>
      </div>

      {/* Scenario & mode */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <Label className="text-xs mb-1 block">السيناريو</Label>
          <Select value={scenario} onValueChange={setScenario}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">محافظ (8%)</SelectItem>
              <SelectItem value="base">أساسي (12%)</SelectItem>
              <SelectItem value="optimistic">متفائل (18%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={nominalMode} onCheckedChange={setNominalMode} id="nominal" />
          <Label htmlFor="nominal" className="text-xs">{nominalMode ? 'اسمي' : 'قوة شرائية'}</Label>
        </div>
      </div>

      {/* Results */}
      {calc.baseline ? (
        <>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>الراتب الأساسي ({calc.baseline.year}) - {countryLabels[country]} - {experienceLabels[experience]}</span>
                <Badge variant="outline" className={confidenceLabels[calc.baseline.confidenceLevel].color}>
                  الثقة: {confidenceLabels[calc.baseline.confidenceLevel].ar}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">الحد الأدنى</div>
                  <div className="text-lg font-bold">{formatSalary(experience === 'fresh' ? calc.baseline.freshGradLow : experience === 'mid' ? calc.baseline.midLevelLow : calc.baseline.seniorLow, currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">القيمة الوسطية</div>
                  <div className="text-lg font-bold text-primary">{formatSalary(experience === 'fresh' ? calc.baseline.freshGradMid : experience === 'mid' ? calc.baseline.midLevelMid : calc.baseline.seniorMid, currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">الحد الأعلى</div>
                  <div className="text-lg font-bold">{formatSalary(experience === 'fresh' ? calc.baseline.freshGradHigh : experience === 'mid' ? calc.baseline.midLevelHigh : calc.baseline.seniorHigh, currency)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                توقع 2030 - سيناريو {scenarioLabels[scenario]} ({nominalMode ? 'اسمي' : 'قوة شرائية 2026'})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">الحد الأدنى</div>
                  <div className="text-lg font-bold">{formatSalary(displayData.low, currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">القيمة الوسطية</div>
                  <div className="text-lg font-bold text-primary">{formatSalary(displayData.mid, currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">الحد الأعلى</div>
                  <div className="text-lg font-bold">{formatSalary(displayData.high, currency)}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                هذه افتراضات حسابية وليست توقعات اقتصادية رسمية. سنوات النمو: {calc.yearsTo2030}
              </p>
            </CardContent>
          </Card>

          {/* Scenario comparison */}
          <Card className="mb-4">
            <CardHeader><CardTitle className="text-sm">مقارنة السيناريوهات الثلاثة (2030 - اسمي)</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'محافظ', data: calc.scenarios.conservative.nominal2030, rate: 8 },
                  { name: 'أساسي', data: calc.scenarios.base.nominal2030, rate: 12 },
                  { name: 'متفائل', data: calc.scenarios.optimistic.nominal2030, rate: 18 },
                ].map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-xs font-semibold w-16">{s.name} ({s.rate}%)</span>
                    <div className="flex-1 flex gap-2 text-xs">
                      <span>{formatSalary(s.data.low, currency)}</span>
                      <span className="text-muted-foreground">-</span>
                      <span>{formatSalary(s.data.mid, currency)}</span>
                      <span className="text-muted-foreground">-</span>
                      <span>{formatSalary(s.data.high, currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          {relevantSources.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">المصادر</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relevantSources.map(s => (
                    <div key={s.id} className="text-xs">
                      <span className="font-semibold">{s.title}</span> - <span className="text-muted-foreground">{s.publisher}</span>
                      <Badge variant="outline" className="ml-2 text-[10px]">{s.badge === 'official' ? 'رسمي' : s.badge === 'market' ? 'سوقي' : s.badge === 'estimate' ? 'تقديري' : 'يحتاج مراجعة'}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            لا تتوفر بيانات موثوقة كافية لهذا المسار. راجع صفحة المصادر للتحديث.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
