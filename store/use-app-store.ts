'use client';

import { create } from 'zustand';
import { loadData, saveData, clearAllData } from '@/lib/storage';
import type { PriorityProfile } from '@/types/department';
import { defaultPriorityProfile } from '@/data/priorityPresets';

interface AppState {
  favorites: string[];
  compareList: string[];
  quizAnswers: Record<string, number>;
  quizStage: number;
  quizCompleted: boolean;
  quizCompletedAt: string | null;
  priorities: PriorityProfile;
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
  hydrated: boolean;

  hydrate: () => void;
  toggleFavorite: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  setQuizAnswer: (questionId: string, value: number) => void;
  setQuizStage: (stage: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  setPriorities: (p: PriorityProfile) => void;
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  updateWishlistNotes: (slug: string, notes: string) => void;
  toggleWishlistPin: (slug: string) => void;
  reorderWishlist: (newOrder: { slug: string; notes?: string; pinned?: boolean }[]) => void;
  toggleRoadmapItem: (id: string) => void;
  setChallengeResult: (slug: string, result: { enjoyed: boolean; score?: number }) => void;
  setSalarySettings: (s: AppState['salarySettings']) => void;
  clearAll: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  favorites: [],
  compareList: [],
  quizAnswers: {},
  quizStage: 0,
  quizCompleted: false,
  quizCompletedAt: null,
  priorities: defaultPriorityProfile,
  wishlist: [],
  roadmapProgress: {},
  challengeResults: {},
  salarySettings: null,
  hydrated: false,

  hydrate: () => {
    const data = loadData();
    set({
      favorites: data.favorites,
      compareList: data.compareList,
      quizAnswers: data.quizAnswers,
      quizStage: data.quizStage,
      quizCompleted: data.quizCompleted,
      quizCompletedAt: data.quizCompletedAt,
      priorities: data.priorities ? { ...defaultPriorityProfile, ...data.priorities } : defaultPriorityProfile,
      wishlist: data.wishlist,
      roadmapProgress: data.roadmapProgress,
      challengeResults: data.challengeResults,
      salarySettings: data.salarySettings,
      hydrated: true,
    });
  },

  toggleFavorite: (slug) => {
    const current = get().favorites;
    const favorites = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    set({ favorites });
    saveData({ favorites });
  },

  toggleCompare: (slug) => {
    const current = get().compareList;
    if (current.includes(slug)) {
      const compareList = current.filter((s) => s !== slug);
      set({ compareList });
      saveData({ compareList });
    } else if (current.length < 4) {
      const compareList = [...current, slug];
      set({ compareList });
      saveData({ compareList });
    }
  },

  removeFromCompare: (slug) => {
    const compareList = get().compareList.filter((s) => s !== slug);
    set({ compareList });
    saveData({ compareList });
  },

  setQuizAnswer: (questionId, value) => {
    const quizAnswers = { ...get().quizAnswers, [questionId]: value };
    set({ quizAnswers });
    saveData({ quizAnswers });
  },

  setQuizStage: (stage) => {
    set({ quizStage: stage });
    saveData({ quizStage: stage });
  },

  completeQuiz: () => {
    const completedAt = new Date().toISOString();
    set({ quizCompleted: true, quizCompletedAt: completedAt });
    saveData({ quizCompleted: true, quizCompletedAt: completedAt });
  },

  resetQuiz: () => {
    set({ quizAnswers: {}, quizStage: 0, quizCompleted: false, quizCompletedAt: null });
    saveData({ quizAnswers: {}, quizStage: 0, quizCompleted: false, quizCompletedAt: null });
  },

  setPriorities: (p) => {
    set({ priorities: p });
    saveData({ priorities: p as unknown as Record<string, number> });
  },

  addToWishlist: (slug) => {
    const current = get().wishlist;
    if (!current.find((w) => w.slug === slug)) {
      const wishlist = [...current, { slug }];
      set({ wishlist });
      saveData({ wishlist });
    }
  },

  removeFromWishlist: (slug) => {
    const wishlist = get().wishlist.filter((w) => w.slug !== slug);
    set({ wishlist });
    saveData({ wishlist });
  },

  updateWishlistNotes: (slug, notes) => {
    const wishlist = get().wishlist.map((w) =>
      w.slug === slug ? { ...w, notes } : w
    );
    set({ wishlist });
    saveData({ wishlist });
  },

  toggleWishlistPin: (slug) => {
    const wishlist = get().wishlist.map((w) =>
      w.slug === slug ? { ...w, pinned: !w.pinned } : w
    );
    set({ wishlist });
    saveData({ wishlist });
  },

  reorderWishlist: (newOrder) => {
    set({ wishlist: newOrder });
    saveData({ wishlist: newOrder });
  },

  toggleRoadmapItem: (id) => {
    const progress = get().roadmapProgress;
    set({
      roadmapProgress: { ...progress, [id]: !progress[id] },
    });
    saveData({ roadmapProgress: { ...progress, [id]: !progress[id] } });
  },

  setChallengeResult: (slug, result) => {
    const challengeResults = { ...get().challengeResults, [slug]: result };
    set({ challengeResults });
    saveData({ challengeResults });
  },

  setSalarySettings: (s) => {
    set({ salarySettings: s });
    saveData({ salarySettings: s });
  },

  clearAll: () => {
    clearAllData();
    set({
      favorites: [],
      compareList: [],
      quizAnswers: {},
      quizStage: 0,
      quizCompleted: false,
      quizCompletedAt: null,
      priorities: defaultPriorityProfile,
      wishlist: [],
      roadmapProgress: {},
      challengeResults: {},
      salarySettings: null,
    });
  },
}));
