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
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    city: "all",
    dateRange: "all",
    selectedDate: "",
  });
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 6개씩 표시

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

  // 간담회 데이터 가져오기
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      // TODO: 실제 API 호출로 교체
      const dummyMeetings: MeetingData[] = [
        {
          id: 1,
          title: "2024 상반기 간담회",
          description: "올해 상반기 성과 공유 및 하반기 계획 논의",
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
        {
          id: 2,
          title: "부산 지역 간담회",
          description: "부산 지역 의료진과의 네트워킹 모임",
          date: "2024-04-20",
          time: "15:30",
          location: "부산 센텀시티",
          city: "부산",
          address: "부산시 해운대구 센텀중앙로 456",
          maxParticipants: 30,
          currentParticipants: 18,
          isCompleted: false,
          registrationDeadline: "2024-04-15",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "대구 의료진 세미나",
          description: "최신 의료 기술 및 트렌드 공유",
          date: "2024-05-10",
          time: "13:00",
          location: "대구 의료센터",
          city: "대구",
          address: "대구시 중구 국채보상로 789",
          maxParticipants: 40,
          currentParticipants: 25,
          isCompleted: false,
          registrationDeadline: "2024-05-05",
          createdAt: new Date().toISOString(),
        },
        // 페이지네이션 테스트용 더미 데이터 추가
        {
          id: 4,
          title: "인천 의료진 워크샵",
          description: "인천 지역 의료진을 위한 실무 워크샵",
          date: "2024-06-15",
          time: "10:00",
          location: "인천 컨벤션센터",
          city: "인천",
          address: "인천시 연수구 센트럴로 123",
          maxParticipants: 60,
          currentParticipants: 42,
          isCompleted: false,
          registrationDeadline: "2024-06-10",
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          title: "광주 의료 컨퍼런스",
          description: "광주 지역 의료 발전 방안 논의",
          date: "2024-07-05",
          time: "09:00",
          location: "광주 국제회의센터",
          city: "광주",
          address: "광주시 서구 상무중앙로 456",
          maxParticipants: 80,
          currentParticipants: 35,
          isCompleted: false,
          registrationDeadline: "2024-06-30",
          createdAt: new Date().toISOString(),
        },
        {
          id: 6,
          title: "대전 의료진 간담회",
          description: "대전 지역 의료진과의 소통의 시간",
          date: "2024-08-20",
          time: "14:30",
          location: "대전 시청 대회의실",
          city: "대전",
          address: "대전시 서구 둔산로 100",
          maxParticipants: 45,
          currentParticipants: 20,
          isCompleted: false,
          registrationDeadline: "2024-08-15",
          createdAt: new Date().toISOString(),
        },
        {
          id: 7,
          title: "울산 병원 협력 회의",
          description: "울산 지역 병원과의 협력 방안 모색",
          date: "2024-09-10",
          time: "16:00",
          location: "울산대학교병원",
          city: "울산",
          address: "울산시 동구 방어진순환도로 877",
          maxParticipants: 35,
          currentParticipants: 15,
          isCompleted: false,
          registrationDeadline: "2024-09-05",
          createdAt: new Date().toISOString(),
        },
      ];

      setMeetings(dummyMeetings);
      setFilteredMeetings(dummyMeetings);
    } catch (error) {
      console.error("간담회 데이터 로딩 오류:", error);
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

    // 날짜 범위 필터
    const today = new Date();
    if (filters.dateRange === "upcoming") {
      filtered = filtered.filter((meeting) => new Date(meeting.date) >= today);
    } else if (filters.dateRange === "completed") {
      filtered = filtered.filter((meeting) => new Date(meeting.date) < today);
    }

    // 특정 날짜 필터
    if (filters.selectedDate) {
      filtered = filtered.filter(
        (meeting) => meeting.date === filters.selectedDate
      );
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

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  // 시간 포맷팅
  const formatTime = (timeString: string) => {
    return timeString;
  };

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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">간담회 정보</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          전국 각지에서 진행되는 의료진 간담회 정보를 확인하고 참가 신청하세요.
        </p>
      </div>

      <div className="space-y-8">
          {/* 필터 섹션 - 컴팩트 버전 */}
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">필터:</span>

              {/* 도시 필터 */}
              <select
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

              {/* 특정 날짜 필터 */}
              <input
                type="date"
                value={filters.selectedDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    selectedDate: e.target.value,
                  }))
                }
                className="text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder="특정 날짜"
              />

              {/* 필터 리셋 버튼 */}
              <button
                onClick={resetFilters}
                className="text-sm px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 간담회 목록 */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                간담회 정보 ({filteredMeetings.length}건)
              </h2>
              {totalPages > 1 && (
                <div className="text-sm text-gray-500">
                  {startIndex + 1}-{Math.min(endIndex, filteredMeetings.length)} / {filteredMeetings.length}건
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
                  조건에 맞는 간담회가 없습니다.
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
                {/* 간담회 목록 */}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">📅 날짜:</span>
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">⏰ 시간:</span>
                            <span>{formatTime(meeting.time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">📍 장소:</span>
                            <span>
                              {meeting.location} ({meeting.city})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">👥 참가자:</span>
                            <span>
                              {meeting.currentParticipants}/
                              {meeting.maxParticipants}명
                            </span>
                          </div>
                        </div>
                      </div>

                      {!meeting.isCompleted && (
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            자세히 보기 →
                          </span>
                          <p className="text-xs text-gray-500">
                            마감: {formatDate(meeting.registrationDeadline)}
                          </p>
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
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
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
                    {getPageNumbers().map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* 마지막 페이지 */}
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                      <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
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
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
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
