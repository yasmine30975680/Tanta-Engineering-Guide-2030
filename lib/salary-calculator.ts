import type { SalaryBaseline, SalaryProjection } from '@/types/department';
import { salaryBaselines, salaryProjections, getSalaryBaselines, getSalaryProjection } from '@/data/salaryBaselines';

export interface SalaryCalculationResult {
  baseline: SalaryBaseline | null;
  projection: SalaryProjection | null;
  scenarios: {
    conservative: { nominal2030: { low: number; mid: number; high: number }; real2030: { low: number; mid: number; high: number } };
    base: { nominal2030: { low: number; mid: number; high: number }; real2030: { low: number; mid: number; high: number } };
    optimistic: { nominal2030: { low: number; mid: number; high: number }; real2030: { low: number; mid: number; high: number } };
  };
  yearsTo2030: number;
}

export function calculateSalary2030(
  departmentSlug: string,
  careerFamily: string,
  country: 'egypt' | 'saudi' | 'uae' | 'remote' = 'egypt',
  experience: 'fresh' | 'mid' | 'senior' = 'fresh',
  customGrowthRate?: number,
  customInflationRate?: number,
  customBaselineYear?: number
): SalaryCalculationResult {
  const baselines = getSalaryBaselines(departmentSlug, careerFamily);
  const baseline = baselines.find((b) => b.country === country) || baselines[0] || null;
  const projection = getSalaryProjection(departmentSlug, careerFamily) || null;

  if (!baseline) {
    return {
      baseline: null,
      projection: null,
      scenarios: {
        conservative: { nominal2030: { low: 0, mid: 0, high: 0 }, real2030: { low: 0, mid: 0, high: 0 } },
        base: { nominal2030: { low: 0, mid: 0, high: 0 }, real2030: { low: 0, mid: 0, high: 0 } },
        optimistic: { nominal2030: { low: 0, mid: 0, high: 0 }, real2030: { low: 0, mid: 0, high: 0 } },
      },
      yearsTo2030: 0,
    };
  }

  const baselineYear = customBaselineYear || baseline.year;
  const yearsTo2030 = 2030 - baselineYear;

  let low: number, mid: number, high: number;
  if (experience === 'fresh') {
    low = baseline.freshGradLow; mid = baseline.freshGradMid; high = baseline.freshGradHigh;
  } else if (experience === 'mid') {
    low = baseline.midLevelLow; mid = baseline.midLevelMid; high = baseline.midLevelHigh;
  } else {
    low = baseline.seniorLow; mid = baseline.seniorMid; high = baseline.seniorHigh;
  }

  const growthRates = {
    conservative: customGrowthRate ?? projection?.conservativeGrowth ?? 0.08,
    base: customGrowthRate ?? projection?.baseGrowth ?? 0.12,
    optimistic: customGrowthRate ?? projection?.optimisticGrowth ?? 0.18,
  };

  const inflationRate = customInflationRate ?? 0.10;

  const compound = (value: number, rate: number, years: number) =>
    Math.round(value * Math.pow(1 + rate, years));

  const adjustForInflation = (value: number) =>
    Math.round(value / Math.pow(1 + inflationRate, yearsTo2030));

  const scenarios = {
    conservative: {
      nominal2030: { low: compound(low, growthRates.conservative, yearsTo2030), mid: compound(mid, growthRates.conservative, yearsTo2030), high: compound(high, growthRates.conservative, yearsTo2030) },
      real2030: { low: 0, mid: 0, high: 0 },
    },
    base: {
      nominal2030: { low: compound(low, growthRates.base, yearsTo2030), mid: compound(mid, growthRates.base, yearsTo2030), high: compound(high, growthRates.base, yearsTo2030) },
      real2030: { low: 0, mid: 0, high: 0 },
    },
    optimistic: {
      nominal2030: { low: compound(low, growthRates.optimistic, yearsTo2030), mid: compound(mid, growthRates.optimistic, yearsTo2030), high: compound(high, growthRates.optimistic, yearsTo2030) },
      real2030: { low: 0, mid: 0, high: 0 },
    },
  };

  scenarios.conservative.real2030 = {
    low: adjustForInflation(scenarios.conservative.nominal2030.low),
    mid: adjustForInflation(scenarios.conservative.nominal2030.mid),
    high: adjustForInflation(scenarios.conservative.nominal2030.high),
  };
  scenarios.base.real2030 = {
    low: adjustForInflation(scenarios.base.nominal2030.low),
    mid: adjustForInflation(scenarios.base.nominal2030.mid),
    high: adjustForInflation(scenarios.base.nominal2030.high),
  };
  scenarios.optimistic.real2030 = {
    low: adjustForInflation(scenarios.optimistic.nominal2030.low),
    mid: adjustForInflation(scenarios.optimistic.nominal2030.mid),
    high: adjustForInflation(scenarios.optimistic.nominal2030.high),
  };

  return { baseline, projection, scenarios, yearsTo2030 };
}

export function formatSalary(value: number, currency: string): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K ${currency}`;
  }
  return `${value} ${currency}`;
}

export function getSalaryGrowthData(
  baseline: number,
  growthRate: number,
  baselineYear: number,
  endYear: number = 2030
): { year: number; value: number }[] {
  const data: { year: number; value: number }[] = [];
  for (let year = baselineYear; year <= endYear; year++) {
    const years = year - baselineYear;
    data.push({ year, value: Math.round(baseline * Math.pow(1 + growthRate, years)) });
  }
  return data;
}
