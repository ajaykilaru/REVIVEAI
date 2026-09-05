import Link from 'next/link';
import db from '@/lib/db';
import { Activity, AlertCircle, CheckCircle2, TrendingUp, RefreshCcw } from 'lucide-react';
import ElectricBorder from '@/components/ui/ElectricBorder';
import StarBorder from '@/components/ui/StarBorder';

export default function Dashboard() {
  const transactions = db.prepare('SELECT * FROM transactions').all();
  
  const atRisk = transactions.filter((t: any) => t.status === 'failed').reduce((sum: number, t: any) => sum + t.amount, 0);
  const recovered = 176400; // Hardcoded recovered for demo per PRD
  const recoverableCount = transactions.filter((t: any) => t.recovery_score > 0.5).length;
  const recoveryRate = 36.5; 

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F7FA]">Recovery Command Center</h1>
          <p className="text-[#8B93A7] mt-1">Overview of your revenue recovery operations.</p>
        </div>
        <StarBorder as="div" color="#8B5CF6" speed="4s" backgroundColor="#8B5CF6" className="shadow-lg shadow-violet-500/20">
          <Link href="/recovery" className="px-6 py-2 text-white font-medium flex items-center gap-2">
            <RefreshCcw size={18} />
            Run Recovery Agent
          </Link>
        </StarBorder>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ElectricBorder color="#ef4444" speed={1.5} chaos={0.05} borderRadius={16}>
          <div className="bg-[#0D1017] p-6 rounded-2xl h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertCircle size={20} />
              <h3 className="font-medium">Revenue at Risk</h3>
            </div>
            <p className="text-4xl font-mono font-semibold text-white">₹{atRisk.toLocaleString()}</p>
          </div>
        </ElectricBorder>
        
        <ElectricBorder color="#22c55e" speed={1.5} chaos={0.05} borderRadius={16}>
          <div className="bg-[#0D1017] p-6 rounded-2xl h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-green-400 mb-4">
              <CheckCircle2 size={20} />
              <h3 className="font-medium">Revenue Recovered</h3>
            </div>
            <p className="text-4xl font-mono font-semibold text-white">₹{recovered.toLocaleString()}</p>
          </div>
        </ElectricBorder>

        <ElectricBorder color="#8b5cf6" speed={1.5} chaos={0.05} borderRadius={16}>
          <div className="bg-[#0D1017] p-6 rounded-2xl h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-violet-400 mb-4">
              <TrendingUp size={20} />
              <h3 className="font-medium">Recovery Rate</h3>
            </div>
            <p className="text-4xl font-mono font-semibold text-white">{recoveryRate}%</p>
          </div>
        </ElectricBorder>

        <ElectricBorder color="#3b82f6" speed={1.5} chaos={0.05} borderRadius={16}>
          <div className="bg-[#0D1017] p-6 rounded-2xl h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Activity size={20} />
              <h3 className="font-medium">Recoverable Txs</h3>
            </div>
            <p className="text-4xl font-mono font-semibold text-white">{recoverableCount}</p>
          </div>
        </ElectricBorder>
      </div>
      
      {/* Transaction List Preview */}
      <div className="bg-[#0D1017] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Recent Failed Transactions</h2>
          <Link href="/transactions" className="text-violet-400 text-sm hover:text-violet-300">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-[#8B93A7] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Customer ID</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Failure Reason</th>
                <th className="p-4 font-medium">AI Score</th>
                <th className="p-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {transactions.slice(0, 5).map((t: any) => (
                <tr key={t.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 text-gray-300 font-mono text-sm">{t.customer_id}</td>
                  <td className="p-4 text-white font-mono font-medium">₹{t.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-400 capitalize">{t.failure_reason}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${t.recovery_score > 0.5 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {(t.recovery_score * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 capitalize">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
