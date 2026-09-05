import Link from 'next/link';
import { LayoutDashboard, Users, Activity, FileText, Settings } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 border-r border-gray-800 bg-[#0D1017] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">REVIVEAI</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/transactions" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
            <Users size={20} />
            <span className="font-medium">Transactions</span>
          </Link>
          <Link href="/recovery" className="flex items-center gap-3 px-4 py-3 text-violet-400 bg-violet-500/10 rounded-lg transition-colors">
            <Activity size={20} />
            <span className="font-medium">Recovery Agent</span>
          </Link>
          <Link href="/audit" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
            <FileText size={20} />
            <span className="font-medium">Audit Trail</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
            <Settings size={20} />
            <span className="font-medium">Rules</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-400">Agent Status: <span className="text-white font-medium">ONLINE</span></span>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
