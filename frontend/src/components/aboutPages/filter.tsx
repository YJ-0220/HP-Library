import { useState, useEffect } from "react";

// 필터 상태 타입
export interface FilterState {
  cities: string[]; // 중복 선택 가능한 도시 배열
  dateRange: "all" | "upcoming" | "completed";
}

interface BottomSheetFilterProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
}

const BottomSheetFilter = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
}: BottomSheetFilterProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [isRegionExpanded, setIsRegionExpanded] = useState(false);

  // 도시 목록
  const cities = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  // 날짜 범위 옵션
  const dateRangeOptions = [
    { value: "all", label: "전체" },
    { value: "upcoming", label: "예정된 상담회" },
    { value: "completed", label: "완료된 상담회" },
  ];

  // 필터 변경 시 로컬 상태 업데이트
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // 필터 시트가 열릴 때마다 아코디언 닫기
  useEffect(() => {
    if (isOpen) {
      setIsRegionExpanded(false);
    }
  }, [isOpen]);

  // 백드롭 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 필터 적용
  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  // 도시 토글 함수
  const toggleCity = (city: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }));
  };

  // 전체 선택/해제
  const toggleAllCities = () => {
    setLocalFilters((prev) => ({
      ...prev,
      cities: prev.cities.length === cities.length ? [] : [...cities],
    }));
  };

  // 필터 리셋
  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      cities: [],
      dateRange: "all",
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onApplyFilters();
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 백드롭 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      {/* 하단 시트 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center px-4">
        <div
          className={`w-full max-w-[600px] bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] flex flex-col ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* 핸들 바 */}
          <div className="flex justify-center py-4 bg-gray-50 rounded-t-3xl">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">필터 설정</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 필터 내용 */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 space-y-4">
              {/* 진행 상태 필터 - 상단에 배치 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  진행 상태
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          dateRange: option.value as any,
                        }))
                      }
                      className={`p-3 rounded-lg border-2 text-center font-medium transition-all text-sm ${
                        localFilters.dateRange === option.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 지역 필터 - 아코디언 형태 */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setIsRegionExpanded(!isRegionExpanded)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      지역 필터
                    </h3>
                    <p className="text-sm text-gray-600">
                      {localFilters.cities.length === 0
                        ? "모든 지역"
                        : `${localFilters.cities.length}개 지역 선택됨`}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isRegionExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isRegionExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3 pt-3">
                      <span className="text-sm text-gray-600">
                        {localFilters.cities.length}개 선택됨
                      </span>
                      <button
                        onClick={toggleAllCities}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {localFilters.cities.length === cities.length
                          ? "전체 해제"
                          : "전체 선택"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => toggleCity(city)}
                          className={`p-2 rounded-lg border-2 text-center font-medium transition-all text-sm ${
                            localFilters.cities.includes(city)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {city}
                          {localFilters.cities.includes(city) && (
                            <span className="ml-1 text-blue-500">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 - 고정 */}
          <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                초기화
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 데스크탑용 인라인 필터 컴포넌트
export const DesktopInlineFilter = ({ 
  filters, 
  onFiltersChange, 
  onApplyFilters 
}: { 
  filters: FilterState; 
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
}) => {
  // 도시 목록
  const cities = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
  ];

  const dateRangeOptions = [
    { value: "all", label: "전체" },
    { value: "upcoming", label: "예정된 상담회" },
    { value: "completed", label: "완료된 상담회" },
  ];

  const handleCityChange = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];
    
    onFiltersChange({ ...filters, cities: newCities });
    onApplyFilters();
  };

  const handleDateRangeChange = (dateRange: string) => {
    onFiltersChange({ ...filters, dateRange: dateRange as any });
    onApplyFilters();
  };

  const resetFilters = () => {
    onFiltersChange({ cities: [], dateRange: "all" });
    onApplyFilters();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
      <div className="space-y-4">
        {/* 첫 번째 줄: 지역 선택 */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">지역:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFiltersChange({ ...filters, cities: [] })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filters.cities.length === 0
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            {cities.slice(0, 8).map((city) => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.cities.includes(city)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* 두 번째 줄: 진행 상태 및 리셋 */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">상태:</span>
          <div className="flex gap-2">
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDateRangeChange(option.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.dateRange === option.value
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={resetFilters}
            className="ml-auto px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors"
          >
            초기화
          </button>
        </div>

        {/* 선택된 필터 표시 */}
        {(filters.cities.length > 0 || filters.dateRange !== "all") && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">적용된 필터:</span>
            {filters.cities.length > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                지역 {filters.cities.length}개
              </span>
            )}
            {filters.dateRange !== "all" && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 필터 버튼 컴포넌트 (모바일용)
export const FilterButton = ({
  filters,
  onFilterClick,
}: {
  filters: FilterState;
  onFilterClick: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
      {/* 모바일: 세로 배치, 데스크탑: 가로 배치 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* 필터 버튼 */}
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium w-fit"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
            />
          </svg>
          필터
        </button>

        {/* 필터 태그들 */}
        <div className="flex items-center gap-3 md:flex-1 md:justify-end">
          <span className="text-sm font-medium text-gray-700">필터:</span>
          <div className="flex flex-wrap gap-2">
            {filters.cities.length > 0 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                지역:{" "}
                {filters.cities.length <= 3
                  ? filters.cities.join(", ")
                  : `${filters.cities.slice(0, 3).join(", ")} 외 ${
                      filters.cities.length - 3
                    }개`}{" "}
                ({filters.cities.length}개)
              </span>
            )}
            {filters.dateRange !== "all" && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                상태: {filters.dateRange === "upcoming" ? "예정" : "완료"}
              </span>
            )}
            {filters.cities.length === 0 && filters.dateRange === "all" && (
              <span className="text-sm text-gray-500">
                필터가 적용되지 않음
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetFilter;
