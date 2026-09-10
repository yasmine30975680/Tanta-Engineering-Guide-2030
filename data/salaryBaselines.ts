import type { SalaryBaseline, SalaryProjection, ConfidenceLevel } from '@/types/department';

export const salaryBaselines: SalaryBaseline[] = [
  // Computer & Control
  { departmentSlug: 'computer-control', careerFamily: 'Software', country: 'egypt', freshGradLow: 12000, freshGradMid: 18000, freshGradHigh: 28000, midLevelLow: 25000, midLevelMid: 40000, midLevelHigh: 60000, seniorLow: 50000, seniorMid: 80000, seniorHigh: 120000, currency: 'EGP', year: 2026, confidenceLevel: 'high', sourceId: 'src-003' },
  { departmentSlug: 'computer-control', careerFamily: 'Software', country: 'saudi', freshGradLow: 6000, freshGradMid: 9000, freshGradHigh: 14000, midLevelLow: 14000, midLevelMid: 20000, midLevelHigh: 30000, seniorLow: 28000, seniorMid: 40000, seniorHigh: 60000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },
  { departmentSlug: 'computer-control', careerFamily: 'Embedded', country: 'egypt', freshGradLow: 10000, freshGradMid: 15000, freshGradHigh: 22000, midLevelLow: 20000, midLevelMid: 32000, midLevelHigh: 48000, seniorLow: 40000, seniorMid: 65000, seniorHigh: 95000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'computer-control', careerFamily: 'Automation', country: 'egypt', freshGradLow: 9000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 18000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 35000, seniorMid: 55000, seniorHigh: 80000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'computer-control', careerFamily: 'Software', country: 'uae', freshGradLow: 7000, freshGradMid: 10000, freshGradHigh: 15000, midLevelLow: 16000, midLevelMid: 24000, midLevelHigh: 35000, seniorLow: 32000, seniorMid: 45000, seniorHigh: 70000, currency: 'AED', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },

  // Electronics & Communications
  { departmentSlug: 'electronics-communications', careerFamily: 'Telecom', country: 'egypt', freshGradLow: 10000, freshGradMid: 16000, freshGradHigh: 24000, midLevelLow: 22000, midLevelMid: 35000, midLevelHigh: 52000, seniorLow: 42000, seniorMid: 68000, seniorHigh: 100000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'electronics-communications', careerFamily: 'Telecom', country: 'saudi', freshGradLow: 5500, freshGradMid: 8500, freshGradHigh: 13000, midLevelLow: 13000, midLevelMid: 19000, midLevelHigh: 28000, seniorLow: 26000, seniorMid: 38000, seniorHigh: 55000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },
  { departmentSlug: 'electronics-communications', careerFamily: 'Networks', country: 'egypt', freshGradLow: 11000, freshGradMid: 17000, freshGradHigh: 26000, midLevelLow: 24000, midLevelMid: 38000, midLevelHigh: 56000, seniorLow: 45000, seniorMid: 72000, seniorHigh: 105000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },

  // Electrical Power
  { departmentSlug: 'electrical-power', careerFamily: 'Power Systems', country: 'egypt', freshGradLow: 8000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 16000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 32000, seniorMid: 52000, seniorHigh: 78000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'electrical-power', careerFamily: 'Power Systems', country: 'saudi', freshGradLow: 5000, freshGradMid: 8000, freshGradHigh: 12000, midLevelLow: 12000, midLevelMid: 18000, midLevelHigh: 27000, seniorLow: 24000, seniorMid: 36000, seniorHigh: 52000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },
  { departmentSlug: 'electrical-power', careerFamily: 'Renewables', country: 'egypt', freshGradLow: 9000, freshGradMid: 16000, freshGradHigh: 24000, midLevelLow: 18000, midLevelMid: 32000, midLevelHigh: 48000, seniorLow: 36000, seniorMid: 60000, seniorHigh: 90000, currency: 'EGP', year: 2026, confidenceLevel: 'low', sourceId: 'src-009' },

  // Mechanical Power
  { departmentSlug: 'mechanical-power', careerFamily: 'HVAC', country: 'egypt', freshGradLow: 7000, freshGradMid: 13000, freshGradHigh: 18000, midLevelLow: 14000, midLevelMid: 26000, midLevelHigh: 38000, seniorLow: 28000, seniorMid: 48000, seniorHigh: 70000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'mechanical-power', careerFamily: 'HVAC', country: 'saudi', freshGradLow: 4500, freshGradMid: 7500, freshGradHigh: 11000, midLevelLow: 11000, midLevelMid: 17000, midLevelHigh: 25000, seniorLow: 22000, seniorMid: 34000, seniorHigh: 48000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },

  // Production & Design
  { departmentSlug: 'production-design', careerFamily: 'Mechanical Design', country: 'egypt', freshGradLow: 8000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 16000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 32000, seniorMid: 52000, seniorHigh: 78000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'production-design', careerFamily: 'Manufacturing', country: 'egypt', freshGradLow: 7000, freshGradMid: 12000, freshGradHigh: 17000, midLevelLow: 14000, midLevelMid: 24000, midLevelHigh: 36000, seniorLow: 28000, seniorMid: 44000, seniorHigh: 65000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },

  // Chemical
  { departmentSlug: 'chemical-petrochemical', careerFamily: 'Process', country: 'egypt', freshGradLow: 9000, freshGradMid: 15000, freshGradHigh: 22000, midLevelLow: 18000, midLevelMid: 30000, midLevelHigh: 45000, seniorLow: 36000, seniorMid: 58000, seniorHigh: 85000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'chemical-petrochemical', careerFamily: 'Oil and Gas', country: 'saudi', freshGradLow: 6000, freshGradMid: 10000, freshGradHigh: 15000, midLevelLow: 15000, midLevelMid: 22000, midLevelHigh: 33000, seniorLow: 30000, seniorMid: 45000, seniorHigh: 65000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-004' },

  // Architecture
  { departmentSlug: 'architecture', careerFamily: 'Architectural Design', country: 'egypt', freshGradLow: 7000, freshGradMid: 12000, freshGradHigh: 17000, midLevelLow: 14000, midLevelMid: 24000, midLevelHigh: 36000, seniorLow: 28000, seniorMid: 44000, seniorHigh: 65000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'architecture', careerFamily: 'BIM', country: 'saudi', freshGradLow: 5000, freshGradMid: 8000, freshGradHigh: 12000, midLevelLow: 12000, midLevelMid: 18000, midLevelHigh: 27000, seniorLow: 24000, seniorMid: 36000, seniorHigh: 52000, currency: 'SAR', year: 2026, confidenceLevel: 'medium', sourceId: 'src-011' },

  // Urban Planning
  { departmentSlug: 'urban-planning', careerFamily: 'Urban Planning', country: 'egypt', freshGradLow: 8000, freshGradMid: 13000, freshGradHigh: 19000, midLevelLow: 16000, midLevelMid: 26000, midLevelHigh: 39000, seniorLow: 32000, seniorMid: 48000, seniorHigh: 70000, currency: 'EGP', year: 2026, confidenceLevel: 'low', sourceId: 'src-003' },

  // Civil
  { departmentSlug: 'civil-engineering', careerFamily: 'Structures', country: 'egypt', freshGradLow: 8000, freshGradMid: 13000, freshGradHigh: 19000, midLevelLow: 16000, midLevelMid: 26000, midLevelHigh: 39000, seniorLow: 32000, seniorMid: 48000, seniorHigh: 70000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'civil-engineering', careerFamily: 'Site', country: 'saudi', freshGradLow: 5000, freshGradMid: 8000, freshGradHigh: 12000, midLevelLow: 12000, midLevelMid: 18000, midLevelHigh: 27000, seniorLow: 24000, seniorMid: 36000, seniorHigh: 52000, currency: 'SAR', year: 2026, confidenceLevel: 'high', sourceId: 'src-011' },

  // Construction
  { departmentSlug: 'construction-engineering', careerFamily: 'Site Management', country: 'egypt', freshGradLow: 8000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 16000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 32000, seniorMid: 52000, seniorHigh: 78000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'construction-engineering', careerFamily: 'Site Management', country: 'saudi', freshGradLow: 5500, freshGradMid: 9000, freshGradHigh: 14000, midLevelLow: 14000, midLevelMid: 21000, midLevelHigh: 32000, seniorLow: 28000, seniorMid: 42000, seniorHigh: 60000, currency: 'SAR', year: 2026, confidenceLevel: 'high', sourceId: 'src-011' },

  // Environmental Architecture
  { departmentSlug: 'environmental-architecture', careerFamily: 'Sustainable Design', country: 'egypt', freshGradLow: 8000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 16000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 32000, seniorMid: 52000, seniorHigh: 78000, currency: 'EGP', year: 2026, confidenceLevel: 'low', sourceId: 'src-009' },

  // Mechatronics
  { departmentSlug: 'mechatronics', careerFamily: 'Automation', country: 'egypt', freshGradLow: 9000, freshGradMid: 15000, freshGradHigh: 22000, midLevelLow: 18000, midLevelMid: 30000, midLevelHigh: 45000, seniorLow: 36000, seniorMid: 58000, seniorHigh: 85000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-003' },
  { departmentSlug: 'mechatronics', careerFamily: 'Robotics', country: 'saudi', freshGradLow: 6000, freshGradMid: 10000, freshGradHigh: 15000, midLevelLow: 15000, midLevelMid: 22000, midLevelHigh: 33000, seniorLow: 30000, seniorMid: 45000, seniorHigh: 65000, currency: 'SAR', year: 2026, confidenceLevel: 'low', sourceId: 'src-004' },

  // Energy
  { departmentSlug: 'energy-electrical-systems', careerFamily: 'Renewables', country: 'egypt', freshGradLow: 9000, freshGradMid: 16000, freshGradHigh: 24000, midLevelLow: 18000, midLevelMid: 32000, midLevelHigh: 48000, seniorLow: 36000, seniorMid: 60000, seniorHigh: 90000, currency: 'EGP', year: 2026, confidenceLevel: 'low', sourceId: 'src-009' },
  { departmentSlug: 'energy-electrical-systems', careerFamily: 'Smart Grids', country: 'saudi', freshGradLow: 5500, freshGradMid: 9000, freshGradHigh: 14000, midLevelLow: 14000, midLevelMid: 21000, midLevelHigh: 32000, seniorLow: 28000, seniorMid: 42000, seniorHigh: 60000, currency: 'SAR', year: 2026, confidenceLevel: 'low', sourceId: 'src-012' },

  // AI
  { departmentSlug: 'artificial-intelligence', careerFamily: 'ML Engineering', country: 'egypt', freshGradLow: 18000, freshGradMid: 25000, freshGradHigh: 35000, midLevelLow: 35000, midLevelMid: 55000, midLevelHigh: 80000, seniorLow: 70000, seniorMid: 100000, seniorHigh: 150000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-005' },
  { departmentSlug: 'artificial-intelligence', careerFamily: 'Data Science', country: 'egypt', freshGradLow: 16000, freshGradMid: 22000, freshGradHigh: 30000, midLevelLow: 30000, midLevelMid: 48000, midLevelHigh: 70000, seniorLow: 60000, seniorMid: 90000, seniorHigh: 130000, currency: 'EGP', year: 2026, confidenceLevel: 'medium', sourceId: 'src-005' },
  { departmentSlug: 'artificial-intelligence', careerFamily: 'ML Engineering', country: 'remote', freshGradLow: 20000, freshGradMid: 30000, freshGradHigh: 45000, midLevelLow: 40000, midLevelMid: 65000, midLevelHigh: 95000, seniorLow: 80000, seniorMid: 120000, seniorHigh: 180000, currency: 'USD', year: 2026, confidenceLevel: 'medium', sourceId: 'src-005' },

  // Biomedical
  { departmentSlug: 'biomedical-engineering', careerFamily: 'Clinical Engineering', country: 'egypt', freshGradLow: 8000, freshGradMid: 14000, freshGradHigh: 20000, midLevelLow: 16000, midLevelMid: 28000, midLevelHigh: 42000, seniorLow: 32000, seniorMid: 52000, seniorHigh: 78000, currency: 'EGP', year: 2026, confidenceLevel: 'low', sourceId: 'src-010' },
  { departmentSlug: 'biomedical-engineering', careerFamily: 'Medical Devices', country: 'saudi', freshGradLow: 5000, freshGradMid: 8000, freshGradHigh: 12000, midLevelLow: 12000, midLevelMid: 18000, midLevelHigh: 27000, seniorLow: 24000, seniorMid: 36000, seniorHigh: 52000, currency: 'SAR', year: 2026, confidenceLevel: 'low', sourceId: 'src-010' },
];

export const salaryProjections: SalaryProjection[] = [
  { departmentSlug: 'computer-control', careerFamily: 'Software', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.12, optimisticGrowth: 0.18, notes: 'نمو قوي مع التوسع في AI' },
  { departmentSlug: 'computer-control', careerFamily: 'Embedded', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.15, notes: 'نمو مع IoT' },
  { departmentSlug: 'computer-control', careerFamily: 'Automation', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.15, notes: 'الصناعة 4.0' },
  { departmentSlug: 'electronics-communications', careerFamily: 'Telecom', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.15, notes: '5G و6G' },
  { departmentSlug: 'electronics-communications', careerFamily: 'Networks', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.11, optimisticGrowth: 0.16, notes: 'السحابة والأمن' },
  { departmentSlug: 'electrical-power', careerFamily: 'Power Systems', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'الشبكات الذكية' },
  { departmentSlug: 'electrical-power', careerFamily: 'Renewables', baselineYear: 2026, conservativeGrowth: 0.09, baseGrowth: 0.13, optimisticGrowth: 0.20, notes: 'نمو ضخم في المتجددة' },
  { departmentSlug: 'mechanical-power', careerFamily: 'HVAC', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'كفاءة الطاقة' },
  { departmentSlug: 'production-design', careerFamily: 'Mechanical Design', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.14, notes: 'التصميم بمساعدة AI' },
  { departmentSlug: 'production-design', careerFamily: 'Manufacturing', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'التصنيع الذكي' },
  { departmentSlug: 'chemical-petrochemical', careerFamily: 'Process', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'العمليات الخضراء' },
  { departmentSlug: 'chemical-petrochemical', careerFamily: 'Oil and Gas', baselineYear: 2026, conservativeGrowth: 0.05, baseGrowth: 0.08, optimisticGrowth: 0.12, notes: 'التحول الطاقي' },
  { departmentSlug: 'architecture', careerFamily: 'Architectural Design', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'BIM والاستدامة' },
  { departmentSlug: 'architecture', careerFamily: 'BIM', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.11, optimisticGrowth: 0.16, notes: 'BIM إلزامي' },
  { departmentSlug: 'urban-planning', careerFamily: 'Urban Planning', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.14, notes: 'المدن الذكية' },
  { departmentSlug: 'civil-engineering', careerFamily: 'Structures', baselineYear: 2026, conservativeGrowth: 0.06, baseGrowth: 0.09, optimisticGrowth: 0.13, notes: 'البنية التحتية' },
  { departmentSlug: 'civil-engineering', careerFamily: 'Site', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.14, notes: 'المدن الجديدة' },
  { departmentSlug: 'construction-engineering', careerFamily: 'Site Management', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.14, notes: 'مشاريع كبرى' },
  { departmentSlug: 'environmental-architecture', careerFamily: 'Sustainable Design', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.12, optimisticGrowth: 0.18, notes: 'أهداف الاستدامة' },
  { departmentSlug: 'mechatronics', careerFamily: 'Automation', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.12, optimisticGrowth: 0.17, notes: 'الصناعة 4.0' },
  { departmentSlug: 'mechatronics', careerFamily: 'Robotics', baselineYear: 2026, conservativeGrowth: 0.09, baseGrowth: 0.13, optimisticGrowth: 0.20, notes: 'روبوتات في كل صناعة' },
  { departmentSlug: 'energy-electrical-systems', careerFamily: 'Renewables', baselineYear: 2026, conservativeGrowth: 0.10, baseGrowth: 0.14, optimisticGrowth: 0.22, notes: 'التحول الطاقي' },
  { departmentSlug: 'energy-electrical-systems', careerFamily: 'Smart Grids', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.12, optimisticGrowth: 0.18, notes: 'شبكات ذكية' },
  { departmentSlug: 'artificial-intelligence', careerFamily: 'ML Engineering', baselineYear: 2026, conservativeGrowth: 0.10, baseGrowth: 0.15, optimisticGrowth: 0.25, notes: 'أسرع نمو' },
  { departmentSlug: 'artificial-intelligence', careerFamily: 'Data Science', baselineYear: 2026, conservativeGrowth: 0.09, baseGrowth: 0.14, optimisticGrowth: 0.22, notes: 'البيانات في كل قطاع' },
  { departmentSlug: 'biomedical-engineering', careerFamily: 'Clinical Engineering', baselineYear: 2026, conservativeGrowth: 0.07, baseGrowth: 0.10, optimisticGrowth: 0.15, notes: 'مستشفيات ذكية' },
  { departmentSlug: 'biomedical-engineering', careerFamily: 'Medical Devices', baselineYear: 2026, conservativeGrowth: 0.08, baseGrowth: 0.11, optimisticGrowth: 0.17, notes: 'AI الطبي' },
];

export const confidenceLabels: Record<ConfidenceLevel, { ar: string; color: string }> = {
  'high': { ar: 'مرتفع', color: 'text-success' },
  'medium': { ar: 'متوسط', color: 'text-warning' },
  'low': { ar: 'منخفض', color: 'text-muted-foreground' },
  'needs-review': { ar: 'يحتاج مراجعة', color: 'text-destructive' },
};

export const getSalaryBaselines = (slug: string, careerFamily?: string): SalaryBaseline[] =>
  salaryBaselines.filter(
    (s) => s.departmentSlug === slug && (!careerFamily || s.careerFamily === careerFamily)
  );

export const getSalaryProjection = (slug: string, careerFamily: string): SalaryProjection | undefined =>
  salaryProjections.find(
    (p) => p.departmentSlug === slug && p.careerFamily === careerFamily
  );
