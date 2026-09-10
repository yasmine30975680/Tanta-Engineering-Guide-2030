const STORAGE_VERSION = 1;
const STORAGE_PREFIX = 'bmt2030_';

export interface StorageData {
  version: number;
  favorites: string[];
  compareList: string[];
  quizAnswers: Record<string, number>;
  quizStage: number;
  quizCompleted: boolean;
  quizCompletedAt: string | null;
  priorities: Record<string, number> | null;
  wishlist: { slug: string; notes?: string; pinned?: boolean }[];
  roadmapProgress: Record<string, boolean>;
  challengeResults: Record<string, { enjoyed: boolean; score?: number }>;
  salarySettings: {
    departmentSlug: string;
    careerFamily: string;
    country: string;
    experience: string;
    scenario: string;
    growthRate: number;
    inflationRate: number;
    nominalMode: boolean;
  } | null;
  theme: string | null;
}

const defaultData: StorageData = {
  version: STORAGE_VERSION,
  favorites: [],
  compareList: [],
  quizAnswers: {},
  quizStage: 0,
  quizCompleted: false,
  quizCompletedAt: null,
  priorities: null,
  wishlist: [],
  roadmapProgress: {},
  challengeResults: {},
  salarySettings: null,
  theme: null,
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as T;
    return fallback;
  } catch {
    return fallback;
  }
}

function migrate(data: Partial<StorageData>): StorageData {
  if (!data.version || data.version < STORAGE_VERSION) {
    return { ...defaultData, ...data, version: STORAGE_VERSION };
  }
  return { ...defaultData, ...data } as StorageData;
}

export function loadData(): StorageData {
  if (!isBrowser()) return defaultData;
  const raw = localStorage.getItem(`${STORAGE_PREFIX}data`);
  const parsed = safeParse<Partial<StorageData>>(raw, {});
  return migrate(parsed);
}

export function saveData(data: Partial<StorageData>): boolean {
  if (!isBrowser()) return false;
  try {
    const current = loadData();
    const merged = { ...current, ...data, version: STORAGE_VERSION };
    localStorage.setItem(`${STORAGE_PREFIX}data`, JSON.stringify(merged));
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded');
      return false;
    }
    console.warn('Failed to save data:', e);
    return false;
  }
}

export function clearAllData(): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}data`);
    return true;
  } catch {
    return false;
  }
}

export function exportData(): string {
  return JSON.stringify(loadData(), null, 2);
}
