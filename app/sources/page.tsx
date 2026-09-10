import Link from 'next/link';
import { ExternalLink, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { sources } from '@/data/sources';
import { departments, getDepartmentBySlug } from '@/data/departments';

export const metadata = {
  title: 'المصادر والتحديثات | بوصلة مهندس طنطا 2030',
  description: 'قائمة المصادر المستخدمة في بوصلة مهندس طنطا 2030 مع درجات الثقة وتاريخ التحديث.',
};

const badgeLabels: Record<string, string> = {
  official: 'رسمي',
  market: 'سوقي',
  estimate: 'تقديري',
  'needs-review': 'يحتاج مراجعة',
};

const confidenceLabels: Record<string, { ar: string; color: string }> = {
  high: { ar: 'مرتفع', color: 'text-success' },
  medium: { ar: 'متوسط', color: 'text-warning' },
  low: { ar: 'منخفض', color: 'text-muted-foreground' },
  'needs-review': { ar: 'يحتاج مراجعة', color: 'text-destructive' },
};

export default function SourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">المصادر والتحديثات</h1>
      </div>

      <Alert className="mb-6 border-warning/30 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-sm">تنبيه</AlertTitle>
        <AlertDescription className="text-xs">
          بوصلة مهندس طنطا 2030 منصة إرشادية طلابية مستقلة، وليست موقعًا رسميًا تابعًا لجامعة طنطا أو كلية الهندسة.
          نستخدم المصادر للاستشهاد فقط ولا ننسخها حرفيًا.
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        {sources.map((source) => (
          <Card key={source.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{source.title}</h3>
                  <p className="text-xs text-muted-foreground">{source.publisher}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Badge variant="outline" className="text-[10px]">{badgeLabels[source.badge] || source.badge}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${confidenceLabels[source.confidenceLevel]?.color || ''}`}>
                    الثقة: {confidenceLabels[source.confidenceLevel]?.ar || source.confidenceLevel}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                <div>تاريخ النشر: {source.publishDate}</div>
                <div>تاريخ الاطلاع: {source.accessedDate}</div>
                <div>نوع البيانات: {source.dataType}</div>
              </div>

              {source.departmentSlugs.length > 0 && (
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">التخصصات المرتبطة: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {source.departmentSlugs.map(slug => {
                      const dept = getDepartmentBySlug(slug);
                      return dept ? <Badge key={slug} variant="outline" className="text-[10px]">{dept.nameAr}</Badge> : null;
                    })}
                  </div>
                </div>
              )}

              {source.notes && <p className="text-xs text-muted-foreground italic mb-2">{source.notes}</p>}

              {source.url && (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> فتح المصدر
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/methodology"><Button variant="outline" className="gap-1"><FileText className="h-4 w-4" /> منهجية التوصية</Button></Link>
      </div>
    </div>
  );
}
