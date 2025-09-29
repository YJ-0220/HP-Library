import { useState, useEffect } from "react";
import { Link } from "react-router";
import BottomSheetFilter, {
  FilterButton,
  DesktopInlineFilter,
  type FilterState,
} from "../components/aboutPages/filter";
import type { MeetingData } from "../types/meeting";
import { dummyMeetings, formatPrice } from "../data/meetingData";

const About = () => {
  const [meetings, _setMeetings] = useState<MeetingData[]>([]); // 나중에 추가해야할것
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cities: [],
    dateRange: "all",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 5개씩 표시

  // 상 담회 데이터 가져오기
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      // 실제 API 호출로 교체
      // const response = await fetch(`/api/meetings`);
      // const data = await response.json();
      // setMeetings(data);
      // setFilteredMeetings(data);

      // 현재는 더미 데이터 사용
      _setMeetings(dummyMeetings);
      setFilteredMeetings(dummyMeetings);
    } catch (error) {
      console.error("상담회 데이터 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 필터 적용
  const applyFilters = () => {
    let filtered = [...meetings];

    // 도시 필터 (중복 선택)
    if (filters.cities.length > 0) {
      filtered = filtered.filter((meeting) =>
        filters.cities.includes(meeting.city)
      );
    }

    // 날짜 범위 필터
    if (filters.dateRange !== "all") {
      const now = new Date();
      filtered = filtered.filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        if (filters.dateRange === "upcoming") {
          return meetingDate >= now && !meeting.isCompleted;
        } else if (filters.dateRange === "completed") {
          return meeting.isCompleted || meetingDate < now;
        }
        return true;
      });
    }

    setFilteredMeetings(filtered);
  };

  // 필터 변경 시 적용
  useEffect(() => {
    applyFilters();
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [filters, meetings]);

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    fetchMeetings();
  }, []);

  // 필터 리셋
  const resetFilters = () => {
    setFilters({
      cities: [],
      dateRange: "all",
    });
    setCurrentPage(1);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeetings = filteredMeetings.slice(startIndex, endIndex);

  // 페이지 번호 배열 생성 (모바일 3개, 데스크탑 5개)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = isMobile ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">상담회 정보</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          전국 각지에서 진행되는 의료진 상담회 정보를 확인하고 참가 신청하세요.
        </p>
      </div>

      <div className="space-y-8">
        {/* 필터 섹션 - 조건부 렌더링 */}
        {isMobile ? (
          <FilterButton
            filters={filters}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        ) : (
          <DesktopInlineFilter
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={applyFilters}
          />
        )}

        {/* 상담회 목록 */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              상담회 정보 ({filteredMeetings.length}건)
            </h2>
            {totalPages > 1 && (
              <div className="text-sm text-gray-500">
                {startIndex + 1}-{Math.min(endIndex, filteredMeetings.length)} /{" "}
                {filteredMeetings.length}건
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">
                조건에 맞는 상담회가 없습니다.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 상담회 목록 */}
              <div className="grid gap-6">
                {currentMeetings.map((meeting) => (
                  <Link
                    key={meeting.id}
                    to={`/meeting/${meeting.id}`}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500 block hover:scale-[1.02] duration-200"
                  >
                    <div className="flex flex-col lg:flex-col lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-base sm:text-xl font-bold text-gray-800">
                            {meeting.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              meeting.isCompleted
                                ? "bg-gray-100 text-gray-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {meeting.isCompleted ? "완료" : "진행예정"}
                          </span>
                        </div>

                        <div className="py-4 flex gap-4">
                          {/* 왼쪽 영역 */}
                          <div className="flex-shrink-0 flex flex-col justify-between w-20">
                            {/* 상단 이미지 */}
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              {meeting.imageUrl ? (
                                <img
                                  src={meeting.imageUrl}
                                  alt={meeting.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 오른쪽 정보 */}
                          <div className="flex-1 text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">날짜:</span>
                              <span>{meeting.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">시간:</span>
                              <span>{meeting.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">장소:</span>
                              <span>{meeting.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex justify-between items-end gap-2">
                        {/* 하단 참가인원 */}
                        <div className="text-xs text-gray-500 text-center">
                          {meeting.isCompleted ? (
                            <span>{meeting.currentParticipants}명 참가</span>
                          ) : (
                            <span>
                              인원: {meeting.currentParticipants} /{" "}
                              {meeting.maxParticipants}명
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          {meeting.isCompleted ? (
                            // 완료된 상담회
                            <div className="px-4 py-2 rounded-lg text-center text-sm font-medium bg-gray-100 text-gray-600">
                              <div className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                완료됨
                              </div>
                            </div>
                          ) : (
                            // 진행 예정인 상담회
                            <>
                              <div
                                className={`px-4 py-2 rounded-lg text-center text-sm font-medium ${
                                  meeting.isFree || meeting.price === 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {formatPrice(meeting.price, meeting.isFree)}
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                참가 신청 가능
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-8">
                  {/* 이전 페이지 버튼 */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    이전
                  </button>

                  {/* 첫 페이지 */}
                  {getPageNumbers()[0] > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        1
                      </button>
                      {getPageNumbers()[0] > 2 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {/* 페이지 번호들 */}
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* 마지막 페이지 */}
                  {getPageNumbers()[getPageNumbers().length - 1] <
                    totalPages && (
                    <>
                      {getPageNumbers()[getPageNumbers().length - 1] <
                        totalPages - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* 다음 페이지 버튼 */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 하단 시트 필터 - 모바일에서만 */}
      {isMobile && (
        <BottomSheetFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={applyFilters}
        />
      )}
    </div>
  );
};

export default About;
