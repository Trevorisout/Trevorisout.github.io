import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Trophy,
  ChevronLeft,
  Lock,
  CheckCircle,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";
import confetti from "canvas-confetti";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { LESSONS, Lesson } from "../data/lessons";
import { Diagram } from "./Diagrams";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export default function AcademicLearning() {
  const { profile, updateProgress } = useAuth();
  const xp = profile?.xp || 0;
  const completedLessons = profile?.completedLessons || [];

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState<"content" | "quiz">("content");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [isCorrectBlank, setIsCorrectBlank] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const handleSelectLesson = (lesson: Lesson | null) => {
    setSelectedLesson(lesson);
    setCurrentStep("content");
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setBlankAnswer("");
    setIsCorrectBlank(false);
    setEarnedXp(0);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === selectedLesson!.quiz[quizIndex].correctAnswer) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleBlankSubmit = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    const correctText = selectedLesson!.quiz[quizIndex].correctAnswerText
      ?.toLowerCase()
      .trim();
    const userText = blankAnswer.toLowerCase().trim();

    if (correctText && userText === correctText) {
      setIsCorrectBlank(true);
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setIsCorrectBlank(false);
    }
  };

  const nextQuiz = () => {
    if (quizIndex + 1 < selectedLesson!.quiz.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setBlankAnswer("");
      setIsCorrectBlank(false);
    } else {
      setIsFinished(true);
      const percentage = Math.round(
        (score / selectedLesson!.quiz.length) * 100,
      );
      const currentScore = profile?.lessonScores?.[selectedLesson!.id] || 0;

      if (percentage > currentScore) {
        const xpDiff = Math.round(
          (selectedLesson!.xp * (percentage - currentScore)) / 100,
        );
        setEarnedXp(xpDiff);
        updateProgress(xpDiff, selectedLesson!.id, percentage);
      } else if (!completedLessons.includes(selectedLesson!.id)) {
        setEarnedXp(0);
        updateProgress(0, selectedLesson!.id, currentScore);
      } else {
        setEarnedXp(0);
      }
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 md:px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100"
        >
          <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Hoàn thành bài học!
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8">
            Bạn đã nắm vững kiến thức cơ bản về {selectedLesson?.titleVi}
          </p>
          <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="text-center">
              <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                Điểm
              </p>
              <p className="text-3xl md:text-4xl font-black text-blue-600">
                {Math.round((score / selectedLesson!.quiz.length) * 100)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                XP nhận được
              </p>
              <p className="text-3xl md:text-4xl font-black text-orange-500">
                +{earnedXp}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSelectLesson(null)}
            className="w-full md:w-auto bg-slate-900 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Quay lại danh sách
          </button>
        </motion.div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="max-w-3xl mx-auto py-4 md:py-8 px-4 md:px-6 pb-40 md:pb-12">
        <button
          onClick={() => handleSelectLesson(null)}
          className="mb-6 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors font-bold"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại danh sách bài học
        </button>

        <AnimatePresence mode="wait">
          {currentStep === "content" ? (
            <motion.div
              key="content"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {selectedLesson.title}
                  </h2>
                  <p className="text-sm md:text-base text-slate-400 font-medium italic">
                    {selectedLesson.titleVi}
                  </p>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                {selectedLesson.content.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
                  >
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black">
                        {i + 1}
                      </div>
                      {section.title}
                    </h3>
                    <div className="space-y-3 pl-11">
                      {section.paragraphs.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-slate-600 leading-relaxed text-base font-medium"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.imageUrl && (
                        <div className="mt-6 mb-4 relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm group">
                          <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={4}
                            centerOnInit={true}
                            wheel={{ step: 0.1 }}
                          >
                            {({ zoomIn, zoomOut, resetTransform }) => (
                              <>
                                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => zoomIn()}
                                    className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md hover:bg-white text-slate-700 transition-colors"
                                    title="Phóng to"
                                  >
                                    <ZoomIn className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => zoomOut()}
                                    className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md hover:bg-white text-slate-700 transition-colors"
                                    title="Thu nhỏ"
                                  >
                                    <ZoomOut className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => resetTransform()}
                                    className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-md hover:bg-white text-slate-700 transition-colors"
                                    title="Khôi phục"
                                  >
                                    <Maximize className="w-5 h-5" />
                                  </button>
                                </div>
                                <TransformComponent
                                  wrapperClass="w-full h-full"
                                  contentClass="w-full h-full relative"
                                >
                                  {section.imageUrl.startsWith("diagram:") ? (
                                    <Diagram
                                      id={section.imageUrl.split(":")[1]}
                                      className="w-full h-auto object-cover max-h-[400px] bg-slate-100"
                                    />
                                  ) : (
                                    <img
                                      src={section.imageUrl}
                                      alt={section.imageAlt || section.title}
                                      className="w-full h-auto object-cover max-h-[400px] bg-slate-100"
                                      referrerPolicy="no-referrer"
                                    />
                                  )}
                                  {section.imageMarkers && (
                                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                                      {section.imageMarkers.map(
                                        (marker, idx) => {
                                          const lx =
                                            marker.labelX ??
                                            (marker.x < 50
                                              ? Math.max(5, marker.x - 15)
                                              : Math.min(95, marker.x + 15));
                                          const ly =
                                            marker.labelY ??
                                            (marker.y < 50
                                              ? Math.max(5, marker.y - 15)
                                              : Math.min(95, marker.y + 15));
                                          return (
                                            <line
                                              key={`line-${idx}`}
                                              x1={`${marker.x}%`}
                                              y1={`${marker.y}%`}
                                              x2={`${lx}%`}
                                              y2={`${ly}%`}
                                              stroke="#2563eb"
                                              strokeWidth="2"
                                              className="opacity-80"
                                            />
                                          );
                                        },
                                      )}
                                    </svg>
                                  )}
                                  {section.imageMarkers &&
                                    section.imageMarkers.map((marker, idx) => {
                                      const lx =
                                        marker.labelX ??
                                        (marker.x < 50
                                          ? Math.max(5, marker.x - 15)
                                          : Math.min(95, marker.x + 15));
                                      const ly =
                                        marker.labelY ??
                                        (marker.y < 50
                                          ? Math.max(5, marker.y - 15)
                                          : Math.min(95, marker.y + 15));
                                      return (
                                        <React.Fragment key={idx}>
                                          <div
                                            className="absolute w-2 h-2 -ml-1 -mt-1 bg-blue-600 rounded-full shadow-sm border border-white z-0"
                                            style={{
                                              left: `${marker.x}%`,
                                              top: `${marker.y}%`,
                                            }}
                                          />
                                          <div
                                            className="absolute w-6 h-6 -ml-3 -mt-3 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-transform hover:scale-110 cursor-pointer z-10"
                                            style={{
                                              left: `${lx}%`,
                                              top: `${ly}%`,
                                            }}
                                          >
                                            {marker.id}
                                          </div>
                                        </React.Fragment>
                                      );
                                    })}
                                </TransformComponent>
                              </>
                            )}
                          </TransformWrapper>
                        </div>
                      )}
                      {section.legend && section.legend.length > 0 && (
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-2 mb-6">
                          <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Chú thích
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {section.legend.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-slate-600 flex items-start gap-3"
                              >
                                <span className="font-bold text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs mt-0.5 shadow-sm">
                                  {item.label}
                                </span>
                                <span className="pt-0.5">
                                  {item.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.gifUrl && (
                        <div className="mt-6 mb-4 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                              Ảnh động minh họa (GIF)
                            </h4>
                          </div>
                          <img
                            src={section.gifUrl}
                            alt={section.gifAlt || "Animation"}
                            className="w-full h-auto object-contain max-h-[400px] bg-slate-100"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep("quiz")}
                className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-200"
              >
                Start Quiz <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-slate-100"
            >
              <div className="flex justify-between items-center mb-8 md:mb-10">
                <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Câu hỏi {quizIndex + 1} / {selectedLesson.quiz.length}
                </span>
                <div className="w-32 md:w-48 h-2 md:h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-700 ease-out"
                    style={{
                      width: `${((quizIndex + 1) / selectedLesson.quiz.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-8 md:mb-10 leading-tight">
                {selectedLesson.quiz[quizIndex].question}
              </h3>

              {selectedLesson.quiz[quizIndex].type === "fill-in-blank" ? (
                <div className="mb-8 md:mb-10">
                  <input
                    type="text"
                    disabled={isAnswered}
                    value={blankAnswer}
                    onChange={(e) => setBlankAnswer(e.target.value)}
                    placeholder="Nhập câu trả lời của bạn..."
                    className={cn(
                      "w-full p-4 md:p-6 rounded-2xl text-left font-bold transition-all border-2 outline-none",
                      !isAnswered && "border-slate-200 focus:border-indigo-500",
                      isAnswered &&
                        isCorrectBlank &&
                        "border-emerald-500 bg-emerald-50 text-emerald-700",
                      isAnswered &&
                        !isCorrectBlank &&
                        "border-rose-500 bg-rose-50 text-rose-700",
                    )}
                  />
                  {!isAnswered && (
                    <button
                      onClick={handleBlankSubmit}
                      disabled={!blankAnswer.trim()}
                      className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 transition-all hover:bg-indigo-700"
                    >
                      Kiểm tra
                    </button>
                  )}
                  {isAnswered && !isCorrectBlank && (
                    <p className="mt-4 text-emerald-600 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Đáp án đúng:{" "}
                      {selectedLesson.quiz[quizIndex].correctAnswerText}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {selectedLesson.quiz[quizIndex].options?.map(
                    (option, idx) => {
                      const isCorrect =
                        idx === selectedLesson.quiz[quizIndex].correctAnswer;
                      const isSelected = idx === selectedOption;

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleOptionSelect(idx)}
                          className={cn(
                            "w-full p-4 md:p-6 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group",
                            !isAnswered &&
                              "border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30",
                            isAnswered &&
                              isCorrect &&
                              "border-emerald-500 bg-emerald-50 text-emerald-700",
                            isAnswered &&
                              isSelected &&
                              !isCorrect &&
                              "border-rose-500 bg-rose-50 text-rose-700",
                            isAnswered &&
                              !isSelected &&
                              !isCorrect &&
                              "border-slate-100 opacity-50",
                          )}
                        >
                          <span className="text-base md:text-lg">{option}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 shrink-0 ml-2" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-6 h-6 md:w-7 md:h-7 text-rose-500 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
              )}

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 p-4 md:p-6 rounded-2xl mb-8 md:mb-10 border border-slate-100"
                >
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    <span className="font-black text-slate-900 block mb-2 uppercase text-[10px] md:text-xs tracking-widest">
                      Giải thích
                    </span>
                    {selectedLesson.quiz[quizIndex].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep === "quiz" && isAnswered && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={nextQuiz}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-slate-900 text-white px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            {quizIndex + 1 < selectedLesson.quiz.length
              ? "Tiếp tục"
              : "Hoàn thành"}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    );
  }

  // Group lessons by chapter
  const chapters = Array.from(new Set(LESSONS.map((l) => l.chapter)));

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-8 pb-40 md:pb-12">
      <div className="mb-8 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 flex items-center gap-3 md:gap-5">
          <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-indigo-600" />
          Học tập lý thuyết
        </h1>
        <p className="text-slate-500 text-base md:text-xl max-w-2xl font-medium">
          Làm chủ các kiến thức về động cơ đốt trong và hệ thống ô tô theo
          chương trình lớp 11 VN.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16">
        {chapters.map((chapterName) => {
          const chapterLessons = LESSONS.filter(
            (l) => l.chapter === chapterName,
          );
          const isChapter6 = chapterName.includes("Chương 6");
          const chapterTitle = isChapter6
            ? "Động cơ đốt trong"
            : "Hệ thống ô tô";
          const chapterLabel = isChapter6
            ? "INTERNAL COMBUSTION ENGINES"
            : "AUTOMOBILE SYSTEMS";

          return (
            <div key={chapterName} className="space-y-8">
              <div>
                <p className="text-[10px] md:text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">
                  {chapterLabel}
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  {chapterName}
                </h2>
              </div>

              <div className="grid gap-4">
                {chapterLessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked =
                    !isCompleted &&
                    idx > 0 &&
                    !completedLessons.includes(chapterLessons[idx - 1].id);
                  const isCurrent = !isCompleted && !isLocked;

                  return (
                    <motion.button
                      key={lesson.id}
                      disabled={isLocked}
                      whileHover={!isLocked ? { x: 8 } : {}}
                      onClick={() => handleSelectLesson(lesson)}
                      className={cn(
                        "relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 rounded-3xl border-2 transition-all text-left group",
                        isCompleted &&
                          "bg-white border-slate-100 hover:border-emerald-200",
                        isCurrent &&
                          "bg-white border-indigo-600 shadow-xl shadow-indigo-100",
                        isLocked &&
                          "bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed",
                      )}
                    >
                      {/* Left Accent Bar */}
                      {isCompleted && (
                        <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-emerald-500 rounded-r-full hidden md:block" />
                      )}

                      {/* Icon */}
                      <div
                        className={cn(
                          "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                          isCompleted && "bg-emerald-50 text-emerald-600",
                          isCurrent && "bg-indigo-600 text-white",
                          isLocked && "bg-slate-200 text-slate-400",
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6 md:w-8 md:h-8" />
                        ) : (
                          <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3
                          className={cn(
                            "text-xl font-black mb-1",
                            isLocked ? "text-slate-400" : "text-slate-900",
                          )}
                        >
                          {lesson.titleVi}
                        </h3>
                        <p
                          className={cn(
                            "text-sm font-medium line-clamp-1",
                            isLocked ? "text-slate-300" : "text-slate-500",
                          )}
                        >
                          {lesson.description}
                        </p>
                      </div>

                      {/* XP and Score */}
                      <div className="text-right flex flex-col items-end gap-1">
                        <div
                          className={cn(
                            "px-4 py-2 rounded-xl font-black text-sm",
                            isCompleted
                              ? "bg-emerald-50 text-emerald-600"
                              : isCurrent
                                ? "bg-orange-50 text-orange-600"
                                : "bg-slate-100 text-slate-400",
                          )}
                        >
                          {isCompleted &&
                          profile?.lessonScores?.[lesson.id] !== undefined
                            ? `+${Math.round((lesson.xp * profile.lessonScores[lesson.id]) / 100)} / ${lesson.xp} XP`
                            : `+${lesson.xp} XP`}
                        </div>
                        {isCompleted &&
                          profile?.lessonScores?.[lesson.id] !== undefined && (
                            <div className="text-xs font-bold text-slate-500">
                              Độ chính xác:{" "}
                              <span
                                className={cn(
                                  profile.lessonScores[lesson.id] >= 80
                                    ? "text-emerald-600"
                                    : profile.lessonScores[lesson.id] >= 50
                                      ? "text-orange-500"
                                      : "text-rose-500",
                                )}
                              >
                                {profile.lessonScores[lesson.id]}%
                              </span>
                            </div>
                          )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
