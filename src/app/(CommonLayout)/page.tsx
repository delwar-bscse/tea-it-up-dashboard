import GeneralState from "@/components/home/GeneralState";
import QuickActions from "@/components/home/QuickActions";
import RecentRequest from "@/components/home/RecentRequest";
import RequestOverview from "@/components/home/RequestOverview";

export default function Home() {
  return (
    <div>
      <GeneralState />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <RequestOverview />
        </div>
        <div className="col-span-1">
          <QuickActions />
        </div>
      </div>
      <RecentRequest />
    </div>
  );
}