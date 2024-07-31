import { SideBarProps } from "@/types/types";

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:flex flex-col justify-between border border-solid border-lightgray bg-white lg:h-full h-full lg:w-[260px] lg:translate-x-0 w-[260px] z-40`}
    >
      {children}
    </div>
  );
};

export default SideBar;
