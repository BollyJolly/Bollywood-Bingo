import { ChevronDown, Search } from "lucide-react";
import type { CategoryFilter, StatusFilter } from "./gameRoomsData";
import { categoryFilters, statusFilters } from "./gameRoomsData";

type GameRoomFiltersProps = {
  statusFilter: StatusFilter;
  categoryFilter: CategoryFilter;
  searchQuery: string;
  onStatusChange: (filter: StatusFilter) => void;
  onCategoryChange: (filter: CategoryFilter) => void;
  onSearchChange: (query: string) => void;
};

export function GameRoomFilters({
  statusFilter,
  categoryFilter,
  searchQuery,
  onStatusChange,
  onCategoryChange,
  onSearchChange,
}: GameRoomFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {statusFilters.map((filter) => {
          const isActive = statusFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onStatusChange(filter.id)}
              data-testid={`filter-room-${filter.id}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#1B1B25] text-white"
                  : "border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB]"
              }`}
            >
              {filter.dot && (
                <span
                  className={`h-2 w-2 rounded-full ${
                    filter.dot === "green" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                  }`}
                />
              )}
              {filter.label}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="More filters"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB]"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <span className="mx-1 hidden h-5 w-px bg-[#E5E7EB] sm:inline-block" aria-hidden="true" />

        {categoryFilters.map((filter) => {
          const isActive = categoryFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onCategoryChange(isActive ? "all" : filter.id)}
              data-testid={`filter-category-${filter.id}`}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#FF2D75]/10 text-[#FF2D75] ring-1 ring-[#FF2D75]/30"
                  : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D1D5DB]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full lg:max-w-[280px] lg:shrink-0">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search room name..."
          data-testid="input-search-rooms"
          className="w-full rounded-full border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1B1B25] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#FF2D75] focus:ring-2 focus:ring-[#FF2D75]/10"
        />
      </div>
    </div>
  );
}
