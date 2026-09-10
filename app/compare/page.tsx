'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GitCompareArrows, X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/empty-state';
import { departments, getDepartmentBySlug, accentColors } from '@/data/departments';
import { comparisonModes, comparisonCriteria } from '@/data/comparisonCriteria';
import { buildComparisonTable, generateComparisonSummary, explainDifference } from '@/lib/comparison-engine';
import { useAppStore } from '@/store/use-app-store';
import { RatingBar } from '@/components/rating-bar';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const compareList = useAppStore((s) => s.compareList);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const removeFromCompare = useAppStore((s) => s.removeFromCompare);
  const [mode, setMode] = useState('quick');
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => { hydrate(); }, [hydrate]);

  const selectedDepts = compareList.map(s => getDepartmentBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof getDepartmentBySlug>>[];
  const currentMode = comparisonModes.find(m => m.id === mode) || comparisonModes[0];
  const table = buildComparisonTable(selectedDepts, currentMode.criteriaIds);
  const summary = generateComparisonSummary(selectedDepts);
  const explanations = explainDifference(selectedDepts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">مقارنة التخصصات</h1>
      <p className="text-sm text-muted-foreground mb-6">اختر من 2 إلى 4 تخصصات للمقارنة</p>

      {/* Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {departments.map((dept) => {
            const isSelected = compareList.includes(dept.slug);
            const disabled = !isSelected && compareList.length >= 4;
            return (
              <Button
                key={dept.slug}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                disabled={disabled}
                onClick={() => toggleCompare(dept.slug)}
                className="text-xs"
              >
                {isSelected && <X className="h-3 w-3 ml-1" />}
                {dept.nameAr}
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">{compareList.length}/4 مختارة</p>
      </div>

      {selectedDepts.length < 2 ? (
        <EmptyState
          title="اختر تخصصين على الأقل"
          description="اختر تخصصين أو أكثر للمقارنة بينهما"
          action={<Link href="/departments"><Button variant="outline">تصفح الأقسام</Button></Link>}
        />
      ) : (
        <>
          {/* Mode selector */}
          <Tabs value={mode} onValueChange={setMode}>
            <TabsList className="flex-wrap h-auto mb-4">
              {comparisonModes.map(m => (
                <TabsTrigger key={m.id} value={m.id} className="text-xs">{m.labelAr}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={mode}>
              {/* Comparison table */}
              <Card className="mb-4 overflow-x-auto">
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3 font-semibold text-muted-foreground">المعيار</th>
                        {selectedDepts.map(d => (
                          <th key={d.slug} className="text-right p-3 font-semibold min-w-[120px]">
                            <div className="flex items-center justify-between gap-1">
                              <Link href={`/departments/${d.slug}`} className="hover:underline">{d.nameAr}</Link>
                              <button onClick={() => removeFromCompare(d.slug)} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((row) => (
                        <tr key={row.criterionId} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-medium text-xs">{row.labelAr}</td>
                          {row.values.map((val, i) => (
                            <td key={i} className="p-3 text-xs">
                              {typeof val === 'number' ? (
                                <div className="space-y-1">
                                  <span className="font-bold">{val}/5</span>
                                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${(val / 5) * 100}%` }} />
                                  </div>
                                </div>
                              ) : val ?? '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedDepts.map(d => (
                  <Card key={d.slug}>
                    <CardHeader><CardTitle className="text-sm">نقاط قوة: {d.nameAr}</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {summary.strengths[d.slug]?.map((s, i) => <Badge key={i} variant="outline" className="text-xs text-success border-success/30">{s}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tradeoffs */}
              {summary.tradeoffs.length > 0 && (
                <Card className="mb-4">
                  <CardHeader><CardTitle className="text-sm">التنازلات</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {summary.tradeoffs.map((t, i) => <li key={i} className="text-sm text-muted-foreground">- {t}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Explain difference */}
              <Button variant="outline" className="gap-2 mb-4" onClick={() => setShowExplain(!showExplain)}>
                <Lightbulb className="h-4 w-4" />
                اشرح الفرق الحقيقي
              </Button>
              {showExplain && (
                <Card className="animate-fade-in">
                  <CardContent className="p-4 space-y-2">
                    {explanations.map((e, i) => <p key={i} className="text-sm">{e}</p>)}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
