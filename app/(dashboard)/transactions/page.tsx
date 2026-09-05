import db from '@/lib/db';

export default function Transactions() {
  const transactions = db.prepare('SELECT * FROM transactions').all();

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[#F5F7FA]">Transactions</h1>
        <p className="text-[#8B93A7] mt-1">View all transactions and their recovery statuses.</p>
      </header>

      <div className="bg-[#0D1017] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-[#8B93A7] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Tx ID</th>
                <th className="p-4 font-medium">Customer ID</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Failure Reason</th>
                <th className="p-4 font-medium">Score</th>
                <th className="p-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {transactions.slice(0, 50).map((t: any) => (
                <tr key={t.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 text-gray-300 font-mono text-xs">{t.id}</td>
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
