import type { AssessmentAnswer, Department, RecommendationResult, PriorityProfile } from '@/types/department';
import { departments } from '@/data/departments';
import { quizQuestions } from '@/data/quizQuestions';

const traitToRatingKey: Record<string, keyof Department['ratings']> = {
  programming: 'programming',
  electronics: 'lab',
  energy: 'physics',
  mechanics: 'field',
  chemistry: 'chemistry',
  visual_design: 'design',
  spatial_thinking: 'design',
  structures: 'field',
  urban: 'field',
  medical_tech: 'lab',
  management: 'teamwork',
  lab: 'lab',
  field: 'field',
  office: 'communication',
  math: 'math',
  physics: 'physics',
  communication: 'communication',
  continuous_learning: 'continuousLearning',
  remote_work: 'communication',
  travel: 'field',
  stability: 'continuousLearning',
  entrepreneurship: 'teamwork',
  safety_responsibility: 'safetyResponsibility',
  deep_specialization: 'continuousLearning',
  interdisciplinary: 'teamwork',
};

export function computeTraitScores(answers: AssessmentAnswer): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const q of quizQuestions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;
    for (const trait of q.traits) {
      scores[trait] = (scores[trait] || 0) + answer;
    }
  }
  // Normalize to 0-100
  const maxPossible: Record<string, number> = {};
  for (const q of quizQuestions) {
    for (const trait of q.traits) {
      maxPossible[trait] = (maxPossible[trait] || 0) + 5;
    }
  }
  const normalized: Record<string, number> = {};
  for (const trait of Object.keys(scores)) {
    const max = maxPossible[trait] || 1;
    normalized[trait] = Math.round((scores[trait] / max) * 100);
  }
  return normalized;
}

