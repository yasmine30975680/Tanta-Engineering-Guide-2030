'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DepartmentCard } from '@/components/department-card';
import { getGeneralDepartments } from '@/data/departments';
import { useAppStore } from '@/store/use-app-store';

export default function GeneralDepartmentsPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  const depts = getGeneralDepartments();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/departments"><Button variant="ghost" size="sm" className="gap-1"><ChevronLeft className="h-4 w-4" /> كل الأقسام</Button></Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">أقسام الشعبة العامة</h1>
      <p className="text-sm text-muted-foreground mb-6">9 أقسام دراسية في الشعبة العامة بكلية الهندسة جامعة طنطا</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {depts.map((dept) => <DepartmentCard key={dept.slug} department={dept} />)}
      </div>
    </div>
  );
}
