import { useState, useEffect } from "react";
import { Link } from "react-router";

// 간담회 데이터 타입
interface MeetingData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string; // 필터용 도시
  address: string;
  maxParticipants: number;
  currentParticipants: number;
  isCompleted: boolean;
  registrationDeadline: string;
  createdAt: string;
}

// 필터 상태 타입
interface FilterState {
  city: string;
  dateRange: "all" | "upcoming" | "completed";
  selectedDate: string;
}

const About = () => {
  //나중에 추가할 것
  const [meetings, _setMeetings] = useState<MeetingData[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    city: "all",
    dateRange: "all",
    selectedDate: "",
  });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 5개씩 표시

  // 도시 목록 (실제로는 API에서 가져올 수 있음)
  const cities = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
  ];

  // 상 담회 데이터 가져오기
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      // 실제 API 호출로 교체
      // const response = await fetch(`/api/meetings`);
      // const data = await response.json();
      // setMeetings(data);
      // setFilteredMeetings(data);

      const dummyMeetings: MeetingData[] = [
        {
          id: 1,
          title: "2024 상반기 간담회",
          description:
            "올해 상반기 성과 공유 및 하반기 계획 논의를 위한 간담회입니다. 의료진 여러분의 소중한 의견을 듣고자 합니다.",
          date: "2024-03-15",
          time: "14:00",
          location: "강남구 회의실",
          city: "서울",
          address: "서울시 강남구 테헤란로 123",
          maxParticipants: 50,
          currentParticipants: 35,
          isCompleted: true,
          registrationDeadline: "2024-03-10",
          createdAt: new Date().toISOString(),
        },
      ];
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

    // 도시 필터
    if (filters.city !== "all") {
      filtered = filtered.filter((meeting) => meeting.city === filters.city);
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
      city: "all",
      dateRange: "all",
      selectedDate: "",
    });
    setCurrentPage(1);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeetings = filteredMeetings.slice(startIndex, endIndex);

  // 페이지 번호 배열 생성 (최대 5개 페이지 표시)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

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
        {/* 필터 섹션 - 컴팩트 버전 */}
        <div className="bg-white rounded-lg p-4 shadow border">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">필터:</span>

            {/* 도시 필터 */}
            <select
              name="city"
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
              className="text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체 도시</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* 날짜 범위 필터 */}
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: e.target.value as any,
                }))
              }
              className="text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="upcoming">예정</option>
              <option value="completed">완료</option>
            </select>

            {/* 필터 리셋 버튼 */}
            <button
              onClick={resetFilters}
              className="text-sm px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 상담회 목록 */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
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
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-800">
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

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {meeting.description}
                        </p>
                      </div>

                      {!meeting.isCompleted && (
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            자세히 보기 →
                          </span>
                        </div>
                      )}
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
    </div>
  );
};

export default About;