export function computeBaseScore(
  dept: Department,
  traitScores: Record<string, number>
): { score: number; reasons: { type: 'positive' | 'negative' | 'neutral'; text: string; weight: number }[] } {
  let totalWeight = 0;
  let matchedWeight = 0;
  const reasons: { type: 'positive' | 'negative' | 'neutral'; text: string; weight: number }[] = [];

  // 50% interests & activities
  const interestTraits = ['programming', 'electronics', 'energy', 'mechanics', 'chemistry', 'visual_design', 'spatial_thinking', 'structures', 'urban', 'medical_tech'];
  for (const trait of interestTraits) {
    const score = traitScores[trait] ?? 50;
    const ratingKey = traitToRatingKey[trait];
    if (!ratingKey) continue;
    const deptRating = dept.ratings[ratingKey];
    if (!deptRating) continue;
    const weight = deptRating;
    const match = 100 - Math.abs(score - (deptRating / 5) * 100);
    totalWeight += weight;
    matchedWeight += (match / 100) * weight;
  }

  // 20% study style
  const studyTraits = ['math', 'physics', 'chemistry', 'programming', 'lab', 'field'];
  for (const trait of studyTraits) {
    const score = traitScores[trait] ?? 50;
    const ratingKey = traitToRatingKey[trait];
    if (!ratingKey) continue;
    const deptRating = dept.ratings[ratingKey];
    if (!deptRating) continue;
    const weight = deptRating * 0.4;
    const match = 100 - Math.abs(score - (deptRating / 5) * 100);
    totalWeight += weight;
    matchedWeight += (match / 100) * weight;
  }

  // 15% work environment
  const workTraits = ['office', 'field', 'remote_work', 'travel', 'stability'];
  for (const trait of workTraits) {
    const score = traitScores[trait] ?? 50;
    if (trait === 'office' || trait === 'remote_work') {
      const val = trait === 'remote_work' ? dept.remoteWorkPotential : (5 - dept.remoteWorkPotential);
      const weight = 1;
      const match = 100 - Math.abs(score - (val / 5) * 100);
      totalWeight += weight;
      matchedWeight += (match / 100) * weight;
    } else if (trait === 'travel') {
      const weight = 1;
      const match = 100 - Math.abs(score - (dept.travelPotential / 5) * 100);
      totalWeight += weight;
      matchedWeight += (match / 100) * weight;
    } else if (trait === 'stability') {
      const weight = 1;
      const match = 100 - Math.abs(score - 50);
      totalWeight += weight;
      matchedWeight += (match / 100) * weight;
    }
  }

  // 15% career goals
  const careerTraits = ['entrepreneurship', 'continuous_learning', 'deep_specialization', 'interdisciplinary', 'safety_responsibility'];
  for (const trait of careerTraits) {
    const score = traitScores[trait] ?? 50;
    if (trait === 'entrepreneurship') {
      const match = 100 - Math.abs(score - (dept.entrepreneurshipPotential / 5) * 100);
      totalWeight += 1;
      matchedWeight += (match / 100);
    } else if (trait === 'continuous_learning') {
      const match = 100 - Math.abs(score - (dept.ratings.continuousLearning / 5) * 100);
      totalWeight += 1;
      matchedWeight += (match / 100);
    } else if (trait === 'deep_specialization') {
      const match = 100 - Math.abs(score - 60);
      totalWeight += 1;
      matchedWeight += (match / 100);
    } else if (trait === 'interdisciplinary') {
      const trackCount = dept.tracks.length;
      const match = 100 - Math.abs(score - (trackCount / 5) * 100);
      totalWeight += 1;
      matchedWeight += (match / 100);
    } else if (trait === 'safety_responsibility') {
      const match = 100 - Math.abs(score - (dept.ratings.safetyResponsibility / 5) * 100);
      totalWeight += 1;
      matchedWeight += (match / 100);
    }
  }

  let score = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 50;

  // Logical reductions
  const programmingScore = traitScores['programming'] ?? 50;
  if (programmingScore < 30 && dept.ratings.programming >= 4) {
    score = Math.round(score * 0.85);
    reasons.push({ type: 'negative', text: 'ميولك في البرمجة منخفضة وهذا التخصص يعتمد عليها بشكل كبير', weight: 0.15 });
  }

  const chemistryScore = traitScores['chemistry'] ?? 50;
  if (chemistryScore < 30 && dept.ratings.chemistry >= 4) {
    score = Math.round(score * 0.85);
    reasons.push({ type: 'negative', text: 'ميولك في الكيمياء منخفضة وهذا التخصص يعتمد عليها', weight: 0.15 });
  }

  const designScore = traitScores['visual_design'] ?? 50;
  if (designScore < 30 && dept.ratings.design >= 4) {
    score = Math.round(score * 0.9);
    reasons.push({ type: 'negative', text: 'ميولك في التصميم البصري منخفضة وهذا التخصص يعتمد عليها', weight: 0.10 });
  }

  const fieldScore = traitScores['field'] ?? 50;
  if (fieldScore < 30 && dept.ratings.field >= 4) {
    score = Math.round(score * 0.9);
    reasons.push({ type: 'negative', text: 'ميولك في العمل الميداني منخفضة وهذا التخصص يتطلبه', weight: 0.10 });
  }

  const physicsScore = traitScores['physics'] ?? 50;
  if (physicsScore < 30 && dept.ratings.physics >= 4) {
    score = Math.round(score * 0.9);
    reasons.push({ type: 'negative', text: 'ميولك في الفيزياء منخفضة وهذا التخصص يعتمد عليها', weight: 0.10 });
  }

  const safetyScore = traitScores['safety_responsibility'] ?? 50;
  if (safetyScore < 30 && dept.ratings.safetyResponsibility >= 4) {
    score = Math.round(score * 0.9);
    reasons.push({ type: 'negative', text: 'ميولك في تحمل مسؤولية السلامة منخفضة وهذا التخصص يتطلبها', weight: 0.10 });
  }

  const learningScore = traitScores['continuous_learning'] ?? 50;
  if (learningScore < 30 && dept.ratings.continuousLearning >= 4) {
    score = Math.round(score * 0.9);
    reasons.push({ type: 'negative', text: 'ميولك في التعلم المستمر منخفضة وهذا التخصص يتطلبه', weight: 0.10 });
  }

  // Clamp
  score = Math.max(20, Math.min(100, score));

  // Add positive reasons
  if (score >= 75) {
    reasons.push({ type: 'positive', text: `تطابق قوي مع ميولك في ${dept.shortDescription.substring(0, 60)}`, weight: 0.3 });
  }
  if (dept.tracks.length >= 3) {
    reasons.push({ type: 'positive', text: `يحتوي على ${dept.tracks.length} مسارات فرعية تمنحك مرونة`, weight: 0.1 });
  }
  if (dept.remoteWorkPotential >= 4) {
    reasons.push({ type: 'positive', text: 'فرص عمل عن بعد ممتازة', weight: 0.1 });
  }

  return { score, reasons };
}

