'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DepartmentCard } from '@/components/department-card';
import { EmptyState } from '@/components/empty-state';
import { departments } from '@/data/departments';
import { searchDepartments, filterDepartments, type FilterOptions } from '@/lib/search-utils';
import { useAppStore } from '@/store/use-app-store';
import type { DepartmentCategory } from '@/types/department';

export default function DepartmentsPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<DepartmentCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => { hydrate(); }, [hydrate]);

  const filtered = useMemo(() => {
    let list = searchDepartments(query);
    list = filterDepartments(list, { ...filters, category });
    return list;
  }, [query, category, filters]);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setFilters({});
  };

  const hasActiveFilters = query || category !== 'all' || Object.keys(filters).length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">جميع الأقسام والبرامج</h1>
        <p className="text-sm text-muted-foreground">استكشف 15 تخصصًا وبرنامجًا في هندسة طنطا</p>
      </div>

      {/* Search & Category */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث بالعربية أو الإنجليزية أو الاختصار..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={category === 'all' ? 'default' : 'outline'}
            onClick={() => setCategory('all')}
            size="sm"
          >الكل ({departments.length})</Button>
          <Button
            variant={category === 'general' ? 'default' : 'outline'}
            onClick={() => setCategory('general')}
            size="sm"
          >عامة (9)</Button>
          <Button
            variant={category === 'credit' ? 'default' : 'outline'}
            onClick={() => setCategory('credit')}
            size="sm"
          >مميزة (6)</Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1"
        >
          <Filter className="h-4 w-4" />
          فلاتر
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 p-4 rounded-lg border bg-card space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">فلاتر متقدمة</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-xs">
              <X className="h-3 w-3" /> إعادة ضبط
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { key: 'minMath', label: 'الرياضيات ≥3' },
              { key: 'minPhysics', label: 'الفيزياء ≥3' },
              { key: 'minChemistry', label: 'الكيمياء ≥3' },
              { key: 'minProgramming', label: 'البرمجة ≥3' },
              { key: 'minDesign', label: 'التصميم ≥3' },
              { key: 'minLab', label: 'المختبر ≥3' },
              { key: 'minField', label: 'الموقع ≥3' },
              { key: 'minRemoteWork', label: 'العمل عن بعد ≥3' },
              { key: 'minGulf', label: 'فرص الخليج ≥3' },
              { key: 'minEntrepreneurship', label: 'ريادة الأعمال ≥3' },
            ].map((f) => {
              const isActive = !!filters[f.key as keyof FilterOptions];
              return (
                <Button
                  key={f.key}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    const newFilters = { ...filters };
                    if (isActive) {
                      delete newFilters[f.key as keyof FilterOptions];
                    } else {
                      (newFilters as Record<string, unknown>)[f.key] = 3;
                    }
                    setFilters(newFilters);
                  }}
                >
                  {f.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لا توجد نتائج"
          description="جرّب تعديل البحث أو الفلاتر للعثور على ما تبحث عنه."
          action={hasActiveFilters ? <Button onClick={resetFilters} variant="outline">إعادة ضبط الفلاتر</Button> : undefined}
        />
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} تخصص</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
