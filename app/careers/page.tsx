'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { careers, careerGroups, getCareersByGroup } from '@/data/careers';
import { getDepartmentBySlug, accentColors } from '@/data/departments';
import { cn } from '@/lib/utils';

export default function CareersPage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredCareers = selectedGroup ? getCareersByGroup(selectedGroup) : careers;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">مستكشف الوظائف</h1>
      <p className="text-sm text-muted-foreground mb-6">ابدأ من الوظيفة ثم اعرف التخصصات المؤدية إليها</p>

      {/* Groups */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant={selectedGroup === null ? 'default' : 'outline'} size="sm" onClick={() => setSelectedGroup(null)}>الكل</Button>
        {careerGroups.map(g => (
          <Button key={g.id} variant={selectedGroup === g.id ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setSelectedGroup(g.id)}>
            {g.nameAr}
          </Button>
        ))}
      </div>

      {/* Career cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCareers.map(career => (
          <Card key={career.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm">{career.titleAr}</h3>
                  <p className="text-xs text-muted-foreground" dir="ltr">{career.titleEn}</p>
                </div>
                <Badge variant="outline" className="text-xs">{career.workEnvironment}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{career.description}</p>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold">التخصصات المرتبطة:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {career.departmentSlugs.map(s => {
                      const dept = getDepartmentBySlug(s);
                      return dept ? (
                        <Link key={s} href={`/departments/${s}`}>
                          <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-accent">{dept.nameAr}</Badge>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">المهارات:</span> {career.skills.join('، ')}
                </div>
                <div>
                  <span className="font-semibold">الأدوات:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {career.tools.map((t, i) => <Badge key={i} variant="secondary" className="text-[10px]" dir="ltr">{t}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> <span className="font-semibold">السفر:</span> {career.travelPotential}/5</div>
                <div className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> <span className="font-semibold">راتب أساسي (مصر):</span> {career.salaryBaselineEGP.toLocaleString()} EGP</div>
                <div className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> <span className="font-semibold">سيناريو 2030:</span> {career.salary2030Low.toLocaleString()} - {career.salary2030High.toLocaleString()} EGP</div>
                <div><span className="font-semibold">مشروع Portfolio:</span> {career.portfolioProject}</div>
                <div><span className="font-semibold">طريق الدخول:</span> {career.entryPath}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
