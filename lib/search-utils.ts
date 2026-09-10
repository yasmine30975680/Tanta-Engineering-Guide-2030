import { departments } from '@/data/departments';
import type { Department } from '@/types/department';

function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function searchDepartments(query: string): Department[] {
  if (!query.trim()) return departments;
  const normalized = normalizeArabic(query);

  return departments.filter((dept) => {
    const nameAr = normalizeArabic(dept.nameAr);
    const nameEn = dept.nameEn.toLowerCase();
    const abbr = dept.abbreviation.toLowerCase();
    const shortDesc = normalizeArabic(dept.shortDescription);
    const tagline = normalizeArabic(dept.cinematicTagline);

    return (
      nameAr.includes(normalized) ||
      nameEn.includes(normalized) ||
      abbr.includes(normalized) ||
      shortDesc.includes(normalized) ||
      tagline.includes(normalized)
    );
  });
}

export interface FilterOptions {
  category?: 'general' | 'credit' | 'all';
  minMath?: number;
  minPhysics?: number;
  minChemistry?: number;
  minProgramming?: number;
  minDesign?: number;
  minLab?: number;
  minField?: number;
  minRemoteWork?: number;
  minGulf?: number;
  minEntrepreneurship?: number;
  minTravel?: number;
  maxField?: number;
}

export function filterDepartments(
  list: Department[],
  filters: FilterOptions
): Department[] {
  return list.filter((dept) => {
    if (filters.category && filters.category !== 'all' && dept.category !== filters.category) return false;
    if (filters.minMath && dept.ratings.math < filters.minMath) return false;
    if (filters.minPhysics && dept.ratings.physics < filters.minPhysics) return false;
    if (filters.minChemistry && dept.ratings.chemistry < filters.minChemistry) return false;
    if (filters.minProgramming && dept.ratings.programming < filters.minProgramming) return false;
    if (filters.minDesign && dept.ratings.design < filters.minDesign) return false;
    if (filters.minLab && dept.ratings.lab < filters.minLab) return false;
    if (filters.minField && dept.ratings.field < filters.minField) return false;
    if (filters.maxField && dept.ratings.field > filters.maxField) return false;
    if (filters.minRemoteWork && dept.remoteWorkPotential < filters.minRemoteWork) return false;
    if (filters.minGulf && dept.gulfPotential < filters.minGulf) return false;
    if (filters.minEntrepreneurship && dept.entrepreneurshipPotential < filters.minEntrepreneurship) return false;
    if (filters.minTravel && dept.travelPotential < filters.minTravel) return false;
    return true;
  });
}
