export interface PriorityProfile {
  enjoymentOfStudy: number;
  egyptOpportunities: number;
  gulfOpportunities: number;
  internationalWork: number;
  incomePotential: number;
  stability: number;
  remoteWork: number;
  travel: number;
  entrepreneurship: number;
  creativity: number;
  socialImpact: number;
  sustainability: number;
  fieldWork: number;
  lowFieldWork: number;
  fieldGrowthRate: number;
  flexibilityBetweenTracks: number;
}

export interface PriorityPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  profile: PriorityProfile;
}

/**
 * Balanced default profile — every priority receives an equal share.
 * 16 fields × ~6.25 = 100 (rounded so the total is exactly 100).
 */
export const defaultPriorityProfile: PriorityProfile = {
  enjoymentOfStudy: 6,
  egyptOpportunities: 6,
  gulfOpportunities: 6,
  internationalWork: 6,
  incomePotential: 6,
  stability: 6,
  remoteWork: 6,
  travel: 6,
  entrepreneurship: 6,
  creativity: 6,
  socialImpact: 6,
  sustainability: 6,
  fieldWork: 6,
  lowFieldWork: 6,
  fieldGrowthRate: 8,
  flexibilityBetweenTracks: 8,
};

/**
 * Curated priority presets for the engineering guidance platform.
 * Every preset's profile sums to exactly 100.
 */
