"use client";

import { useState } from 'react';
import { Play, Check, X } from 'lucide-react';

export default function RecoveryAgent() {
  const [status, setStatus] = useState('idle'); // idle, running, complete
  const [progress, setProgress] = useState(0);

  const runAgent = () => {
    setStatus('running');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('complete');
          return 100;
        }
        return p + 20;
      });
    }, 500);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F7FA]">Recovery Agent</h1>
          <p className="text-[#8B93A7] mt-1">AI-powered analysis and execution.</p>
        </div>
        {status === 'idle' && (
          <button onClick={runAgent} className="px-6 py-3 bg-[#8B5CF6] hover:bg-violet-500 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-violet-500/20">
            <Play size={18} />
            Run Recovery Agent
          </button>
        )}
      </header>

      {status !== 'idle' && (
        <div className="bg-[#0D1017] p-8 rounded-2xl border border-gray-800 font-mono">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-violet-400">✦ RECOVERY AGENT</div>
            {status === 'running' ? <div className="text-green-400 animate-pulse">● ANALYZING</div> : <div className="text-gray-400">● COMPLETED</div>}
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-violet-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="space-y-2 text-gray-300">
            {progress >= 20 && <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> 100 transactions scanned</div>}
            {progress >= 40 && <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> 37 recovery opportunities identified</div>}
            {progress >= 60 && <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Calculated customer recovery scores</div>}
            {progress >= 80 && <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Applied merchant rules & generated action plan</div>}
            {progress >= 100 && (
              <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
                <div className="text-white font-medium mb-4">PROJECTED RECOVERY: <span className="text-green-400 text-2xl font-bold ml-2">₹1,76,400</span></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-[#0D1017] rounded-lg">✓ 22 low-risk actions ready</div>
                  <div className="p-3 bg-[#0D1017] rounded-lg text-yellow-400">⚠ 9 actions require approval</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {status === 'complete' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Manual Approval Queue</h2>
          {/* Mock Action */}
          <div className="bg-[#0D1017] p-6 rounded-2xl border border-yellow-500/30">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-white">Customer 12</h3>
                  <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-xs rounded-full">Approval Required</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">Amount: <span className="text-white font-mono">₹5,400</span> • Failure: <span className="text-red-400">Insufficient funds</span></div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Expected Recovery</div>
                <div className="text-lg text-green-400 font-mono font-bold">₹5,400</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-800">
              <div className="text-sm text-violet-400 font-medium mb-2">AI REASONING</div>
              <p className="text-gray-300 text-sm">Customer has successfully completed 4/5 previous payments. The current failure appears temporary. Payment Link is recommended.</p>
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>Recovery Score: 82%</span>
                <span>Action: Generate Payment Link</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">Approve Action</button>
              <button className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
