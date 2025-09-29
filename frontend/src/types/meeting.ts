// 간담회 데이터 타입
export interface MeetingData {
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
  price: number; // 상담회 가격 (원)
  isFree?: boolean; // 무료 여부
  imageUrl?: string; // 상담회 이미지
  // 상세 페이지용 추가 정보
  organizer?: string;
  contact?: string;
  agenda?: string[];
  requirements?: string;
  benefits?: string;
  notes?: string;
}
