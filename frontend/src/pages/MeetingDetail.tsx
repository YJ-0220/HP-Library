import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

// 간담회 데이터 타입 (About.tsx와 동일)
interface MeetingData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  address: string;
  maxParticipants: number;
  currentParticipants: number;
  isCompleted: boolean;
  registrationDeadline: string;
  createdAt: string;
  // 상세 페이지용 추가 정보
  organizer?: string;
  contact?: string;
  agenda?: string[];
  requirements?: string;
  benefits?: string;
  notes?: string;
}

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<MeetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  // 간담회 상세 정보 가져오기
  const fetchMeetingDetail = async (meetingId: string) => {
    setLoading(true);
    try {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/api/meetings/${meetingId}`);
      // const data = await response.json();

      // 현재는 더미 데이터 사용 (ID에 따라 다른 데이터 반환)
      const dummyMeetings: Record<string, MeetingData> = {
        "1": {
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
          organizer: "HP-Library 운영팀",
          contact: "02-1234-5678",
          agenda: [
            "개회사 및 인사말",
            "2024년 상반기 성과 발표",
            "의료진 의견 수렴",
            "하반기 계획 발표",
            "질의응답 및 토론",
            "폐회사",
          ],
          requirements: "의료진 자격증 또는 관련 업무 증명서",
          benefits: "참가증명서 발급, 네트워킹 기회 제공, 간단한 다과 제공",
          notes:
            "주차 공간이 제한되어 있으니 대중교통을 이용해 주시기 바랍니다.",
        },
      };

      const meetingData = dummyMeetings[meetingId];
      if (!meetingData) {
        throw new Error("간담회를 찾을 수 없습니다.");
      }

      setMeeting(meetingData);
    } catch (error) {
      console.error("간담회 상세 정보 로딩 오류:", error);
      // 간담회를 찾을 수 없는 경우 목록으로 이동
      navigate("/about");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMeetingDetail(id);
    }
  }, [id]);

  // 참가 신청 처리
  const handleRegistration = async () => {
    if (!meeting || meeting.isCompleted) return;

    setIsRegistering(true);
    try {
      // TODO: 실제 API 호출로 교체
      // await fetch(`/api/meetings/${meeting.id}/register`, { method: 'POST' });

      // 임시 성공 처리
      alert("참가 신청이 완료되었습니다!");

      // 참가자 수 업데이트
      setMeeting((prev) =>
        prev
          ? {
              ...prev,
              currentParticipants: prev.currentParticipants + 1,
            }
          : null
      );
    } catch (error) {
      console.error("참가 신청 오류:", error);
      alert("참가 신청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsRegistering(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // 시간 포맷팅
  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            상담회를 찾을 수 없습니다
          </h1>
          <Link
            to="/about"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            상담회 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isRegistrationOpen =
    !meeting.isCompleted &&
    new Date() <= new Date(meeting.registrationDeadline);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 상단 네비게이션 */}
      <div className="mb-8">
        <Link
          to="/about"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← 상담회 목록으로 돌아가기
        </Link>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{meeting.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    {formatDate(meeting.date)} {formatTime(meeting.time)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>
                    {meeting.location} ({meeting.city})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>
                    {meeting.currentParticipants}/{meeting.maxParticipants}명
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>마감: {formatDate(meeting.registrationDeadline)}</span>
                </div>
              </div>
            </div>

            <div className="ml-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  meeting.isCompleted
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {meeting.isCompleted ? "완료" : "진행예정"}
              </span>
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-8 space-y-8">
          {/* 설명 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              상담회 소개
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {meeting.description}
            </p>
          </section>

          {/* 일정 */}
          {meeting.agenda && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                상담회 일정
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3">
                  {meeting.agenda.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* 상세 정보 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                참가 요건
              </h3>
              <p className="text-gray-600">{meeting.requirements}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                참가 혜택
              </h3>
              <p className="text-gray-600">{meeting.benefits}</p>
            </div>
          </section>

          {/* 장소 정보 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">장소 정보</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">주소</h4>
                  <p className="text-gray-600">{meeting.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">문의</h4>
                  <p className="text-gray-600">
                    주최: {meeting.organizer}
                    <br />
                    연락처: {meeting.contact}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 주의사항 */}
          {meeting.notes && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                주의사항
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-800">{meeting.notes}</p>
              </div>
            </section>
          )}

          {/* 참가 신청 버튼 */}
          {!meeting.isCompleted && (
            <section className="bg-gray-50 rounded-lg p-8 text-center">
              {isRegistrationOpen ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    참가 신청
                  </h3>
                  <p className="text-gray-600 mb-6">
                    현재 {meeting.currentParticipants}명이 신청했습니다. (정원:{" "}
                    {meeting.maxParticipants}명)
                  </p>
                  <button
                    onClick={handleRegistration}
                    disabled={
                      isRegistering ||
                      meeting.currentParticipants >= meeting.maxParticipants
                    }
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      meeting.currentParticipants >= meeting.maxParticipants
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isRegistering
                        ? "bg-blue-400 text-white cursor-wait"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isRegistering
                      ? "신청 중..."
                      : meeting.currentParticipants >= meeting.maxParticipants
                      ? "정원 마감"
                      : "참가 신청하기"}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    신청 마감
                  </h3>
                  <p className="text-gray-600">
                    참가 신청 기간이 종료되었습니다.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
