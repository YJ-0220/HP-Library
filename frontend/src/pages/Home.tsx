import { Link } from "react-router";
import BannerSlider from "@/components/section/BannerSlider";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 배너 슬라이드 섹션 */}
      <BannerSlider />
      <section className="w-full mt-8">
        <div className="px-4 lg:px-8 grid grid-cols-4 gap-4">
          <Link
            to="/about"
            className="py-4 rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <span className="w-full mt-2 flex text-xs md:text-sm text-center justify-center">
              상담회
            </span>
          </Link>
          <Link
            to="#"
            className="rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <span className="w-full mt-4 flex text-sm text-center justify-center">
              제목1
            </span>
          </Link>
          <Link
            to="#"
            className="rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <span className="w-full mt-4 flex text-sm text-center justify-center">
              제목2
            </span>
          </Link>
          <Link
            to="#"
            className="rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <span className="w-full mt-4 flex text-sm text-center justify-center">
              제목3
            </span>
          </Link>
          <Link
            to="#"
            className="rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <span className="w-full mt-4 flex text-sm text-center justify-center">
              제목4
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
