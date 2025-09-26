import EventBanner from "@/components/section/EventBanner";
import CategoryNav from "@/components/section/CategoryNav";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 배너 슬라이드 섹션 */}
      <EventBanner />
      {/* 카테고리 네비게이션 섹션 */}
      <CategoryNav />
    </div>
  );
};

export default Home;
