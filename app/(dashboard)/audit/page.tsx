import { FileText } from 'lucide-react';

export default function AuditTrail() {
  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[#F5F7FA]">Audit Trail</h1>
        <p className="text-[#8B93A7] mt-1">Immutable record of all agent actions and approvals.</p>
      </header>

      <div className="bg-[#0D1017] p-8 rounded-2xl border border-gray-800 relative">
        <div className="absolute left-[39px] top-[100px] bottom-10 w-0.5 bg-gray-800" />
        
        <div className="space-y-8 relative">
          <div className="flex gap-6">
            <div className="w-4 h-4 mt-1 rounded-full bg-green-500 ring-4 ring-[#0D1017] z-10" />
            <div>
              <div className="text-sm text-gray-400 font-mono mb-1">13:42:09</div>
              <div className="font-medium text-white text-lg">Payment Link created</div>
              <div className="text-gray-400 mt-1">Action successfully executed via Razorpay Test API.</div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-4 h-4 mt-1 rounded-full bg-violet-500 ring-4 ring-[#0D1017] z-10" />
            <div>
              <div className="text-sm text-gray-400 font-mono mb-1">13:42:08</div>
              <div className="font-medium text-white text-lg">Human approval received</div>
              <div className="text-gray-400 mt-1">Merchant approved action for Customer 12.</div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-4 h-4 mt-1 rounded-full bg-gray-600 ring-4 ring-[#0D1017] z-10" />
            <div>
              <div className="text-sm text-gray-400 font-mono mb-1">13:42:06</div>
              <div className="font-medium text-white text-lg">Payment Link selected</div>
              <div className="text-gray-400 mt-1">AI determined Payment Link is optimal action.</div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-4 h-4 mt-1 rounded-full bg-gray-600 ring-4 ring-[#0D1017] z-10" />
            <div>
              <div className="text-sm text-gray-400 font-mono mb-1">13:42:05</div>
              <div className="font-medium text-white text-lg">Recovery probability calculated</div>
              <div className="text-gray-400 mt-1">Assigned 82% recovery probability based on history.</div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-4 h-4 mt-1 rounded-full bg-red-500 ring-4 ring-[#0D1017] z-10" />
            <div>
              <div className="text-sm text-gray-400 font-mono mb-1">13:42:04</div>
              <div className="font-medium text-white text-lg">Payment failure analyzed</div>
              <div className="text-gray-400 mt-1">Detected failed transaction for ₹5,400.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
