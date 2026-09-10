'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Brain, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { quizQuestions, quizStages } from '@/data/quizQuestions';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';

const scaleLabels = ['لا ينطبق إطلاقًا', 'ينطبق قليلًا', 'محايد', 'ينطبق بدرجة كبيرة', 'ينطبق جدًا'];

export default function QuizPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const quizStage = useAppStore((s) => s.quizStage);
  const quizCompleted = useAppStore((s) => s.quizCompleted);
  const setQuizAnswer = useAppStore((s) => s.setQuizAnswer);
  const setQuizStage = useAppStore((s) => s.setQuizStage);
  const completeQuiz = useAppStore((s) => s.completeQuiz);
  const resetQuiz = useAppStore((s) => s.resetQuiz);
  const [hydrated, setHydrated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => { hydrate(); setHydrated(true); }, [hydrate]);

  useEffect(() => {
    if (hydrated) {
      const stageStart = quizStage * 6;
      setCurrentQuestion(stageStart);
    }
  }, [hydrated, quizStage]);

  if (!hydrated) return null;

  // Show resume option if quiz in progress
  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
            <h1 className="text-xl font-bold">أكملت الاختبار بالفعل</h1>
            <p className="text-sm text-muted-foreground">يمكنك عرض نتائجك أو إعادة الاختبار من البداية</p>
            <div className="flex justify-center gap-2">
              <Link href="/results"><Button className="gap-2"><Brain className="h-4 w-4" /> عرض النتائج</Button></Link>
              <Button variant="outline" className="gap-2" onClick={() => { resetQuiz(); }}><RotateCcw className="h-4 w-4" /> إعادة الاختبار</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasProgress = Object.keys(quizAnswers).length > 0;
  const totalAnswered = Object.keys(quizAnswers).length;
  const progress = (totalAnswered / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];
  const isLast = currentQuestion === quizQuestions.length - 1;
  const currentStageQuestions = quizQuestions.filter(q => q.stage === quizStages[quizStage].id);
  const stageProgress = currentStageQuestions.filter(q => quizAnswers[q.id] !== undefined).length;

  const handleAnswer = (value: number) => {
    setQuizAnswer(question.id, value);
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        const next = currentQuestion + 1;
        setCurrentQuestion(next);
        const newStage = Math.floor(next / 6);
        if (newStage !== quizStage) setQuizStage(newStage);
      } else {
        completeQuiz();
      }
    }, 200);
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newStage = Math.floor((currentQuestion - 1) / 6);
      if (newStage !== quizStage) setQuizStage(newStage);
    }
  };

  const goNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      const newStage = Math.floor(next / 6);
      if (newStage !== quizStage) setQuizStage(newStage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">اختبار الميول الهندسية</h1>
          <span className="text-xs text-muted-foreground">{currentQuestion + 1} / {quizQuestions.length}</span>
        </div>
        <Progress value={progress} className="mb-2" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>المرحلة {quizStage + 1}: {quizStages[quizStage].nameAr}</span>
          <span>•</span>
          <span>{stageProgress}/6 أسئلة</span>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="p-6">
          <p className="text-lg font-medium mb-6 leading-relaxed">{question.questionAr}</p>
          <div className="space-y-2">
            {scaleLabels.map((label, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i + 1)}
                className={cn(
                  'w-full p-3 rounded-lg border text-right text-sm transition-all hover:shadow-md',
                  quizAnswers[question.id] === i + 1 ? 'border-primary bg-primary/5 shadow-sm' : 'border-border'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className="text-xs text-muted-foreground">{i + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={goPrev} disabled={currentQuestion === 0} className="gap-1">
          <ArrowRight className="h-4 w-4" /> السابق
        </Button>
        <Button variant="outline" size="sm" onClick={goNext} disabled={isLast || quizAnswers[question.id] === undefined} className="gap-1">
          التالي <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {hasProgress && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => { resetQuiz(); setCurrentQuestion(0); }}>
            <RotateCcw className="h-3 w-3" /> البدء من جديد
          </Button>
        </div>
      )}
    </div>
  );
}
