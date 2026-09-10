'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Download, Heart, GitCompareArrows, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { EmptyState } from '@/components/empty-state';
import { useAppStore } from '@/store/use-app-store';
import { getDepartmentBySlug, accentColors } from '@/data/departments';
import { exportData } from '@/lib/storage';
import { cn } from '@/lib/utils';

export default function SavedPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const favorites = useAppStore((s) => s.favorites);
  const compareList = useAppStore((s) => s.compareList);
  const wishlist = useAppStore((s) => s.wishlist);
  const clearAll = useAppStore((s) => s.clearAll);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const removeFromWishlist = useAppStore((s) => s.removeFromWishlist);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  if (!hydrated) return null;

  const hasData = favorites.length > 0 || compareList.length > 0 || wishlist.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">البيانات المحفوظة</h1>
        {hasData && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => { const data = exportData(); navigator.clipboard.writeText(data); }}>
              <Download className="h-3 w-3" /> تصدير
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-1"><Trash2 className="h-3 w-3" /> مسح جميع بياناتي</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                  <AlertDialogDescription>سيتم حذف جميع بياناتك المحفوظة (المفضلة، المقارنة، الاختبار، الأولويات، الرغبات). لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={() => clearAll()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">نعم، احذف الكل</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {!hasData ? (
        <EmptyState
          title="لا توجد بيانات محفوظة"
          description="ابدأ بإضافة تخصصات إلى المفضلة أو قائمة المقارنة أو الرغبات"
          action={<Link href="/departments"><Button>تصفح الأقسام</Button></Link>}
        />
      ) : (
        <div className="space-y-6">
          {/* Favorites */}
          {favorites.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><Heart className="h-4 w-4 text-destructive" /> المفضلة ({favorites.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favorites.map(slug => {
                  const dept = getDepartmentBySlug(slug);
                  if (!dept) return null;
                  const accent = accentColors[dept.accentColor];
                  return (
                    <Card key={slug} className={cn(accent.border)}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <Link href={`/departments/${slug}`} className="font-bold text-sm hover:underline">{dept.nameAr}</Link>
                          <p className="text-xs text-muted-foreground">{dept.cinematicTagline}</p>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => toggleFavorite(slug)}><Trash2 className="h-3 w-3" /></Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compare list */}
          {compareList.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><GitCompareArrows className="h-4 w-4 text-primary" /> قائمة المقارنة ({compareList.length})</h2>
              <div className="flex flex-wrap gap-2">
                {compareList.map(slug => {
                  const dept = getDepartmentBySlug(slug);
                  return dept ? <Badge key={slug} variant="outline">{dept.nameAr}</Badge> : null;
                })}
              </div>
              <Link href="/compare"><Button variant="outline" size="sm" className="mt-2">فتح المقارنة</Button></Link>
            </div>
          )}

          {/* Wishlist */}
          {wishlist.length > 0 && (
            <div>
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> قائمة الرغبات ({wishlist.length})</h2>
              <div className="space-y-2">
                {wishlist.map((w, i) => {
                  const dept = getDepartmentBySlug(w.slug);
                  return dept ? (
                    <Card key={w.slug}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">{i + 1}.</span>
                          <Link href={`/departments/${w.slug}`} className="font-bold text-sm hover:underline mr-2">{dept.nameAr}</Link>
                          {w.notes && <p className="text-xs text-muted-foreground">{w.notes}</p>}
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => removeFromWishlist(w.slug)}><Trash2 className="h-3 w-3" /></Button>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </div>
              <Link href="/rank"><Button variant="outline" size="sm" className="mt-2">ترتيب الرغبات</Button></Link>
            </div>
          )}

          {/* Privacy note */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">لا تُرسل إجاباتك إلى خادم في النسخة الحالية. جميع بياناتك محفوظة محليًا على متصفحك فقط.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
