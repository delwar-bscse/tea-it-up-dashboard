import React from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Requests",
    value: "10",
    icon: ClipboardList,
    color: "blue",
    borderColor: "border-l-[#3b82f6]",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Pending",
    value: "4",
    icon: Clock,
    color: "orange",
    borderColor: "border-l-[#f59e0b]",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Confirmed",
    value: "4",
    icon: CheckCircle2,
    color: "green",
    borderColor: "border-l-[#10b981]",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Declined",
    value: "2",
    icon: XCircle,
    color: "red",
    borderColor: "border-l-[#ef4444]",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

const GeneralState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={cn(
            "bg-white p-6 rounded-2xl border-l-[6px] shadow-sm flex items-center justify-between transition-all hover:shadow-md",
            stat.borderColor
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">{stat.title}</span>
            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
          </div>
          <div className={cn("p-3 rounded-2xl shrink-0", stat.iconBg)}>
            <stat.icon className={cn("w-6 h-6", stat.iconColor)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralState;