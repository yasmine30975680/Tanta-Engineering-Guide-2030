export interface ComparisonCriterion {
  id: string;
  labelAr: string;
  labelEn: string;
  category: 'study' | 'work' | 'personality' | 'salary' | 'roadmap';
  ratingKey?: string;
  departmentKey?: string;
  description: string;
  higherIsBetter: boolean;
}

export const comparisonCriteria: ComparisonCriterion[] = [
  { id: 'math', labelAr: 'الرياضيات', labelEn: 'Math', category: 'study', ratingKey: 'math', description: 'مستوى الاعتماد على الرياضيات في الدراسة والعمل', higherIsBetter: true },
  { id: 'physics', labelAr: 'الفيزياء', labelEn: 'Physics', category: 'study', ratingKey: 'physics', description: 'مستوى الاعتماد على الفيزياء', higherIsBetter: true },
  { id: 'chemistry', labelAr: 'الكيمياء', labelEn: 'Chemistry', category: 'study', ratingKey: 'chemistry', description: 'مستوى الاعتماد على الكيمياء', higherIsBetter: true },
  { id: 'programming', labelAr: 'البرمجة', labelEn: 'Programming', category: 'study', ratingKey: 'programming', description: 'مستوى الاعتماد على البرمجة', higherIsBetter: true },
  { id: 'design', labelAr: 'التصميم', labelEn: 'Design', category: 'study', ratingKey: 'design', description: 'مستوى الاعتماد على التصميم البصري', higherIsBetter: true },
  { id: 'lab', labelAr: 'المختبر', labelEn: 'Lab', category: 'study', ratingKey: 'lab', description: 'مستوى العمل المخبري', higherIsBetter: true },
  { id: 'field', labelAr: 'الموقع', labelEn: 'Field', category: 'study', ratingKey: 'field', description: 'مستوى العمل الميداني', higherIsBetter: true },
  { id: 'creativity', labelAr: 'الإبداع', labelEn: 'Creativity', category: 'study', ratingKey: 'design', description: 'مساحة الإبداع في التخصص', higherIsBetter: true },
  { id: 'communication', labelAr: 'التواصل', labelEn: 'Communication', category: 'study', ratingKey: 'communication', description: 'مستوى مهارات التواصل المطلوبة', higherIsBetter: true },
  { id: 'management', labelAr: 'الإدارة', labelEn: 'Management', category: 'work', departmentKey: 'entrepreneurshipPotential', description: 'فرص الإدارة وريادة الأعمال', higherIsBetter: true },
  { id: 'fieldGrowthRate', labelAr: 'سرعة تغير المجال', labelEn: 'Field Growth Rate', category: 'work', description: 'سرعة تطور وتغير مجال التخصص', higherIsBetter: true },
  { id: 'remoteWork', labelAr: 'العمل عن بعد', labelEn: 'Remote Work', category: 'work', departmentKey: 'remoteWorkPotential', description: 'إمكانية العمل عن بعد', higherIsBetter: true },
  { id: 'travel', labelAr: 'السفر', labelEn: 'Travel', category: 'work', departmentKey: 'travelPotential', description: 'فرص السفر والتنقل', higherIsBetter: true },
  { id: 'stability', labelAr: 'الاستقرار', labelEn: 'Stability', category: 'work', description: 'استقرار سوق العمل في التخصص', higherIsBetter: true },
  { id: 'entrepreneurship', labelAr: 'ريادة الأعمال', labelEn: 'Entrepreneurship', category: 'work', departmentKey: 'entrepreneurshipPotential', description: 'فرص تأسيس عمل خاص', higherIsBetter: true },
  { id: 'trackDiversity', labelAr: 'تنوع المسارات', labelEn: 'Track Diversity', category: 'work', description: 'تنوع المسارات الفرعية داخل التخصص', higherIsBetter: true },
  { id: 'aiImpact', labelAr: 'أثر الذكاء الاصطناعي', labelEn: 'AI Impact', category: 'work', description: 'تأثير الذكاء الاصطناعي على التخصص', higherIsBetter: false },
  { id: 'safetyResponsibility', labelAr: 'مسؤولية السلامة', labelEn: 'Safety Responsibility', category: 'work', description: 'مستوى مسؤولية السلامة المطلوبة', higherIsBetter: true },
  { id: 'portfolioCost', labelAr: 'تكلفة بناء Portfolio', labelEn: 'Portfolio Cost', category: 'study', description: 'تكلفة بناء معرض أعمال للتخصص', higherIsBetter: false },
  { id: 'salary2030', labelAr: 'توقع رواتب 2030', labelEn: 'Salary 2030', category: 'salary', description: 'نطاق الرواتب المتوقع في 2030', higherIsBetter: true },
  { id: 'salaryConfidence', labelAr: 'درجة الثقة في بيانات الراتب', labelEn: 'Salary Confidence', category: 'salary', description: 'مستوى الثقة في بيانات الرواتب', higherIsBetter: true },
  { id: 'roadmap', labelAr: 'خطة الأربع سنوات', labelEn: '4-Year Roadmap', category: 'roadmap', description: 'وضوح خطة التعلم والتدريب', higherIsBetter: true },
];

export interface ComparisonMode {
  id: string;
  labelAr: string;
  labelEn: string;
  criteriaIds: string[];
}

export const comparisonModes: ComparisonMode[] = [
  { id: 'quick', labelAr: 'مقارنة سريعة', labelEn: 'Quick Compare', criteriaIds: ['math', 'programming', 'field', 'remoteWork', 'salary2030', 'stability'] },
  { id: 'study', labelAr: 'مقارنة الدراسة', labelEn: 'Study Compare', criteriaIds: ['math', 'physics', 'chemistry', 'programming', 'design', 'lab', 'field', 'communication'] },
  { id: 'careers', labelAr: 'مقارنة الوظائف', labelEn: 'Careers Compare', criteriaIds: ['management', 'trackDiversity', 'aiImpact', 'stability', 'travel'] },
  { id: 'salary', labelAr: 'مقارنة الرواتب', labelEn: 'Salary Compare', criteriaIds: ['salary2030', 'salaryConfidence'] },
  { id: 'personality', labelAr: 'مقارنة حسب الشخصية', labelEn: 'Personality Compare', criteriaIds: ['creativity', 'communication', 'safetyResponsibility'] },
  { id: 'priorities', labelAr: 'مقارنة حسب الأولويات', labelEn: 'Priorities Compare', criteriaIds: ['remoteWork', 'travel', 'entrepreneurship', 'stability'] },
  { id: 'roadmap', labelAr: 'مقارنة خطة الأربع سنوات', labelEn: 'Roadmap Compare', criteriaIds: ['roadmap', 'portfolioCost'] },
];