export const priorityPresets: PriorityPreset[] = [
  {
    id: 'passion-first',
    nameAr: 'الشغف أولًا',
    nameEn: 'Passion First',
    description:
      'يضع الشغف وحب الدراسة والإبداع في مقدمة الأولويات، مع تقدير معتدل للفرص والاستقرار.',
    profile: {
      enjoymentOfStudy: 22,
      egyptOpportunities: 4,
      gulfOpportunities: 3,
      internationalWork: 4,
      incomePotential: 4,
      stability: 4,
      remoteWork: 5,
      travel: 3,
      entrepreneurship: 6,
      creativity: 20,
      socialImpact: 6,
      sustainability: 4,
      fieldWork: 3,
      lowFieldWork: 3,
      fieldGrowthRate: 5,
      flexibilityBetweenTracks: 4,
    },
  },
  {
    id: 'egypt-market',
    nameAr: 'سوق مصر',
    nameEn: 'Egypt Market',
    description:
      'يركّز على توفّر الفرص في السوق المصري والاستقرار الوظيفي محليًا، مع اهتمام معتدل بالدخل والتأثير المجتمعي.',
    profile: {
      enjoymentOfStudy: 5,
      egyptOpportunities: 22,
      gulfOpportunities: 3,
      internationalWork: 4,
      incomePotential: 6,
      stability: 18,
      remoteWork: 4,
      travel: 3,
      entrepreneurship: 4,
      creativity: 5,
      socialImpact: 6,
      sustainability: 4,
      fieldWork: 4,
      lowFieldWork: 4,
      fieldGrowthRate: 4,
      flexibilityBetweenTracks: 4,
    },
  },
  {
    id: 'gulf-opportunities',
    nameAr: 'فرص الخليج',
    nameEn: 'Gulf Opportunities',
    description:
      'يوجّه الأولوية نحو فرص العمل في دول الخليج والدخل المرتفع، مع تقدير معتدل للاستقرار والعمل عن بُعد.',
    profile: {
      enjoymentOfStudy: 3,
      egyptOpportunities: 4,
      gulfOpportunities: 22,
      internationalWork: 5,
      incomePotential: 22,
      stability: 6,
      remoteWork: 4,
      travel: 4,
      entrepreneurship: 4,
      creativity: 3,
      socialImpact: 3,
      sustainability: 3,
      fieldWork: 4,
      lowFieldWork: 4,
      fieldGrowthRate: 5,
      flexibilityBetweenTracks: 4,
    },
  },
  {
    id: 'international-work',
    nameAr: 'العمل الدولي',
    nameEn: 'International Work',
    description:
      'يستهدف العمل في الأسواق الدولية والعمل عن بُعد والسفر، مع اهتمام بالدخل ومعدّل نمو المجال.',
    profile: {
      enjoymentOfStudy: 3,
      egyptOpportunities: 3,
      gulfOpportunities: 4,
      internationalWork: 22,
      incomePotential: 8,
      stability: 3,
      remoteWork: 18,
      travel: 10,
      entrepreneurship: 4,
      creativity: 4,
      socialImpact: 3,
      sustainability: 3,
      fieldWork: 3,
      lowFieldWork: 3,
      fieldGrowthRate: 5,
      flexibilityBetweenTracks: 4,
    },
  },
  {
    id: 'max-flexibility',
    nameAr: 'أعلى مرونة',
    nameEn: 'Max Flexibility',
    description:
      'يركّز على المرونة بين المسارات والعمل عن بُعد لإبقاء الخيارات مفتوحة، مع تقدير معتدل للدخل ونمو المجال.',
    profile: {
      enjoymentOfStudy: 5,
      egyptOpportunities: 4,
      gulfOpportunities: 4,
      internationalWork: 6,
      incomePotential: 5,
      stability: 4,
      remoteWork: 18,
      travel: 4,
      entrepreneurship: 5,
      creativity: 5,
      socialImpact: 3,
      sustainability: 3,
      fieldWork: 3,
      lowFieldWork: 3,
      fieldGrowthRate: 6,
      flexibilityBetweenTracks: 22,
    },
  },
  {
    id: 'stability',
    nameAr: 'الاستقرار',
    nameEn: 'Stability',
    description:
      'يقدّر الاستقرار الوظيفي والفرص في السوق المصري فوق كل اعتبار، مع اهتمام معتدل بالدخل والعمل الميداني المحدود.',
    profile: {
      enjoymentOfStudy: 5,
      egyptOpportunities: 18,
      gulfOpportunities: 5,
      internationalWork: 4,
      incomePotential: 6,
      stability: 22,
      remoteWork: 3,
      travel: 3,
      entrepreneurship: 3,
      creativity: 4,
      socialImpact: 5,
      sustainability: 4,
      fieldWork: 4,
      lowFieldWork: 7,
      fieldGrowthRate: 4,
      flexibilityBetweenTracks: 3,
    },
  },
  {
    id: 'future-tech',
    nameAr: 'التكنولوجيا المستقبلية',
    nameEn: 'Future Tech',
    description:
      'يوجّه الأولوية نحو معدّل نمو المجال والمرونة بين المسارات، مع تقدير للإبداع وريادة الأعمال والعمل عن بُعد.',
    profile: {
      enjoymentOfStudy: 4,
      egyptOpportunities: 3,
      gulfOpportunities: 4,
      internationalWork: 6,
      incomePotential: 6,
      stability: 3,
      remoteWork: 6,
      travel: 3,
      entrepreneurship: 6,
      creativity: 6,
      socialImpact: 3,
      sustainability: 3,
      fieldWork: 3,
      lowFieldWork: 3,
      fieldGrowthRate: 22,
      flexibilityBetweenTracks: 19,
    },
  },
  {
    id: 'creativity',
    nameAr: 'الإبداع',
    nameEn: 'Creativity',
    description:
      'يضع الإبداع والتأثير المجتمعي في الصدارة، مع تقدير معتدل للشغف وريادة الأعمال والاستدامة.',
    profile: {
      enjoymentOfStudy: 10,
      egyptOpportunities: 3,
      gulfOpportunities: 3,
      internationalWork: 4,
      incomePotential: 4,
      stability: 3,
      remoteWork: 5,
      travel: 3,
      entrepreneurship: 7,
      creativity: 22,
      socialImpact: 18,
      sustainability: 5,
      fieldWork: 3,
      lowFieldWork: 3,
      fieldGrowthRate: 4,
      flexibilityBetweenTracks: 3,
    },
  },
  {
    id: 'field-work',
    nameAr: 'العمل الميداني',
    nameEn: 'Field Work',
    description:
      'يفضّل العمل الميداني والسفر والتنقّل، مع تقدير معتدل للشغف والفرص المصرية والتأثير المجتمعي.',
    profile: {
      enjoymentOfStudy: 6,
      egyptOpportunities: 5,
      gulfOpportunities: 3,
      internationalWork: 6,
      incomePotential: 4,
      stability: 3,
      remoteWork: 3,
      travel: 22,
      entrepreneurship: 3,
      creativity: 4,
      socialImpact: 6,
      sustainability: 3,
      fieldWork: 22,
      lowFieldWork: 2,
      fieldGrowthRate: 4,
      flexibilityBetweenTracks: 4,
    },
  },
];

export default priorityPresets;
