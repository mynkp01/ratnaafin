"use client";
import { apiHandler } from "@/api/apiHandler";
import {
  AccordionIcon,
  BusinessLoanIcon,
  CibilChecker,
  DownArrow,
  HeaderBg,
  HeaderImage,
  HomeLoan,
  LoanAgaintsProperty,
  Logo,
  MachineryEquipmentLoan,
  PhoneIcon,
  Possiblehai,
  RevenueBasedFundingIcon,
  Search,
  SolarLoan,
  SupplyChainFinance,
  WorkingCapitalLoan,
} from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { ROUTES, SEARCHPAGE, TELS, URLS } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { DotLottieWorkerReact } from "@lottiefiles/dotlottie-react";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const menuLinks = [
  { label: "About Us", href: ROUTES.client.aboutus },
  {
    label: "Products",
    isDropdown: true,
    items: [
      {
        title: "Business Loan",
        icon: <BusinessLoanIcon className="size-8" alt="Business Loan" />,
        href: `${ROUTES.product.businessLoan}/overview`,
      },
      {
        title: "Affordable Mortgage Loans",
        icon: <HomeLoan className="size-8" alt="Home Loan" />,
        dropdown: [
          {
            title: "Home Loan",
            href: ROUTES.product.homeLoan,
          },
          {
            title: "Micro Loan Against Property",
            href: ROUTES.product.microlap,
          },
        ],
      },
      {
        title: "Machinery Loan",
        icon: <MachineryEquipmentLoan className="size-8" alt="Machinery Loan" />,
        href: `${ROUTES.product.machineryLoan}/overview`,
      },
      {
        title: "Solar Loan",
        icon: <SolarLoan className="size-8" alt="Solar Loan" />,
        dropdown: [
          {
            title: "Residential Solar Finance",
            href: ROUTES.product.residentialSolarLoan,
          },
          {
            title: "Commercial/Industrial Solar Finance",
            href: ROUTES.product.commercialSolarLoan,
          },
        ],
      },
      {
        title: "Loan Against Property",
        icon: <LoanAgaintsProperty className="size-8" alt="Loan Against Property" />,
        href: ROUTES.product.loanAgainstProperty,
      },
      {
        title: "Supply Chain Finance",
        icon: <SupplyChainFinance className="size-8" alt="Supply Chain Finance" />,
        dropdown: [
          {
            title: "Vendor Finance",
            href: ROUTES.product.scfVendorFinance,
          },
          {
            title: "Dealer Finance",
            href: ROUTES.product.scfDealerFinance,
          },
          {
            title: "Sale Invoice Discounting",
            href: ROUTES.product.scfSalesInvoiceDiscounting,
          },
          {
            title: "Purchase Invoice Discounting",
            href: ROUTES.product.scfPurchaseInvoice,
          },
        ],
      },
      {
        title: "Working Capital Loan",
        icon: <WorkingCapitalLoan className="size-8" alt="Working Capital Loan" />,
        href: ROUTES.product.workingCapitalLoan,
      },
      {
        title: "Revenue Based Funding",
        icon: <RevenueBasedFundingIcon className="size-8" alt="Revenue Based Funding" />,
        href: ROUTES.product.revenuebasedfinance,
      },
    ],
  },
  { label: "Blogs", href: ROUTES.client.blogs },
  { label: "Testimonial", href: "/#testimonial" },
  { label: "Careers", href: ROUTES.client.careers },
  { label: "Contact Us", href: ROUTES.client.contactUs },
];

