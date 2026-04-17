'use client';

import { useState } from 'react';

export type CourseLessonStatus = 'locked' | 'not-started' | 'in-progress' | 'completed';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  status: CourseLessonStatus;
}

export interface CourseModule {
  id: string;
  title: string;
  hours: string;
  lessons: CourseLesson[];
  progress: number; // 0-100
}

interface CourseSidebarProps {
  modules: CourseModule[];
  activeModuleId: string;
  activeLessonId: string | null;
  onModuleClick: (moduleId: string) => void;
  onLessonClick: (moduleId: string, lessonId: string) => void;
}

export default function CourseSidebar({
  modules,
  activeModuleId,
  activeLessonId,
  onModuleClick,
  onLessonClick,
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([activeModuleId]));

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getStatusIcon = (status: CourseLessonStatus) => {
    switch (status) {
      case 'locked':
        return <span className="text-slate-500">🔒</span>;
      case 'not-started':
        return <span className="w-5 h-5 rounded-full border-2 border-slate-600 flex-shrink-0"></span>;
      case 'in-progress':
        return (
          <span className="w-5 h-5 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          </span>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-[#1C1F2E] border border-slate-700/50 rounded-xl p-3 sm:p-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      {/* Module List */}
      <nav className="space-y-2">
        {modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          const isActive = activeModuleId === module.id;

          return (
            <div key={module.id} className="border border-slate-700/30 rounded-lg overflow-hidden bg-slate-800/30">
              {/* Module Header */}
              <button
                onClick={() => {
                  toggleModule(module.id);
                  onModuleClick(module.id);
                }}
                className={`w-full px-3 py-3 flex items-start gap-2 hover:bg-slate-700/30 transition-colors ${isActive ? 'bg-slate-700/50' : ''
                  }`}
              >
                <span className="text-lg mt-0.5 flex-shrink-0">{isExpanded ? '▼' : '▶'}</span>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-sm font-semibold text-white">
                    Módulo {module.id.replace('mod', '')}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-tight mt-0.5">{module.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500">{module.hours}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-semibold text-green-400">{Math.round(module.progress)}%</span>
                  </div>
                </div>
              </button>

              {/* Lesson List */}
              {isExpanded && (
                <ul className="bg-slate-900/50 divide-y divide-slate-700/30">
                  {module.lessons.map((lesson) => {
                    const isActivLesson = activeLessonId === lesson.id;

                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => onLessonClick(module.id, lesson.id)}
                          disabled={lesson.status === 'locked'}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left disabled:cursor-not-allowed disabled:opacity-50 ${isActivLesson ? 'bg-blue-500/10 border-l-2 border-blue-400' : ''
                            }`}
                        >
                          {getStatusIcon(lesson.status)}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${isActivLesson ? 'text-blue-300' : 'text-slate-200'
                                }`}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-xs text-slate-500">{lesson.duration}</p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
