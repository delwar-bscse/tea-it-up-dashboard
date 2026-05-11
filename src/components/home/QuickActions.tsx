import React from "react";
import { Upload, ClipboardList, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

      <div className="flex flex-col gap-4 flex-1">
        {/* Upload Action */}
        <button className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-[#2ea268]/30 hover:border-[#2ea268]/50 hover:bg-[#2ea268]/5 transition-all group text-left w-full">
          <div className="p-3 bg-[#eefaf3] rounded-xl text-[#2ea268]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#2ea268] transition-colors">
              Upload Tee Times
            </h3>
            <p className="text-sm text-gray-400">Import CSV file</p>
          </div>
        </button>

        {/* View Requests Action */}
        <button className="flex items-center gap-4 p-4 rounded-2xl bg-[#f7fdfa] hover:bg-[#eefaf3] transition-all group text-left w-full">
          <div className="p-3 bg-white rounded-xl shadow-sm text-[#2ea268] border border-[#2ea268]/10">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">View All Requests</h3>
            <p className="text-sm text-gray-400">4 pending reviews</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#2ea268] group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Progress Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Approval rate</span>
          <span className="text-sm font-bold text-[#2ea268]">40%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2ea268] rounded-full transition-all duration-1000"
            style={{ width: "40%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;