function Header() {
  const itemRefs = useRef({});
  const scrollContainerRef = useRef(null);
  const router = useRouter();
  const currentScreen = useSelector(selectScreen);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchDropDown, setSearchDropDown] = useState([]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    setTimeout(() => {
      const container = scrollContainerRef.current;
      const el = itemRefs.current[index];
      if (container && el) {
        const containerTop = container.getBoundingClientRect().top;
        const elTop = el.getBoundingClientRect().top;
        const offset = elTop - containerTop;

        container.scrollTo({
          top: container.scrollTop + offset - 20,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  useEffect(() => {
    itemRefs.current = menuLinks.flatMap((link) => (link.items ? new Array(link.items.length).fill(null) : []));
  }, []);

  const toggleProductDropdown = () => setIsProductOpen(!isProductOpen);
  const handleLinkClick = () => {
    setActiveIndex(null);
    setIsOpen(false);
    setIsProductOpen(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch();
    }, 500); // 300ms debounce delay

    return () => {
      clearTimeout(handler); // Cancel the timeout if searchValue changes
    };
  }, [searchValue]);

  async function handleSearch() {
    if (searchValue) {
      const regex = new RegExp(searchValue, "i");
      const pages = SEARCHPAGE?.filter((v) => v.keywords.filter((n) => regex.test(n)).length > 0);

      const blogs = await getBlogs();
      setSearchDropDown([...pages, ...blogs]);
    } else {
      setSearchDropDown([]);
    }
  }

  async function getBlogs() {
    try {
      const { data, status } = await apiHandler.blog.lookup(`limit=${8}&page=${1}&search=${searchValue}`);
      if ([200, 201].includes(status)) {
        return data?.data?.docs?.map((v) => {
          v.name = v?.title;
          v.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.blogs}/${v?.Url?.trim()}`;
          return v;
        });
      }
    } catch (e) {
      console.error("Error while getting blogs list:", e);
    }
    return [];
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div
        style={{
          backgroundImage: `url(${HeaderBg.src})`,
          backgroundSize: "cover",
        }}
        className="header-gradiant absolute -top-2 right-0 lg:min-w-[920px] xl:min-w-[1050px] 2xl:!min-w-[1200px] w-auto h-[55px] bg-no-repeat z-[-1]"
      />

      <div className="relative 2xl:px-8 container mx-auto flex items-center justify-between lg:py-0 py-4 px-4">
        <Link href={ROUTES.home} className="flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="flex flex-col gap-2 2xl:gap-1">
          {currentScreen?.isLG ? (
            <div className="flex justify-end items-center gap-4 h-fit w-full pt-3 pb-1 lg:pb-0.5 lg:pt-2.5 2xl:pb-1 2xl:pt-2 text-white">
              <Link
                href={ROUTES.client.checkCreditScore}
                className="flex items-center gap-2 border border-white hover:border-quinary-100 hover:text-quinary-100 transition-all rounded-full px-3 py-0.5 text-sm"
              >
                <DotLottieWorkerReact data={CibilChecker} loop autoplay width={"100%"} height={"100%"} className="aspect-auto size-5 2xl:size-6" />
                Check Credit Score
              </Link>
              <Link
                href={ROUTES.client.registerAsChannelPartner}
                className="flex items-center gap-1 border border-white hover:border-quinary-100 hover:text-quinary-100 transition-all rounded-full px-3 py-0.5 text-sm"
              >
                Register as Channel Partner
              </Link>
              <Link
                href={URLS.CUSTOMERS}
                target="_blank"
                className="flex items-center gap-1 border border-white hover:border-quinary-100 hover:text-quinary-100 transition-all rounded-full px-3 py-0.5 text-sm"
              >
                Customer Login
              </Link>
              <Link href={`tel:${TELS.INFO}`} className="flex items-center gap-2 font-bold text-white hover:text-quinary-100 transition-all ">
                <PhoneIcon className="w-4 h-4" /> {TELS.INFO}
              </Link>
            </div>
          ) : null}
          {currentScreen?.isLG ? (
            <div className="flex items-center gap-3 xl:gap-5 justify-end">
              {menuLinks.map((link, index) => {
                return !link.isDropdown ? (
                  <Link
                    key={index}
                    href={link.href}
                    className={`hover:text-secondary-600 2xl:text-base text-sm font-medium 2xl:py-3.5 pt-3.5 pb-3 transition-all ease-in-out ${
                      link.label === "Testimonial" ? "xl:block hidden" : ""
                    }`}
                    onClick={(e) => {
                      if (link.label === "Testimonial") {
                        e.preventDefault();
                        const section = document.getElementById("testimonial");
                        if (section) {
                          const yOffset = -175;
                          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

                          window.scrollTo({
                            top: y,
                            behavior: "smooth",
                          });
                        } else {
                          router.push(`${ROUTES.home}/#testimonial`);
                        }
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div key={index} className="2xl:py-3.5 pt-3.5 pb-3  2xl:text-base text-sm" onMouseLeave={() => setIsProductOpen(false)}>
                    <div
                      onMouseEnter={() => setIsProductOpen(true)}
                      onClick={() => setIsProductOpen((prev) => !prev)}
                      className={`${isProductOpen ? "text-secondary-600 transition-all ease-in-out" : ""} flex items-center font-medium gap-1`}
                    >
                      {link.label}
                      <DownArrow className={`w-3 h-3 ml-1 fill-current text-black  ${isProductOpen ? "text-secondary-600 rotate-180 transition-all" : ""}`} />
                    </div>
                    <div
                      className={`absolute left-0 top-full z-30 p-6 bg-white shadow-xl rounded-b-xl right-0 w-full 2xl:w-[1440px] mx-auto gap-5 
                      transition-all duration-500 ease-in-out transform
                      ${isProductOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="text-2xl 2xl:text-3xl font-bold text-quinary-100">Explore Our Loan Solutions</h3>
                              <p className="text-base text-tertiary-500">
                                Find the perfect loan tailored to your needs. From personal to business financing, Ratnaafin offers flexible solutions to help
                                you achieve your goals with ease.
                              </p>
                            </div>
                            <div ref={scrollContainerRef} className="grid grid-cols-2 gap-x-4 overflow-y-auto max-h-[250px] no-scrollbar">
                              {[0, 1].map((col) => (
                                <div key={col} className="space-y-3">
                                  {link.items.slice(col * 4, col * 4 + 4).map((item, index) => {
                                    const realIndex = col * 4 + index;
                                    return (
                                      <div key={realIndex} ref={(el) => (itemRefs.current[realIndex] = el)}>
                                        {item.href ? (
                                          <Link
                                            href={item.href}
                                            onClick={() => {
                                              if (item.dropdown) {
                                                handleToggle(realIndex);
                                              } else {
                                                handleLinkClick();
                                              }
                                            }}
                                            className="cursor-pointer flex justify-between items-center group"
                                          >
                                            <div className="flex items-center gap-4">
                                              <div className="bg-senarylight-50 w-fit h-fit p-2 rounded-md">{item.icon}</div>
                                              <p className="text-quinary-100 text-base 2xl:text-lg group-hover:text-secondary-600 font-semibold">
                                                {item.title}
                                              </p>
                                            </div>
                                            <div className="bg-quaternary-200 w-fit h-fit p-3 group-hover:text-secondary-600 rounded-full">
                                              <AccordionIcon
                                                className={`w-4 h-4 transform transition-transform duration-300 ${
                                                  activeIndex === realIndex ? "rotate-0" : "-rotate-90"
                                                } ${item.dropdown ? "group-hover:rotate-0" : ""}`}
                                              />
                                            </div>
                                          </Link>
                                        ) : (
                                          <div
                                            onClick={() => {
                                              if (item.dropdown) {
                                                handleToggle(realIndex);
                                              } else {
                                                handleLinkClick();
                                              }
                                            }}
                                            className="cursor-pointer flex justify-between items-center group"
                                          >
                                            <div className="flex items-center gap-4">
                                              <div className="bg-senarylight-50 w-fit h-fit p-2 rounded-md">{item.icon}</div>
                                              <p className="text-quinary-100 text-base 2xl:text-lg group-hover:text-secondary-600 font-semibold">
                                                {item.title}
                                              </p>
                                            </div>
                                            <div className="bg-quaternary-200 w-fit h-fit p-3 group-hover:text-secondary-600 rounded-full">
                                              <AccordionIcon
                                                className={`w-4 h-4 transform transition-transform duration-300 ${
                                                  activeIndex === realIndex ? "rotate-0" : "-rotate-90"
                                                } ${item.dropdown ? "group-hover:rotate-0" : ""}`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {item.dropdown && activeIndex === realIndex && (
                                          <div className="mt-2 ml-20 space-y-3">
                                            {item.dropdown.map((dropItem, dropIndex) => (
                                              <Link
                                                href={dropItem.href}
                                                onClick={handleLinkClick}
                                                key={dropIndex}
                                                className="flex justify-between items-center rounded-md group transition p-2"
                                              >
                                                <p className="text-quinary-100 text-base 2xl:text-lg font-semibold group-hover:text-secondary-600">
                                                  {dropItem.title}
                                                </p>
                                                <div className="bg-quaternary-200 w-fit h-fit p-3 rounded-full group-hover:text-secondary-600">
                                                  <AccordionIcon className="w-4 h-4 -rotate-90" />
                                                </div>
                                              </Link>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <Image loading="lazy" src={HeaderImage} alt="HeaderImage" className="p-6 pt-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Link
                href={ROUTES.client.possibleHai}
                className="flex items-center border bg-[#F8F8F8] border-gray-300 hover:border-quinary-100 transition-all rounded-full px-5 py-1.5"
              >
                <Possiblehai className="w-auto h-4 2xl:h-5" />
              </Link>
              <div className="relative">
                {isSearchActive && <div className="fixed inset-0 bg-black/40 z-20" onClick={() => setIsSearchActive(false)} />}
                <div
                  className={`transition-all duration-300 ease-in-out mx-auto ${
                    isSearchActive ? "fixed left-1/2 top-4 w-1/2 -translate-x-1/2 rounded-xl bg-white z-30" : "relative"
                  }`}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 2xl:h-5" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchValue}
                      onFocus={() => setIsSearchActive(true)}
                      onChange={(e) => {
                        setIsSearchActive(true);
                        setSearchValue(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchValue?.trim()) {
                          router.push(`${ROUTES.client.search}?search=${searchValue}`);
                          setIsSearchActive(false);
                          setSearchValue("");
                        }
                      }}
                      className={`border border-gray-300 rounded-full ${
                        isSearchActive ? "w-full border-none pr-10" : "2xl:w-full w-[100px]"
                      } pl-9 pr-3 py-1 2xl:py-1.5 text-sm focus:outline-none focus:border-secondary-600`}
                    />

                    {isSearchActive && (
                      <button
                        onClick={() => {
                          setIsSearchActive(false);
                          setSearchValue("");
                          setSearchDropDown([]);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary-500 hover:text-black focus:outline-none"
                      >
                        <Close className="!w-5 !h-5" />
                      </button>
                    )}
                    {isSearchActive && !isEmpty(searchDropDown) ? (
                      <div className="absolute left-0 right-0 h-[450px] overflow-y-auto mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-40">
                        <ul className="divide-y divide-gray-100 text-sm">
                          {searchDropDown?.map((v, i) => (
                            <li key={i} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                              <Link
                                href={v?.href}
                                onClick={() => {
                                  setIsSearchActive(false);
                                  setSearchValue("");
                                  setSearchDropDown([]);
                                }}
                                target={v?.href?.includes("http") ? "_blank" : ""}
                                className="w-full flex"
                              >
                                {v?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {!currentScreen?.isLG ? (
          <div className="">
            <button onClick={toggleMenu} className="flex items-center justify-center rounded-md !p-2" aria-expanded={isOpen}>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {/* Mobile menu */}
      {isOpen && !currentScreen?.isLG ? (
        <div className="bg-gray-100 py-4 z-50 max-h-[560px] overflow-y-auto">
          <div className="px-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="search_input"
                type="text"
                placeholder="Search"
                value={searchValue}
                onFocus={() => setIsSearchActive(true)}
                onChange={(e) => {
                  setIsSearchActive(true);
                  setSearchValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue?.trim()) {
                    router.push(`${ROUTES.client.search}?search=${searchValue}`);
                    setIsSearchActive(false);
                    setSearchValue("");
                    setIsOpen(false);
                  }
                }}
                className="border border-gray-300 rounded-full pl-9 pr-10 py-2 text-sm w-full focus:outline-none focus:border-secondary-600"
              />
              {isSearchActive && (
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    setSearchValue("");
                  }}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <Close className="!w-5 !h-5" />
                </button>
              )}
              <button
                onClick={() => {
                  if (searchValue?.trim()) {
                    router.push(`${ROUTES.client.search}?search=${searchValue}`);
                    setIsSearchActive(false);
                    setSearchValue("");
                    setIsOpen(false);
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-600 hover:text-black focus:outline-none"
              >
                <AccordionIcon className="-rotate-45 w-4 h-4" />
              </button>

              {isSearchActive && !isEmpty(searchDropDown) ? (
                <ul className="absolute z-10 mt-1 h-[450px] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md w-full">
                  {searchDropDown?.map((v, i) => (
                    <li key={i} className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">
                      <Link
                        href={v?.href}
                        onClick={() => {
                          setIsSearchActive(false);
                          setSearchValue("");
                          setSearchDropDown([]);
                          setIsOpen(false);
                        }}
                        target={v?.href?.includes("http") ? "_blank" : ""}
                        className="w-full flex"
                      >
                        {v?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {menuLinks.map((link, index) => {
              if (!link.isDropdown) {
                return (
                  <Link
                    onClick={() => setIsOpen(false)}
                    key={index}
                    href={link.href}
                    className={`block py-2 border-b border-tertiary-500/60 hover:text-secondary-600 ${!link.href ? "pointer-events-none" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return (
                  <div key={index} className="relative border-b border-tertiary-500/60">
                    <button
                      onClick={toggleProductDropdown}
                      className={`flex justify-between items-center w-full py-2 hover:text-secondary-600 ${
                        isProductOpen ? "border-b border-tertiary-500/60" : ""
                      }`}
                    >
                      <span>{link.label}</span>
                      <div className="w-fit h-fit rounded-full">
                        <AccordionIcon className={`w-4 h-4 transform transition-transform duration-300 ${isProductOpen ? "rotate-0" : "-rotate-90"}`} />
                      </div>
                    </button>
                    {isProductOpen && (
                      <div className="pl-4 space-y-1">
                        {link.items.map((item, index) => (
                          <div key={index}>
                            {item.href ? (
                              <Link
                                href={item.href}
                                onClick={() => {
                                  if (!item.dropdown || item.href) setIsOpen(false);
                                  return item.dropdown && handleToggle(index);
                                }}
                                className={`py-2 flex justify-between hover:text-secondary-600 ${
                                  index !== link.items?.length - 1 ? "border-b border-tertiary-500/60" : ""
                                } ${!item.href && !item.dropdown ? "pointer-events-none" : ""}`}
                              >
                                {item.title}
                                {item.dropdown && (
                                  <div className="w-fit h-fit rounded-full">
                                    <AccordionIcon
                                      className={`w-4 h-4 transform transition-transform duration-300 ${activeIndex === index ? "rotate-0" : "-rotate-90"}`}
                                    />
                                  </div>
                                )}
                              </Link>
                            ) : (
                              <div
                                onClick={() => {
                                  if (!item.dropdown || item.href) setIsOpen(false);
                                  return item.dropdown && handleToggle(index);
                                }}
                                className={`py-2 flex justify-between hover:text-secondary-600 ${
                                  index !== link.items?.length - 1 ? "border-b border-tertiary-500/60" : ""
                                } ${!item.href && !item.dropdown ? "pointer-events-none" : ""}`}
                              >
                                {item.title}
                                {item.dropdown && (
                                  <div className="w-fit h-fit rounded-full">
                                    <AccordionIcon
                                      className={`w-4 h-4 transform transition-transform duration-300 ${activeIndex === index ? "rotate-0" : "-rotate-90"}`}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                            {item.dropdown && activeIndex === index && (
                              <div className="mt-2 space-y-3">
                                <div className="pl-4 space-y-2">
                                  {item.dropdown.map((subItem, subIndex) => (
                                    <Link
                                      href={subItem.href}
                                      onClick={() => setIsOpen(false)}
                                      key={subIndex}
                                      className={`block py-1 border-b border-tertiary-500/60  ${!subItem.href && !subItem ? "pointer-events-none" : ""}`}
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
            <div className="space-y-3 mt-3">
              <Link
                onClick={() => setIsOpen(false)}
                target="_blank"
                href={URLS.CUSTOMERS}
                className="py-2 flex items-center border border-gray-300 rounded-full justify-center text-sm hover:border-secondary-600 hover:text-secondary-600"
              >
                Customer Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href={ROUTES.client.registerAsChannelPartner}
                className="py-2 flex items-center border border-gray-300 rounded-full justify-center text-sm hover:border-secondary-600 hover:text-secondary-600"
              >
                Register as Channel Partner
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href={ROUTES.client.checkCreditScore}
                className="py-2 flex gap-2 text-black items-center border border-gray-300 rounded-full justify-center text-sm hover:border-secondary-600 hover:text-secondary-600"
              >
                <DotLottieWorkerReact data={CibilChecker} loop autoplay width={"100%"} height={"100%"} className="aspect-auto size-6" /> Check Credit Score
              </Link>
              <Link
                href={ROUTES.client.possibleHai}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center border border-gray-300 rounded-full px-5 py-2"
              >
                <Possiblehai />
              </Link>
              <Link onClick={() => setIsOpen(false)} href={`tel:${TELS.INFO}`} className="flex justify-center items-center gap-2 font-bold text-secondary-600">
                <PhoneIcon className="w-4 h-4" /> {TELS.INFO}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default memo(Header);
