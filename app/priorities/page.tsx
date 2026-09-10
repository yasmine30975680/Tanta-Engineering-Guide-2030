'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { priorityPresets, defaultPriorityProfile } from '@/data/priorityPresets';
import { useAppStore } from '@/store/use-app-store';
import type { PriorityProfile } from '@/types/department';
import { useToast } from '@/hooks/use-toast';

const priorityFields: { key: keyof PriorityProfile; label: string }[] = [
  { key: 'enjoymentOfStudy', label: 'الاستمتاع بالدراسة' },
  { key: 'egyptOpportunities', label: 'فرص مصر' },
  { key: 'gulfOpportunities', label: 'فرص الخليج' },
  { key: 'internationalWork', label: 'العمل الدولي' },
  { key: 'incomePotential', label: 'الدخل المحتمل' },
  { key: 'stability', label: 'الاستقرار' },
  { key: 'remoteWork', label: 'العمل عن بعد' },
  { key: 'travel', label: 'السفر' },
  { key: 'entrepreneurship', label: 'ريادة الأعمال' },
  { key: 'creativity', label: 'الإبداع' },
  { key: 'socialImpact', label: 'الأثر الاجتماعي' },
  { key: 'sustainability', label: 'الاستدامة' },
  { key: 'fieldWork', label: 'العمل الميداني' },
  { key: 'lowFieldWork', label: 'قلة العمل الميداني' },
  { key: 'fieldGrowthRate', label: 'سرعة نمو المجال' },
  { key: 'flexibilityBetweenTracks', label: 'المرونة بين المسارات' },
];

export default function PrioritiesPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const priorities = useAppStore((s) => s.priorities);
  const setPriorities = useAppStore((s) => s.setPriorities);
  const { toast } = useToast();
  const [local, setLocal] = useState<PriorityProfile>(defaultPriorityProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);
  useEffect(() => { if (hydrated) setLocal(priorities); }, [hydrated, priorities]);

  const total = Object.values(local).reduce((a, b) => a + b, 0);
  const incomeHigh = local.incomePotential > 40;

  const updateField = (key: keyof PriorityProfile, value: number) => {
    setLocal(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof priorityPresets[0]) => {
    setLocal(preset.profile);
  };

  const save = () => {
    if (total !== 100) {
      toast({ title: 'المجموع يجب أن يساوي 100', description: `الحالي: ${total}`, variant: 'destructive' });
      return;
    }
    setPriorities(local);
    toast({ title: 'تم حفظ الأولويات' });
  };

  const reset = () => {
    setLocal(defaultPriorityProfile);
    setPriorities(defaultPriorityProfile);
  };

  if (!hydrated) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">تحديد الأولويات المهنية</h1>
      <p className="text-sm text-muted-foreground mb-4">وزّع 100 نقطة على أولوياتك. المجموع يجب أن يساوي 100.</p>

      {/* Total */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">المجموع: <span className={total === 100 ? 'text-success' : 'text-destructive'}>{total}</span> / 100</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={reset} className="gap-1"><RotateCcw className="h-3 w-3" /> إعادة ضبط</Button>
          <Button size="sm" onClick={save} className="gap-1"><Save className="h-3 w-3" /> حفظ</Button>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">قوالب جاهزة</h3>
        <div className="flex flex-wrap gap-2">
          {priorityPresets.map(p => (
            <Button key={p.id} variant="outline" size="sm" className="text-xs" onClick={() => applyPreset(p)}>{p.nameAr}</Button>
          ))}
        </div>
      </div>

      {/* Income warning */}
      {incomeHigh && (
        <Alert className="mb-4 border-warning/30 bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-sm">الدخل عامل مهم</AlertTitle>
          <AlertDescription className="text-xs">
            الدخل عامل مهم، لكنه يتغير أسرع من طبيعة الدراسة والعمل. تأكد أنك لا تختار تخصصًا لا تستمتع بمشكلاته.
          </AlertDescription>
        </Alert>
      )}

      {/* Sliders */}
      <div className="space-y-4">
        {priorityFields.map(({ key, label }) => (
          <Card key={key}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm font-bold text-primary">{local[key]}</span>
              </div>
              <Slider
                value={[local[key]]}
                min={0}
                max={20}
                step={1}
                onValueChange={(v) => updateField(key, v[0])}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Link href="/results"><Button variant="outline">إعادة حساب النتائج</Button></Link>
        <Link href="/rank"><Button variant="outline">ترتيب الرغبات</Button></Link>
      </div>
    </div>
  );
}
