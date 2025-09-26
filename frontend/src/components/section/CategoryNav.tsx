import { Link } from "react-router";

const CategoryNav = () => {
  const categoryItems = [
    {
      id: 1,
      name: "상담회",
      path: "/about",
      d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z",
    },
    { id: 2, name: "제목1", path: "/" },
    { id: 3, name: "제목2", path: "/" },
    { id: 4, name: "제목3", path: "/" },
    { id: 5, name: "제목4", path: "/" },
  ];
  return (
    <section className="w-full mt-8">
      <h2 className="px-4 lg:px-8 text-center text-md sm:text-base font-bold">
        원하시는 카테고리를 선택해주세요
      </h2>
      <div className="my-4 px-4 lg:px-8 grid grid-cols-4 gap-4">
        {categoryItems.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className="py-4 rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.d}
              />
            </svg>

            <span className="w-full mt-4 flex text-xs md:text-sm text-center justify-center">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryNav;
