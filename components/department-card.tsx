'use client';

import Link from 'next/link';
import { Heart, GitCompareArrows, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/use-app-store';
import { accentColors } from '@/data/departments';
import type { Department } from '@/types/department';
import { cn } from '@/lib/utils';

interface DepartmentCardProps {
  department: Department;
  matchScore?: number;
}

export function DepartmentCard({ department, matchScore }: DepartmentCardProps) {
  const favorites = useAppStore((s) => s.favorites);
  const compareList = useAppStore((s) => s.compareList);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const addToWishlist = useAppStore((s) => s.addToWishlist);

  const isFav = favorites.includes(department.slug);
  const inCompare = compareList.includes(department.slug);
  const compareFull = compareList.length >= 4 && !inCompare;
  const accent = accentColors[department.accentColor];

  return (
    <Card className={cn('group relative overflow-hidden transition-all hover:shadow-lg print-card', accent.border)}>
      <div className={cn('h-1.5 w-full bg-gradient-to-l', accent.from, accent.to)} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={department.category === 'general' ? 'default' : 'secondary'}>
                {department.category === 'general' ? 'عام' : 'مميز'}
              </Badge>
              <span className="text-xs text-muted-foreground" dir="ltr">{department.abbreviation}</span>
            </div>
            <h3 className="font-bold text-base leading-tight">{department.nameAr}</h3>
            <p className="text-xs text-muted-foreground mt-0.5" dir="ltr">{department.nameEn}</p>
          </div>
          {matchScore !== undefined && (
            <div className="text-center shrink-0">
              <div className={cn('text-2xl font-bold', matchScore >= 75 ? 'text-success' : matchScore >= 55 ? 'text-warning' : 'text-muted-foreground')}>
                {matchScore}
              </div>
              <div className="text-[10px] text-muted-foreground">تطابق</div>
            </div>
          )}
        </div>

        <p className={cn('text-sm font-medium mb-2', accent.text)}>{department.cinematicTagline}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{department.shortDescription}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {department.commonStudyTopics.slice(0, 3).map((topic, i) => (
            <Badge key={i} variant="outline" className="text-[10px]">{topic}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {department.tracks.slice(0, 3).map((track, i) => (
            <span key={i} className="text-[10px] text-muted-foreground">
              {track.nameAr}{i < Math.min(2, department.tracks.length - 1) ? ' •' : ''}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Link href={`/departments/${department.slug}`} className="flex-1">
            <Button size="sm" className="w-full gap-1">
              التفاصيل
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleFavorite(department.slug)}
            aria-label="المفضلة"
            className={cn(isFav && 'text-destructive border-destructive')}
          >
            <Heart className={cn('h-4 w-4', isFav && 'fill-current')} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleCompare(department.slug)}
            disabled={compareFull}
            aria-label="مقارنة"
            className={cn(inCompare && 'text-primary border-primary')}
          >
            <GitCompareArrows className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addToWishlist(department.slug)}
            aria-label="إضافة للرغبات"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
