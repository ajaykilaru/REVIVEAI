import { ShieldCheck } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[#F5F7FA]">Recovery Rules</h1>
        <p className="text-[#8B93A7] mt-1">Financial guardrails and AI permissions.</p>
      </header>

      <div className="bg-[#0D1017] p-8 rounded-2xl border border-gray-800 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck size={28} className="text-green-500" />
          <h2 className="text-xl font-semibold text-white">Active Guardrails</h2>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center py-4 border-b border-gray-800/50">
            <div>
              <div className="font-medium text-white">Maximum Recovery Attempts</div>
              <div className="text-sm text-gray-400 mt-1">Stop trying after this many attempts to avoid spamming.</div>
            </div>
            <div className="px-4 py-2 bg-gray-800 rounded-lg text-white font-mono">2 attempts</div>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-gray-800/50">
            <div>
              <div className="font-medium text-white">Require Approval Threshold</div>
              <div className="text-sm text-gray-400 mt-1">Transactions above this value require manual approval before action.</div>
            </div>
            <div className="px-4 py-2 bg-gray-800 rounded-lg text-white font-mono">₹5,000</div>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-gray-800/50">
            <div>
              <div className="font-medium text-white">Maximum Discount</div>
              <div className="text-sm text-gray-400 mt-1">Maximum AI-authorized discount to incentivize payment.</div>
            </div>
            <div className="px-4 py-2 bg-gray-800 rounded-lg text-white font-mono">10%</div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div>
              <div className="font-medium text-white">Respect Customer Opt-Out</div>
              <div className="text-sm text-gray-400 mt-1">Do not attempt recovery if customer requested no contact.</div>
            </div>
            <div className="px-4 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">Enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
