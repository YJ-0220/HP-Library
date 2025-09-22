import { Link } from "react-router";
import { useState, useEffect } from "react";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // 1부터 시작 (첫 번째 복제본 다음)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // TODO: 실제로는 관리자 API에서 가져올 데이터
  const originalBanners = [
    {
      id: 1,
      title: "배너 1",
      subtitle: "관리자가 설정할 부제목",
      imageUrl: "",
      linkUrl: "/about",
      linkType: "internal" as const,
      bgColor: "bg-black",
      textColor: "text-white",
      isActive: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "배너 2",
      subtitle: "관리자가 설정할 부제목",
      imageUrl: "",
      linkUrl: "https://example.com",
      linkType: "external" as const,
      bgColor: "bg-black",
      textColor: "text-white",
      isActive: true,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "배너 3",
      subtitle: "관리자가 설정할 부제목",
      imageUrl: "",
      linkUrl: "/event",
      linkType: "internal" as const,
      bgColor: "bg-black",
      textColor: "text-white",
      isActive: true,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
    },
  ];

  // 무한 슬라이드를 위해 앞뒤로 복제본 추가
  const banners = [
    originalBanners[originalBanners.length - 1], // 마지막 배너 복제
    ...originalBanners,
    originalBanners[0], // 첫 번째 배너 복제
  ];

  // 터치 시작
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart(touch.clientX);
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // 터치 종료
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const diff = touchStart - touch.clientX;

    if (Math.abs(diff) > 50) {
      // 50px 이상 드래그시 슬라이드 변경
      if (diff > 0) {
        // 왼쪽으로 스와이프 (다음)
        nextSlide();
      } else {
        // 오른쪽으로 스와이프 (이전)
        prevSlide();
      }
    }
    setTouchStart(null);
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 무한 슬라이드 트랜지션 처리
  useEffect(() => {
    if (currentSlide === 0) {
      // 첫 번째 복제본(인덱스 0)에 도달하면 마지막 원본으로 순간이동
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(originalBanners.length);
      }, 500);
    } else if (currentSlide === banners.length - 1) {
      // 마지막 복제본에 도달하면 첫 번째 원본으로 순간이동
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentSlide, banners.length, originalBanners.length]);

  // 마우스 드래그 이벤트
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStart) return;
    e.preventDefault();
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !touchStart) return;

    const diff = touchStart - e.clientX;

    if (Math.abs(diff) > 50) {
      // 50px 이상 드래그시 슬라이드 변경
      if (diff > 0) {
        // 왼쪽으로 드래그 (다음)
        nextSlide();
      } else {
        // 오른쪽으로 드래그 (이전)
        prevSlide();
      }
    }

    setIsDragging(false);
    setTouchStart(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setTouchStart(null);
  };

  // 자동 슬라이드 (4초)
  useEffect(() => {
    if (isTransitioning || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isTransitioning, isDragging]);

  return (
    <section className="p-6 lg:p-8 w-full mx-auto max-w-6xl">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <div
          className="relative h-32 sm:h-40 overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {/* 슬라이드 컨테이너 */}
          <div
            className={`flex h-full ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div
                key={`banner-${index}`}
                className="w-full h-full flex-shrink-0"
              >
                {/* 링크 타입에 따라 내부/외부 링크 처리 */}
                {banner.linkType === "external" ? (
                  <a
                    href={banner.linkUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${banner.bgColor} ${banner.textColor} h-full w-full flex items-center justify-between px-4 sm:px-6 relative overflow-hidden`}
                  >
                    {/* 배너 내용 */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold mb-1">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-xs sm:text-sm opacity-90">{banner.subtitle}</p>
                      )}
                    </div>

                    {/* 배너 이미지 (관리자가 업로드한 경우) */}
                    {banner.imageUrl && (
                      <div className="absolute inset-0">
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                          //나중에 추가할 것
                          onError={(_e) => {
                            console.log('이미지 로드 실패:', banner.imageUrl);
                          }}
                        />
                        {/* 텍스트 가독성을 위한 오버레이 */}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      </div>
                    )}
                  </a>
                ) : (
                  <Link
                    to={banner.linkUrl || "#"}
                    className={`${banner.bgColor} ${banner.textColor} h-full w-full flex items-center justify-between px-4 sm:px-6 relative overflow-hidden`}
                  >
                    {/* 배너 내용 */}
                    <div className="flex-1 relative z-10">
                      <h3 className="text-base sm:text-lg font-bold mb-1">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-xs sm:text-sm opacity-90">{banner.subtitle}</p>
                      )}
                    </div>

                    {/* 배너 이미지 (관리자가 업로드한 경우) */}
                    {banner.imageUrl && (
                      <div className="absolute inset-0">
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                          //나중에 추가할 것
                          onError={(_e) => {
                            console.log('이미지 로드 실패:', banner.imageUrl);
                          }}
                        />
                        {/* 텍스트 가독성을 위한 오버레이 */}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      </div>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* 인디케이터 점들 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {originalBanners.map((_, index) => {
              // 현재 슬라이드가 복제본이 아닌 원본 배너 중 어느 것인지 계산
              const realIndex =
                (currentSlide - 1 + originalBanners.length) %
                originalBanners.length;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentSlide(index + 1); // +1은 첫 번째 복제본 때문
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 touch-manipulation ${
                    index === realIndex ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
