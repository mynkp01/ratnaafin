"use client";
import { DownArrow, Logo, RLogo } from "@/assets";
import { adminSideBarData } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";

const SideBar = () => {
  const isMobileScreen = useMediaQuery("(max-width:600px)");

  const router = useRouter();
  const pathname = usePathname();

  const isMobileRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sideBarData, setSideBarData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setSideBarData(adminSideBarData);
  }, []);

  const handleResize = useCallback(() => {
    if (window) {
      isMobileRef.current = window.innerWidth <= 600;
      setIsSidebarOpen(window.innerWidth > 1024);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMobileScreen = window.innerWidth <= 768;
      if (isMobileScreen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
        document.body.classList.remove("no-scroll");
      }
    };

    const handleSidebarToggle = () => {
      const isMobileScreen = window.innerWidth <= 768;
      if (isMobileScreen && isSidebarOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    handleSidebarToggle();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchmove", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchmove", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
      document.body.classList.remove("no-scroll");
    };
  }, [isSidebarOpen]);

  const getDropdownActiveState = (item) => {
    if (!item.dropdown) return { isActive: false, activeChildId: null };
    const activeChild = item.dropdown.find((dropdownItem) => pathname.includes(dropdownItem?.path?.split("?")?.[0]));
    return { isActive: !!activeChild, activeChildId: activeChild?.id };
  };

  return (
    <>
      {isSidebarOpen && <div className={"fixed z-50 h-full w-full bg-black bg-opacity-25 transition-all duration-[350ms] ease-in-out lg:hidden"} />}
      <aside
        id="sidebar"
        ref={sidebarRef}
        className={`${isSidebarOpen ? "z-50 w-[60%] shadow xs:w-[40%] lg:w-full" : "!w-[76px]"} overflow-y-auto lg:relative lg:max-w-[16.67%] ${
          isMobileRef.current && isSidebarOpen ? "fixed h-full" : ""
        }`}
      >
        <div
          className={`fixed flex h-full flex-col justify-between bg-primary-100 ${
            isSidebarOpen ? "w-[60%] shadow xs:w-[40%] lg:w-full" : "w-[76px]"
          } z-50 overflow-y-auto overflow-x-hidden lg:max-w-[16.67%]`}
        >
          <div className={`overflow-y-auto overflow-x-hidden ${isSidebarOpen ? "p-4 lg:p-2 xl:p-4" : "p-4"}`}>
            <div className={`flex h-fit justify-between mb-4 ${isSidebarOpen ? "gap-2" : "flex-col-reverse gap-4"}`}>
              <Link href="" className={`${isSidebarOpen ? "max-h-12 min-h-12" : "max-h-10 min-h-10 min-w-10 max-w-10"} flex items-center overflow-hidden`}>
                {isSidebarOpen ? <Logo className="w-1/2 aspect-auto" /> : <RLogo className="w-full aspect-auto" />}
              </Link>
              <div
                className={`flex h-fit items-center justify-center rounded-xl bg-primary-200 p-2.5 ${isSidebarOpen ? "open" : ""}`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <label className="buttons__burger" htmlFor="burger">
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>
            </div>
            <nav className={`flex flex-col gap-y-1`}>
              {sideBarData.map((item) => {
                const { isActive: isDropdownActive } = getDropdownActiveState(item);

                return (
                  <Fragment key={item.id}>
                    <div>
                      {!isEmpty(item?.dropdown) ? (
                        <Tooltip
                          slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "common.white",
                                padding: "10px",
                              },
                            },
                          }}
                          placement="right"
                          title={
                            isSidebarOpen
                              ? ""
                              : item.dropdown.map((dropdownItem) => (
                                  <Link href={dropdownItem.path} key={dropdownItem.id}>
                                    <div
                                      key={dropdownItem.id}
                                      className={`text-14-600 my-2 rounded-xl bg-primary-50 p-2.5 ${
                                        pathname.includes(dropdownItem?.path?.split("?")?.[0]) ? "text-primary-800" : "text-primary-500"
                                      }`}
                                    >
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))
                          }
                        >
                          <div>
                            <button
                              onClick={() => {
                                setOpenDropdown((prev) => {
                                  return prev === item.id ? null : item.id;
                                });
                                if (!isSidebarOpen) {
                                  setIsSidebarOpen(true);
                                }
                              }}
                              className={`group flex w-full items-center rounded-xl p-2.5 ${isSidebarOpen ? "gap-3 justify-between" : "justify-center"} ${
                                isDropdownActive
                                  ? "bg-primary-50 text-primary-800 shadow-inner"
                                  : "text-primary-500 hover:bg-primary-50 hover:bg-opacity-40 hover:shadow-inner"
                              }`}
                            >
                              <div className={`flex items-center ${isSidebarOpen && isMobileScreen ? "gap-1.5" : "gap-3"}`}>
                                {item.icon ? (
                                  <span>
                                    <item.icon className="h-5" />
                                  </span>
                                ) : null}
                                {isSidebarOpen && (
                                  <span
                                    className={`text-14-600 ${
                                      isSidebarOpen ? "opacity-100" : "w-0 opacity-0"
                                    } text-left transition-all duration-[350ms] ease-in-out`}
                                  >
                                    {item.label}
                                  </span>
                                )}
                              </div>
                              {isSidebarOpen &&
                                (openDropdown === item.id ? (
                                  <DownArrow className="rotate-180 transform text-primary-500 transition duration-[350ms] ease-in-out" />
                                ) : (
                                  <DownArrow className="text-primary-500 transition duration-[350ms] ease-in-out" />
                                ))}
                            </button>

                            {openDropdown === item.id && isSidebarOpen && (
                              <div className="ml-8 mt-2 flex flex-col gap-2">
                                {item.dropdown?.map((dropdownItem) => (
                                  <Link
                                    href={dropdownItem.path}
                                    key={dropdownItem.id}
                                    className="list-none rounded-xl hover:bg-primary-50 hover:bg-opacity-40 hover:shadow-inner"
                                  >
                                    <p
                                      className={`text-14-600 flex cursor-pointer items-center rounded-xl p-2 ${
                                        pathname.includes(dropdownItem?.path?.split("?")?.[0])
                                          ? "bg-primary-50 text-primary-800 shadow-inner"
                                          : "text-primary-500"
                                      }`}
                                    >
                                      {dropdownItem.label}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </Tooltip>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={() => {
                            if (isMobileScreen) {
                              setIsSidebarOpen(false);
                            }
                          }}
                        >
                          <Tooltip title={isSidebarOpen ? "" : item.label} placement="right">
                            <div
                              style={pathname.includes(item?.path?.split("?")?.[0]) ? item.activeClassName : item.inActiveClassName}
                              className={`group flex cursor-pointer items-center rounded-xl p-2.5 ${isSidebarOpen ? "gap-3" : "justify-center"} ${
                                pathname.includes(item?.path?.split("?")?.[0])
                                  ? "bg-primary-50 text-primary-800 shadow-inner"
                                  : "text-primary-500 hover:bg-primary-50 hover:bg-opacity-40 hover:shadow-inner"
                              }`}
                            >
                              {item.icon ? (
                                <span>
                                  <item.icon className="h-5" />
                                </span>
                              ) : null}
                              {isSidebarOpen && (
                                <span className={`text-14-600 ${isSidebarOpen ? "opacity-100" : "w-0 opacity-0"} transition-all duration-[350ms] ease-in-out`}>
                                  {item.label}
                                </span>
                              )}
                            </div>
                          </Tooltip>
                        </Link>
                      )}
                    </div>
                    {item.hr && <hr />}
                  </Fragment>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default memo(SideBar);
