import type { Department } from '@/types/department';
import { comparisonCriteria } from '@/data/comparisonCriteria';

export interface ComparisonRow {
  criterionId: string;
  labelAr: string;
  values: (number | string | null)[];
}

export function buildComparisonTable(
  departments: Department[],
  criteriaIds: string[]
): ComparisonRow[] {
  return criteriaIds.map((criterionId) => {
    const criterion = comparisonCriteria.find((c) => c.id === criterionId);
    if (!criterion) return { criterionId, labelAr: criterionId, values: [] };

    const values = departments.map((dept) => {
      if (criterion.ratingKey && criterion.ratingKey in dept.ratings) {
        return dept.ratings[criterion.ratingKey as keyof typeof dept.ratings] as number;
      }
      if (criterion.departmentKey && criterion.departmentKey in dept) {
        return dept[criterion.departmentKey as keyof Department] as number;
      }
      return null;
    });

    return {
      criterionId,
      labelAr: criterion.labelAr,
      values,
    };
  });
}

export function generateComparisonSummary(
  departments: Department[]
): { strengths: Record<string, string[]>; tradeoffs: string[] } {
  const strengths: Record<string, string[]> = {};
  const tradeoffs: string[] = [];

  for (const dept of departments) {
    const deptStrengths: string[] = [];
    if (dept.ratings.programming >= 4) deptStrengths.push('برمجة قوية');
    if (dept.ratings.math >= 4) deptStrengths.push('رياضيات متقدمة');
    if (dept.ratings.design >= 4) deptStrengths.push('إبداع وتصميم');
    if (dept.ratings.field >= 4) deptStrengths.push('عمل ميداني');
    if (dept.ratings.lab >= 4) deptStrengths.push('عمل مختبري');
    if (dept.remoteWorkPotential >= 4) deptStrengths.push('عمل عن بعد ممتاز');
    if (dept.gulfPotential >= 4) deptStrengths.push('فرص خليجية قوية');
    if (dept.entrepreneurshipPotential >= 4) deptStrengths.push('ريادة أعمال');
    if (dept.tracks.length >= 3) deptStrengths.push('مسارات متنوعة');
    strengths[dept.slug] = deptStrengths;
  }

  // Generate tradeoffs
  if (departments.length >= 2) {
    const d1 = departments[0];
    const d2 = departments[1];
    if (d1.ratings.programming > d2.ratings.programming + 1) {
      tradeoffs.push(`${d1.nameAr} يعتمد أكثر على البرمجة من ${d2.nameAr}`);
    }
    if (d2.ratings.programming > d1.ratings.programming + 1) {
      tradeoffs.push(`${d2.nameAr} يعتمد أكثر على البرمجة من ${d1.nameAr}`);
    }
    if (d1.ratings.field > d2.ratings.field + 1) {
      tradeoffs.push(`${d1.nameAr} يتطلب عملًا ميدانيًا أكثر من ${d2.nameAr}`);
    }
    if (d2.ratings.field > d1.ratings.field + 1) {
      tradeoffs.push(`${d2.nameAr} يتطلب عملًا ميدانيًا أكثر من ${d1.nameAr}`);
    }
    if (d1.remoteWorkPotential > d2.remoteWorkPotential + 1) {
      tradeoffs.push(`${d1.nameAr} يوفر فرصًا أفضل للعمل عن بعد`);
    }
    if (d2.remoteWorkPotential > d1.remoteWorkPotential + 1) {
      tradeoffs.push(`${d2.nameAr} يوفر فرصًا أفضل للعمل عن بعد`);
    }
    if (d1.gulfPotential > d2.gulfPotential + 1) {
      tradeoffs.push(`${d1.nameAr} يوفر فرصًا أفضل في الخليج`);
    }
    if (d2.gulfPotential > d1.gulfPotential + 1) {
      tradeoffs.push(`${d2.nameAr} يوفر فرصًا أفضل في الخليج`);
    }
  }

  return { strengths, tradeoffs };
}

export function explainDifference(departments: Department[]): string[] {
  const explanations: string[] = [];

  if (departments.length < 2) return explanations;

  const d1 = departments[0];
  const d2 = departments[1];

  // Study style
  if (Math.abs(d1.ratings.programming - d2.ratings.programming) >= 2) {
    const higher = d1.ratings.programming > d2.ratings.programming ? d1 : d2;
    const lower = d1.ratings.programming > d2.ratings.programming ? d2 : d1;
    explanations.push(`${higher.nameAr} يعتمد بشكل أكبر على البرمجة (${higher.ratings.programming}/5) بينما ${lower.nameAr} يعتمد عليها أقل (${lower.ratings.programming}/5)`);
  }

  // Work environment
  if (Math.abs(d1.ratings.field - d2.ratings.field) >= 2) {
    const fieldHeavy = d1.ratings.field > d2.ratings.field ? d1 : d2;
    const officeHeavy = d1.ratings.field > d2.ratings.field ? d2 : d1;
    explanations.push(`${fieldHeavy.nameAr} يتطلب عملًا ميدانيًا أكثر، بينما ${officeHeavy.nameAr} أكثر مكتبيًا`);
  }

  // Remote work
  if (Math.abs(d1.remoteWorkPotential - d2.remoteWorkPotential) >= 2) {
    const remote = d1.remoteWorkPotential > d2.remoteWorkPotential ? d1 : d2;
    explanations.push(`${remote.nameAr} يوفر فرصًا أفضل للعمل عن بعد`);
  }

  // Gulf opportunities
  if (Math.abs(d1.gulfPotential - d2.gulfPotential) >= 2) {
    const gulf = d1.gulfPotential > d2.gulfPotential ? d1 : d2;
    explanations.push(`${gulf.nameAr} يوفر فرصًا أوسع في دول الخليج`);
  }

  // Tracks
  if (Math.abs(d1.tracks.length - d2.tracks.length) >= 2) {
    const more = d1.tracks.length > d2.tracks.length ? d1 : d2;
    explanations.push(`${more.nameAr} يوفر مسارات فرعية أكثر (${more.tracks.length}) مما يمنحك مرونة أكبر`);
  }

  if (explanations.length === 0) {
    explanations.push('التخصصان متقاربان في معظم المعايير، الفرق في التفاصيل الدقيقة');
  }

  return explanations;
}
