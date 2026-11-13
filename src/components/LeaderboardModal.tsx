import React, { useState } from 'react';
import { Trophy, ArrowLeft, Medal, User, Globe, Award } from 'lucide-react';
import { GameState, GameStats, LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  setCurrentView: (view: GameState) => void;
  stats: GameStats;
}

const MOCK_GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'WordMaster_UK', score: 1720, timeSeconds: 42, hintsUsed: 0, date: '2026-11-13' },
  { rank: 2, name: 'StackQueen', score: 1650, timeSeconds: 48, hintsUsed: 0, date: '2026-11-13' },
  { rank: 3, name: 'PuzzlerPro', score: 1510, timeSeconds: 55, hintsUsed: 1, date: '2026-11-13' },
  { rank: 4, name: 'LexiStack', score: 1460, timeSeconds: 62, hintsUsed: 1, date: '2026-11-13' },
  { rank: 5, name: 'LondonTile', score: 1340, timeSeconds: 70, hintsUsed: 2, date: '2026-11-13' },
];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ setCurrentView, stats }) => {
  const [tab, setTab] = useState<'global' | 'local'>('global');

  const completedEntries = Object.entries(stats.completedDays)
    .map(([date, data]) => ({
      date,
      ...data,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => setCurrentView('TITLE')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#581c6b] dark:text-amber-400 mb-2 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </button>
          <h1 className="text-3xl font-black text-[#3b0d47] dark:text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            Leaderboard & High Scores
          </h1>
          <p className="text-sm text-slate-500 dark:text-purple-200/70">
            Compare your DeStack mastery against players worldwide and your personal records.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-purple-100/70 dark:bg-[#240930] rounded-xl border border-purple-200 dark:border-purple-800">
          <button
            onClick={() => setTab('global')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'global'
                ? 'bg-white dark:bg-[#3b0d47] text-[#2d0938] dark:text-amber-300 shadow-sm'
                : 'text-slate-600 dark:text-purple-200/70 hover:text-[#2d0938]'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-500" /> Global Top
          </button>
          <button
            onClick={() => setTab('local')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'local'
                ? 'bg-white dark:bg-[#3b0d47] text-[#2d0938] dark:text-amber-300 shadow-sm'
                : 'text-slate-600 dark:text-purple-200/70 hover:text-[#2d0938]'
            }`}
          >
            <User className="w-4 h-4 text-amber-500" /> Your Records
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#240930] border border-purple-200/80 dark:border-purple-800/70 rounded-3xl overflow-hidden shadow-xl">
        {tab === 'global' ? (
          <div className="divide-y divide-purple-100 dark:divide-purple-800/60">
            {MOCK_GLOBAL_LEADERBOARD.map((entry) => (
              <div
                key={entry.rank}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${
                      entry.rank === 1
                        ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-[#2d0938] shadow-amber-500/30'
                        : entry.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : entry.rank === 3
                        ? 'bg-amber-700/70 text-white'
                        : 'bg-purple-50 dark:bg-[#360b42] text-[#4a1259] dark:text-purple-200'
                    }`}
                  >
                    {entry.rank === 1 ? <Medal className="w-5 h-5" /> : `#${entry.rank}`}
                  </div>
                  <div>
                    <div className="font-bold text-[#2d0938] dark:text-white">{entry.name}</div>
                    <div className="text-xs text-slate-400 dark:text-purple-300/60 font-mono">
                      Solved on {entry.date} · {entry.hintsUsed} hints
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-[#4a1259] dark:text-amber-400 font-mono tabular-nums text-lg">
                    {entry.score} pts
                  </div>
                  <div className="text-xs text-slate-400 dark:text-purple-300/60 font-mono tabular-nums">
                    ⏱️ {entry.timeSeconds}s
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {completedEntries.length === 0 ? (
              <div className="p-12 text-center">
                <Award className="w-12 h-12 text-purple-300 dark:text-purple-700 mx-auto mb-3" />
                <h3 className="font-bold text-[#2d0938] dark:text-white mb-1">No Puzzles Completed Yet</h3>
                <p className="text-xs text-slate-500 dark:text-purple-200/70">
                  Play and solve daily puzzles to populate your personal records!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-purple-100 dark:divide-purple-800/60">
                {completedEntries.map((entry, idx) => (
                  <div
                    key={entry.date}
                    className="p-4 sm:p-5 flex items-center justify-between hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-[#4a1259] dark:text-amber-300 flex items-center justify-center font-bold font-mono">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-[#2d0938] dark:text-white">Puzzle Date: {entry.date}</div>
                        <div className="text-xs text-slate-400 dark:text-purple-300/60 font-mono">
                          Hints used: {entry.hintsUsed}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-[#4a1259] dark:text-amber-400 font-mono tabular-nums text-lg">
                        {entry.score} pts
                      </div>
                      <div className="text-xs text-slate-400 dark:text-purple-300/60 font-mono tabular-nums">
                        ⏱️ {entry.timeSeconds}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