export function computePriorityScore(
  dept: Department,
  priorities: PriorityProfile
): number {
  let score = 0;
  let total = 0;

  const addFactor = (weight: number, value: number) => {
    if (weight > 0) {
      score += weight * (value / 100);
      total += weight;
    }
  };

  addFactor(priorities.enjoymentOfStudy, 70 + dept.ratings.design * 6);
  addFactor(priorities.egyptOpportunities, 60 + dept.gulfPotential * 8);
  addFactor(priorities.gulfOpportunities, dept.gulfPotential * 20);
  addFactor(priorities.internationalWork, dept.remoteWorkPotential * 20);
  addFactor(priorities.incomePotential, 50 + dept.gulfPotential * 10);
  addFactor(priorities.stability, 60 + (5 - dept.ratings.continuousLearning) * 8);
  addFactor(priorities.remoteWork, dept.remoteWorkPotential * 20);
  addFactor(priorities.travel, dept.travelPotential * 20);
  addFactor(priorities.entrepreneurship, dept.entrepreneurshipPotential * 20);
  addFactor(priorities.creativity, dept.ratings.design * 20);
  addFactor(priorities.socialImpact, 50 + dept.ratings.safetyResponsibility * 10);
  addFactor(priorities.sustainability, dept.ratings.safetyResponsibility * 20);
  addFactor(priorities.fieldWork, dept.ratings.field * 20);
  addFactor(priorities.lowFieldWork, (5 - dept.ratings.field) * 20);
  addFactor(priorities.fieldGrowthRate, dept.ratings.continuousLearning * 20);
  addFactor(priorities.flexibilityBetweenTracks, dept.tracks.length * 20);

  return total > 0 ? Math.round((score / total) * 100) : 50;
}

export function getScoreCategory(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'توافق قوي جدًا', color: 'text-success' };
  if (score >= 75) return { label: 'توافق قوي', color: 'text-success' };
  if (score >= 65) return { label: 'توافق جيد', color: 'text-primary' };
  if (score >= 55) return { label: 'يستحق الاستكشاف', color: 'text-warning' };
  return { label: 'توافق أولي محدود', color: 'text-muted-foreground' };
}

export function generateRecommendations(
  answers: AssessmentAnswer,
  priorities?: PriorityProfile | null
): RecommendationResult[] {
  const traitScores = computeTraitScores(answers);
  const results: RecommendationResult[] = [];

  for (const dept of departments) {
    const { score: baseScore, reasons } = computeBaseScore(dept, traitScores);
    const priorityScore = priorities ? computePriorityScore(dept, priorities) : 0;
    const finalScore = priorities
      ? Math.round(baseScore * 0.7 + priorityScore * 0.3)
      : baseScore;

    const challenges = dept.realisticChallenges.slice(0, 3);
    const whatBoosted = reasons.filter((r) => r.type === 'positive').map((r) => r.text).slice(0, 3);
    const whatReduced = reasons.filter((r) => r.type === 'negative').map((r) => r.text).slice(0, 3);

    results.push({
      departmentSlug: dept.slug,
      departmentName: dept.nameAr,
      baseScore,
      priorityScore,
      finalScore,
      category: getScoreCategory(finalScore).label,
      reasons: reasons.slice(0, 5),
      challenges,
      influentialFactors: dept.commonStudyTopics.slice(0, 5),
      whatBoosted,
      whatReduced,
      whatCouldChangeDecision: `إذا اكتشفت أنك تستمتع بـ${dept.favoriteActivities[0] || 'أنشطة هذا التخصص'} بعد تجربة عملية`,
    });
  }

  return results.sort((a, b) => b.finalScore - a.finalScore);
}

export function getTopRecommendations(
  answers: AssessmentAnswer,
  priorities?: PriorityProfile | null,
  count = 5
): RecommendationResult[] {
  return generateRecommendations(answers, priorities).slice(0, count);
}

export function getSurpriseRecommendation(
  answers: AssessmentAnswer
): RecommendationResult {
  const results = generateRecommendations(answers);
  // Return one from the middle that's not top or bottom
  return results[Math.floor(results.length / 2)];
}

export function getNeedsTrialRecommendations(
  answers: AssessmentAnswer
): RecommendationResult[] {
  const results = generateRecommendations(answers);
  return results.filter((r) => r.finalScore >= 55 && r.finalScore < 75).slice(0, 3);
}
