import { CommandSelect } from "@/components/command-select";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { MeetingStatus } from "../../types";
import {
  ClockArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  VideoIcon,
  LoaderIcon,
} from "lucide-react";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <CommandSelect
      options={options}
      value={filters.status ?? ""}
      className="h-9"
      placeholder="Status"
      onSelect={(value) =>
        setFilters({ status: value as MeetingStatus })
      }
    ></CommandSelect>
  );
};
