// =====================================================
// Core Domain Types for بوصلة مهندس طنطا 2030
// =====================================================

export type DepartmentCategory = 'general' | 'credit';

export type AccentColorKey =
  | 'cyan-purple'
  | 'purple-cyan'
  | 'electric-gold'
  | 'steel-orange'
  | 'graphite-orange'
  | 'emerald-amber'
  | 'sand-charcoal'
  | 'urban-clay'
  | 'concrete-yellow'
  | 'slate-orange'
  | 'green-cyan'
  | 'graphite-blue-orange'
  | 'energy-gold'
  | 'night-purple'
  | 'medical-blue';

export interface AccentColorDef {
  key: AccentColorKey;
  from: string;
  to: string;
  text: string;
  bg: string;
  border: string;
  ring: string;
}

export interface DepartmentRatings {
  math: number;
  physics: number;
  chemistry: number;
  programming: number;
  design: number;
  lab: number;
  field: number;
  teamwork: number;
  communication: number;
  continuousLearning: number;
  safetyResponsibility: number;
}

export interface DepartmentTrack {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  whatYouLearn: string[];
  tools: string[];
  portfolioProject: string;
  trainingTarget: string;
  potentialJobs: string[];
  workEnvironment: string;
  remotePotential: number;
  gulfPotential: number;
  aiImpact: string;
  future2030: string;
}

export interface CareerPath {
  id: string;
  titleAr: string;
  titleEn: string;
  description: string;
  departmentSlugs: string[];
  skills: string[];
  tools: string[];
  workEnvironment: string;
  remotePotential: number;
  travelPotential: number;
  salaryBaselineEGP: number;
  salaryBaselineSAR: number;
  salaryBaselineAED: number;
  salary2030Low: number;
  salary2030Mid: number;
  salary2030High: number;
  portfolioProject: string;
  entryPath: string;
  careerGroup: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
  type: 'academic' | 'skill' | 'project' | 'training' | 'career' | 'soft';
}

export interface RoadmapYear {
  year: number;
  title: string;
  items: RoadmapItem[];
}

export interface SalaryBaseline {
  departmentSlug: string;
  careerFamily: string;
  country: 'egypt' | 'saudi' | 'uae' | 'remote';
  freshGradLow: number;
  freshGradMid: number;
  freshGradHigh: number;
  midLevelLow: number;
  midLevelMid: number;
  midLevelHigh: number;
  seniorLow: number;
  seniorMid: number;
  seniorHigh: number;
  currency: string;
  year: number;
  confidenceLevel: ConfidenceLevel;
  sourceId: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'needs-review';

export interface SalaryProjection {
  departmentSlug: string;
  careerFamily: string;
  baselineYear: number;
  conservativeGrowth: number;
  baseGrowth: number;
  optimisticGrowth: number;
  notes: string;
}

export interface SalaryScenario {
  name: string;
  growthRate: number;
  freshGrad2030: { low: number; mid: number; high: number };
  midLevel2030: { low: number; mid: number; high: number };
  nominal: boolean;
  realValue2026: { low: number; mid: number; high: number };
}

export interface SalarySource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishDate: string;
  accessedDate: string;
  dataType: string;
  departmentSlugs: string[];
  confidenceLevel: ConfidenceLevel;
  notes: string;
  badge: 'official' | 'market' | 'estimate' | 'needs-review';
}

export type AssessmentStage =
  | 'academic_interests'
  | 'problem_solving'
  | 'project_types'
  | 'work_environment'
  | 'creativity_application'
  | 'career_goals'
  | 'challenges_tolerance';

export interface AssessmentQuestion {
  id: string;
  stage: AssessmentStage;
  questionAr: string;
  questionEn: string;
  traits: string[];
  isContradictionCheck: boolean;
  contradictsWith?: string;
}

export type AssessmentAnswer = Record<string, number>;

export interface AssessmentProfile {
  answers: AssessmentAnswer;
  completedAt: string;
  stage: number;
  totalQuestions: number;
  traitScores: Record<string, number>;
}

export interface RecommendationReason {
  type: 'positive' | 'negative' | 'neutral';
  text: string;
  weight: number;
}

export interface RecommendationResult {
  departmentSlug: string;
  departmentName: string;
  baseScore: number;
  priorityScore: number;
  finalScore: number;
  category: string;
  reasons: RecommendationReason[];
  challenges: string[];
  influentialFactors: string[];
  whatBoosted: string[];
  whatReduced: string[];
  whatCouldChangeDecision: string;
}

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

export interface WishlistItem {
  departmentSlug: string;
  addedAt: string;
  notes?: string;
}

export interface MiniChallenge {
  departmentSlug: string;
  title: string;
  durationMinutes: number;
  description: string;
  steps: string[];
  reflectionQuestions: string[];
  relatedTraits: string[];
}

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishDate: string;
  accessedDate: string;
  dataType: string;
  departmentSlugs: string[];
  confidenceLevel: ConfidenceLevel;
  notes: string;
  badge: 'official' | 'market' | 'estimate' | 'needs-review';
}

export interface Department {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  abbreviation: string;
  category: DepartmentCategory;
  accentColor: AccentColorKey;
  icon: string;
  cinematicTagline: string;
  shortDescription: string;
  detailedOverview: string;
  whatEngineersDo: string[];
  problemsSolved: string[];
  commonStudyTopics: string[];
  foundationalTopics: string[];
  appliedTopics: string[];
  advancedTopics: string[];
  studyStyle: string;
  favoriteActivities: string[];
  realisticChallenges: string[];
  personalityFit: string[];
  personalityMismatch: string[];
  workEnvironments: string[];
  ratings: DepartmentRatings;
  tracks: DepartmentTrack[];
  tools: string[];
  technicalSkills: string[];
  softSkills: string[];
  portfolioProjects: string[];
  trainingTargets: string[];
  careers: string[];
  remoteWorkPotential: number;
  gulfPotential: number;
  entrepreneurshipPotential: number;
  travelPotential: number;
  market2030: string;
  automationImpact: string;
  relatedDepartments: string[];
  fourYearRoadmap: RoadmapYear[];
  miniChallenge: MiniChallenge;
  salaryFamilyMapping: string[];
  references: string[];
  lastUpdated: string;
  needsReview: boolean;
}
