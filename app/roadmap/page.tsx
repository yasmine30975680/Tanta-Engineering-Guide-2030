'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, CheckCircle2, Wrench, Briefcase, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departments, getDepartmentBySlug, accentColors } from '@/data/departments';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';

export default function RoadmapPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const roadmapProgress = useAppStore((s) => s.roadmapProgress);
  const toggleRoadmapItem = useAppStore((s) => s.toggleRoadmapItem);
  const [selectedSlug, setSelectedSlug] = useState(departments[0].slug);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  if (!hydrated) return null;

  const dept = getDepartmentBySlug(selectedSlug);
  if (!dept) return null;
  const accent = accentColors[dept.accentColor];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">خطة الأربع سنوات</h1>
      <p className="text-sm text-muted-foreground mb-4">تزيد الخطة قدرتك التنافسية، ولا تضمن أعلى راتب أو وظيفة.</p>

      <Select value={selectedSlug} onValueChange={setSelectedSlug}>
        <SelectTrigger className="mb-6 max-w-md"><SelectValue /></SelectTrigger>
        <SelectContent>
          {departments.map(d => <SelectItem key={d.slug} value={d.slug}>{d.nameAr}</SelectItem>)}
        </SelectContent>
      </Select>

      {/* Year cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {dept.fourYearRoadmap.map((year, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                {year.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {year.items.map((item, j) => {
                  const id = `${dept.slug}-${i}-${j}`;
                  const done = roadmapProgress[id];
                  return (
                    <li key={j}>
                      <button
                        onClick={() => toggleRoadmapItem(id)}
                        className="flex items-start gap-2 text-sm text-right w-full hover:bg-muted/30 p-1 rounded"
                      >
                        <CheckCircle2 className={cn('h-4 w-4 shrink-0 mt-0.5', done ? 'text-success fill-success/20' : 'text-muted-foreground/30')} />
                        <span className={cn(done && 'line-through text-muted-foreground')}>{item.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Track roadmaps */}
      <h2 className="text-lg font-bold mb-4">خطط المسارات الفرعية</h2>
      <div className="space-y-4">
        {dept.tracks.map((track, i) => (
          <Card key={i} className={cn(accent.border)}>
            <CardHeader>
              <CardTitle className="text-base">{track.nameAr}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h4 className="font-semibold text-xs mb-1 flex items-center gap-1"><Wrench className="h-3 w-3" /> الأدوات</h4>
                  <div className="flex flex-wrap gap-1">
                    {track.tools.map((t, j) => <Badge key={j} variant="secondary" className="text-[10px]" dir="ltr">{t}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-xs mb-1 flex items-center gap-1"><Briefcase className="h-3 w-3" /> وظائف محتملة</h4>
                  <div className="flex flex-wrap gap-1">
                    {track.potentialJobs.map((j, k) => <Badge key={k} variant="outline" className="text-[10px]">{j}</Badge>)}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1">مشروع Portfolio</h4>
                <p className="text-xs text-muted-foreground">{track.portfolioProject}</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1">تدريب مستهدف</h4>
                <p className="text-xs text-muted-foreground">{track.trainingTarget}</p>
              </div>
              <div className="flex items-start gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 shrink-0 mt-0.5" />
                <span>أثر AI: {track.aiImpact}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
