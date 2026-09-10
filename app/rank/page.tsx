'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Pin, Trash2, RotateCcw, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/empty-state';
import { getTopRecommendations } from '@/lib/recommendation-engine';
import { useAppStore } from '@/store/use-app-store';
import { getDepartmentBySlug, accentColors } from '@/data/departments';
import { cn } from '@/lib/utils';

export default function RankPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const quizCompleted = useAppStore((s) => s.quizCompleted);
  const wishlist = useAppStore((s) => s.wishlist);
  const reorderWishlist = useAppStore((s) => s.reorderWishlist);
  const updateWishlistNotes = useAppStore((s) => s.updateWishlistNotes);
  const toggleWishlistPin = useAppStore((s) => s.toggleWishlistPin);
  const removeFromWishlist = useAppStore((s) => s.removeFromWishlist);
  const [hydrated, setHydrated] = useState(false);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  if (!hydrated) return null;

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">ترتيب الرغبات</h1>
        <EmptyState
          title="لا توجد رغبات بعد"
          description="أضف تخصصات إلى قائمة رغباتك من صفحة الأقسام"
          action={<Link href="/departments"><Button>تصفح الأقسام</Button></Link>}
        />
      </div>
    );
  }

  const recommendations = quizCompleted ? getTopRecommendations(quizAnswers, null, 99) : [];
  const recMap = new Map(recommendations.map(r => [r.departmentSlug, r]));

  const move = (index: number, dir: 'up' | 'down') => {
    const newList = [...wishlist];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    reorderWishlist(newList);
  };

  const exportList = () => {
    const text = wishlist.map((w, i) => {
      const dept = getDepartmentBySlug(w.slug);
      return `${i + 1}. ${dept?.nameAr || w.slug}${w.notes ? ` - ${w.notes}` : ''}`;
    }).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">ترتيب الرغبات</h1>
        <Button variant="outline" size="sm" onClick={exportList} className="gap-1"><Download className="h-3 w-3" /> تصدير</Button>
      </div>

      {/* Suggested vs personal */}
      {quizCompleted && recommendations.length > 0 && (
        <Card className="mb-4 bg-muted/30">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">الترتيب المقترح (حسب الاختبار):</p>
            <div className="flex flex-wrap gap-1">
              {recommendations.slice(0, 5).map((r, i) => {
                const dept = getDepartmentBySlug(r.departmentSlug);
                return dept ? <Badge key={r.departmentSlug} variant="outline" className="text-xs">{i + 1}. {dept.nameAr} ({r.finalScore})</Badge> : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {wishlist.map((item, index) => {
          const dept = getDepartmentBySlug(item.slug);
          if (!dept) return null;
          const accent = accentColors[dept.accentColor];
          const rec = recMap.get(item.slug);
          const isTopChoice = index === 0 && rec && rec.finalScore < 55;

          return (
            <Card key={item.slug} className={cn(accent.border)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => move(index, 'up')} disabled={index === 0} aria-label="تحريك لأعلى">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <span className="text-center text-sm font-bold">{index + 1}</span>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => move(index, 'down')} disabled={index === wishlist.length - 1} aria-label="تحريك لأسفل">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/departments/${dept.slug}`} className="font-bold text-sm hover:underline">{dept.nameAr}</Link>
                      {item.pinned && <Pin className="h-3 w-3 text-primary" />}
                    </div>
                    {rec && (
                      <p className="text-xs text-muted-foreground mb-1">تطابق: {rec.finalScore} - {rec.category}</p>
                    )}
                    {editingNotes === item.slug ? (
                      <Textarea
                        value={item.notes || ''}
                        onChange={(e) => updateWishlistNotes(item.slug, e.target.value)}
                        onBlur={() => setEditingNotes(null)}
                        placeholder="ملاحظات شخصية..."
                        className="text-xs"
                        rows={2}
                      />
                    ) : (
                      <p className="text-xs text-muted-foreground cursor-pointer" onClick={() => setEditingNotes(item.slug)}>
                        {item.notes || 'أضف ملاحظة...'}
                      </p>
                    )}
                    {isTopChoice && (
                      <div className="mt-2 flex items-start gap-1 text-xs text-warning">
                        <AlertCircle className="h-3 w-3 shrink-0 mt-0.5" />
                        <span>هذا الاختيار ممكن، لكن راجع هذه النقاط قبل تثبيته.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleWishlistPin(item.slug)} aria-label="تثبيت">
                      <Pin className={cn('h-3.5 w-3.5', item.pinned && 'fill-primary text-primary')} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeFromWishlist(item.slug)} aria-label="حذف">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2">
        <Link href="/report"><Button>عرض التقرير</Button></Link>
        <Link href="/departments"><Button variant="outline">إضافة المزيد</Button></Link>
      </div>
    </div>
  );
}
