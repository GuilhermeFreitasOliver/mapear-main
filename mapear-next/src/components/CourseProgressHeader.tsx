'use client';

interface CourseProgressHeaderProps {
  completedLessons: number;
  totalLessons: number;
  overallProgress: number;
  estimatedTimeRemaining: string;
  currentModule: string;
}

export default function CourseProgressHeader({
  completedLessons,
  totalLessons,
  overallProgress,
  estimatedTimeRemaining,
  currentModule,
}: CourseProgressHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#1C1F2E] via-[#1e2740] to-[#1C1F2E] border border-slate-700/50 rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Progress Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
              {currentModule}
            </span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-300 text-sm font-medium">{estimatedTimeRemaining} restantes</span>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Seu Progresso</h3>
              <span className="text-2xl font-bold text-green-400">{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-green-400 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            <span className="font-semibold text-white">{completedLessons}</span> de{' '}
            <span className="font-semibold text-white">{totalLessons}</span> aulas concluídas
          </p>
        </div>

        {/* Right: Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 min-w-[100px] text-center">
            <div className="text-2xl font-bold text-blue-400">{completedLessons}</div>
            <div className="text-xs text-slate-400 mt-1">Concluídas</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 min-w-[100px] text-center">
            <div className="text-2xl font-bold text-orange-400">{totalLessons - completedLessons}</div>
            <div className="text-xs text-slate-400 mt-1">Restantes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
