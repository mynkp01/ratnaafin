"use client";
import { apiHandler } from "@/api/apiHandler";
import {
  AccordionIcon,
  Calendar,
  CareerBanner,
  CareerBannerMobile,
  Clock,
  ExploreIcon,
  GreatPlaceToWork,
  Innovation,
  Location,
  Partnership,
  Search,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  TeamImage,
} from "@/assets";
import { selectScreen, setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty, showToast, timeAgo } from "@/utils/helper";
import { Box, FormControl, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Tab, Tabs, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ApplyForJob = dynamic(() => import("@/components/ApplyForJob"), {
  ssr: false,
});
const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NoData = dynamic(() => import("@/components/NoData"), {
  ssr: false,
});

const aboutUsTabs = [
  {
    key: "tab1",
    label: "Why Choose Ratnaafin?",
    content: (
      <>
        <p className="text-quinary-100">
          At Ratnaafin Capital, we’re more than just a financial company—we’re a team of people who believe in the power of dreams.Whether you’re a seasoned
          professional or just starting your career as a fresher, we see you as part of something bigger.We look beyond the numbers to the people—the dreamers,
          doers, and risk- takers who drive businesses forward.
        </p>
        <p className="text-quinary-100">
          For fresh graduates stepping into the professional world, Ratnaafin is a place where you can grow, learn, and make a real difference. We’ll support
          you every step of the way, helping you build a fulfilling career while making a positive impact on the businesses we serve. You’ll have the chance to
          learn from experienced professionals and take on challenges that inspire personal and professional growth.
        </p>
      </>
    ),
  },
  {
    key: "tab2",
    label: "A Day in the Life at Ratnaafin Capital",
    content: (
      <>
        <p className="text-quinary-100">
          At Ratnaafin Capital, every day offers a blend of professional growth and personal fulfillment. Here’s a snapshot of what makes working here special:
        </p>
        <div className="flex flex-col gap-2">
          <h6 className="!text-quinary-100 !font-bold">Dynamic Work Environment:</h6>
          <p className="text-quinary-100 list-inside list-disc">
            Our flexible work hours and supportive environment ensure you can balance your professional responsibilities with your personal life. Whether you’re
            an experienced professional, a fresh graduate, or an aspiring talent, you’ll find a workplace that adapts to your needs and celebrates your
            contributions.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="text-quinary-100 font-bold">Inclusive and Collaborative Culture:</h6>
          <p className="text-quinary-100 list-inside list-disc">
            Inclusive and Collaborative Culture: Enjoy working in an open and inclusive environment where every voice is valued. Our flat organizational
            structure promotes direct interaction with team leaders and decision-makers, fostering a collaborative atmosphere free from rigid hierarchies.
          </p>
        </div>
      </>
    ),
  },
  {
    key: "tab3",
    label: "What's in It for You?",
    content: (
      <>
        <h6 className="text-quinary-100 font-bold">
          We’re more than just a workplace; we’re a community that prioritizes your growth and well-being. Here’s how we stand out:
        </h6>
        <p className="text-quinary-100">Work in an inspiring space equipped with cutting-edge facilities that boost your productivity.</p>
        <p className="text-quinary-100">Engage in meaningful work that truly makes a difference for small business owners and communities.</p>
        <p className="text-quinary-100">Enjoy tailored career development opportunities and clear pathways for internal advancement.</p>
        <p className="text-quinary-100">Benefit from health initiatives that support both physical and mental well-being.</p>
        <p className="text-quinary-100">Experience a workplace that actively champions gender diversity and equal opportunities.</p>
        <p className="text-quinary-100">Enjoy flexible policies that respect your personal time and promote balance.</p>
        <p className="text-quinary-100">Celebrate your achievements with meaningful performance linked rewards.</p>
      </>
    ),
  },
];

const slidesArray = [
  {
    image: Slide1,
    altText: "image",
  },
  {
    image: Slide2,
    altText: "image",
  },
  {
    image: Slide3,
    altText: "image",
  },
  {
    image: Slide4,
    altText: "Empowered Voices, Real Stories",
  },
  {
    image: Slide5,
    altText: "Grow your career with Ratnaafin",
  },
  {
    image: Slide6,
    altText: "Explore Job",
  },
  {
    image: Slide7,
    altText: "Join us Today at Ratnaafin",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
}

const ExploreJob = ({ title, address, time, year, week }) => {
  return (
    <div className="xs:flex grid gap-4 justify-between w-full">
      <div className="xs:flex grid gap-4">
        <p>
          <ExploreIcon />
        </p>
        <div className="flex flex-col gap-2">
          <p className="font-medium xs:text-lg text-base">{title}</p>
          <p className="text-tertiary-500 text-sm flex gap-2 items-start">
            <Location className="!min-w-6 w-6" />
            {address}
          </p>
          <div className="flex gap-2">
            <p className="text-tertiary-500 text-sm flex gap-2 items-center">
              <Clock className="w-6 h-6" /> {time}
            </p>
            <p className="text-tertiary-500 text-sm flex gap-2 items-center">
              <Calendar className="w-6 h-6" />
              {year}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-tertiary-500 text-nowrap">{week}</p>
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `careers-tab-${index}`,
    "aria-controls": `careers-${index}`,
    "aria-expanded": "true",
  };
}
function a11yJobsProps(index: number) {
  return {
    id: `careers-jobs-tab-${index}`,
    "aria-controls": `careers-jobs-${index}`,
    "aria-expanded": "true",
  };
}

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);
  const [step, setStep] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [tabsData, setTabsData] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterObj, setFilterObj] = useState({ search: "", jobTypeId: "", cityId: "" });
  const [applyNow, setApplyNow] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchJobType();
    fetchCity();
  }, [filterObj.jobTypeId, filterObj.search, filterObj.cityId]);

  const fetchJobs = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.lookup(`jobTypeId=${filterObj.jobTypeId}&search=${filterObj.search}&cityId=${filterObj.cityId}`);
      if (status === 200 || status === 201) {
        let formattedData = data?.data;
        formattedData = formattedData.map((item: any) => {
          const city = item.city.map((cityItem: any) => {
            return cityItem.city;
          });
          return { ...item, city: city.join(", ") };
        });
        setTabsData(formattedData);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const fetchJobType = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.value.lookup(`value=${LOOKUP_VALUES.JOB_TYPE}`);

      if (status === 200 || status === 201) {
        setJobTypeData(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const fetchCity = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.cityLookup();

      if (status === 200 || status === 201) {
        setCities(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="flex flex-col gap-12 overflow-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        {currentScreen?.isXS ? (
          <Image fetchPriority="high" loading="eager" priority={true} src={CareerBannerMobile} alt="Career at Ratnaafin" className="!object-cover !w-full" />
        ) : (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={CareerBanner}
            alt="Career at Ratnaafin"
            className=" !object-cover object-right w-full"
          />
        )}
        <div className="absolute top-0 right-[12%]">
          <Image fetchPriority="high" loading="eager" priority={true} src={GreatPlaceToWork} alt="GreatPlaceToWork" />
        </div>
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 md:gap-6 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[500px] lg:max-w-[700px] xl:max-w-[800px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[80px] md:rounded-tr-[110px] lg:rounded-tr-[130px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold lg:w-5/6">
                {`Discover Your Financial Passion In a Career That's More Than Just A Job`}
              </h2>
              <h1 className="text-white lg:w-5/6">Transform Your Ambition into Expertise: Join a Field Where Your Drive Meets Opportunity.</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Explore Job section */}
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="lg:flex grid gap-4">
          <div className="relative flex lg:w-[1100px] flex-col gap-8 overflow-hidden bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 sm:p-8 ">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Explore Job</h4>
                <p className="text-tertiary-500 text-sm sm:text-base lg:text-left text-center">On the basis of your Interest</p>
              </div>
              <div className="sm:flex grid gap-3">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={filterObj.search}
                    onChange={(e) =>
                      setFilterObj((prev) => {
                        return { ...prev, search: e.target.value };
                      })
                    }
                    className="border border-gray-300 bg-quaternary-200 rounded-full w-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-secondary-600"
                  />
                </div>
                <div className="xs:flex grid gap-3">
                  <FormControl
                    sx={{
                      minWidth: 140,
                      borderRadius: "25px",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Select
                      labelId="jobTypeID"
                      id="jobTypeID"
                      displayEmpty
                      value={filterObj?.jobTypeName || ""}
                      renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Job Type"}</span>}
                      defaultValue={""}
                      input={
                        <OutlinedInput
                          notched={false}
                          endAdornment={
                            filterObj.jobTypeId ? (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFilterObj((prev) => ({
                                      ...prev,
                                      jobTypeId: "",
                                      jobTypeName: "",
                                    }));
                                  }}
                                >
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ) : null
                          }
                        />
                      }
                      IconComponent={filterObj.jobTypeId ? () => null : undefined}
                      sx={{
                        borderRadius: "25px",
                        "& .MuiSelect-select": {
                          padding: "8px 16px",
                          ...(filterObj.jobTypeId && { paddingRight: "0px !important" }),
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#777",
                        },
                      }}
                    >
                      {jobTypeData.map((item) => (
                        <MenuItem
                          key={item?._id}
                          value={item?.name}
                          onClick={() =>
                            setFilterObj((prev) => {
                              return { ...prev, jobTypeId: item?._id, jobTypeName: item?.name };
                            })
                          }
                        >
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    sx={{
                      minWidth: 140,
                      borderRadius: "25px",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Select
                      labelId="city-label"
                      id="city"
                      displayEmpty
                      value={filterObj?.cityName || ""}
                      renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Location"}</span>}
                      defaultValue={""}
                      input={
                        <OutlinedInput
                          notched={false}
                          endAdornment={
                            filterObj.cityId ? (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFilterObj((prev) => ({
                                      ...prev,
                                      cityId: "",
                                      cityName: "",
                                    }));
                                  }}
                                >
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ) : null
                          }
                        />
                      }
                      IconComponent={filterObj.cityId ? () => null : undefined}
                      sx={{
                        borderRadius: "25px",
                        "& .MuiSelect-select": {
                          padding: "8px 16px",
                          ...(filterObj.cityId && { paddingRight: "0px !important" }),
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#777",
                        },
                      }}
                    >
                      {cities.map((item) => (
                        // disabled={!selectedState}
                        <MenuItem
                          key={item?._id}
                          value={item?.city}
                          onClick={() =>
                            setFilterObj((prev) => {
                              return { ...prev, cityId: item?._id, cityName: item?.city };
                            })
                          }
                        >
                          {item?.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <p className="text-tertiary-500 text-sm">Showing {tabsData?.length} Positions</p>
            </div>
            <div>
              <Box className="flex flex-col h-[400px]">
                {isEmpty(tabsData) ? (
                  <NoData text="No Jobs Available" />
                ) : (
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={step}
                    onChange={(e, newValue) => setStep(newValue)}
                    aria-label="horizontal tabs example"
                    className="overflow-hidden pb-3 sm:pb-0"
                    sx={{
                      "& .MuiTabs-scrollButtons": {
                        display: "none",
                      },
                      "& .MuiTabs-scroller": {
                        overflowY: "auto !important",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#ccc",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#f1f1f1",
                        },
                      },
                      "& .MuiTabs-list": {
                        rowGap: "15px",
                      },
                      "& .MuiTab-root": {
                        alignItems: "flex-start",
                        textAlign: "left",
                        textTransform: "capitalize",
                        backgroundColor: "#f8f8f8",
                        borderRadius: "10px",
                        marginRight: "16px",
                        paddingX: 2,
                        paddingY: 2,
                        border: "1px solid #f8f8f8",
                        color: "#000000 !important",
                      },
                      "& .Mui-selected": {
                        border: "1px solid #1EB259",
                        borderColor: "#1EB259",
                        color: "#000000 !important",
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                    }}
                  >
                    {tabsData.map((tab: any, tabIndex: number) => (
                      <Tab
                        key={tab._id}
                        label={
                          <ExploreJob
                            title={tab?.title}
                            address={tab?.city}
                            time={tab?.workType}
                            year={tab?.experience}
                            week={tab?.createdAt ? timeAgo(tab?.createdAt) : ""}
                          />
                        }
                        {...a11yJobsProps(tabIndex)}
                        sx={{ maxWidth: "100%" }}
                      />
                    ))}
                  </Tabs>
                )}
              </Box>
            </div>
            {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-b-2xl from-quaternary-200 via-quaternary-200/80 to-transparent pointer-events-none"></div> */}
          </div>
          <div className="w-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl p-6">
            {isEmpty(tabsData) ? (
              <NoData text="No Jobs Available" />
            ) : (
              <div className="relative flex w-full h-full flex-col">
                {tabsData.map((tab, index) => (
                  <TabPanel value={step} index={index} key={tab?._id} className="h-full">
                    <div className="flex flex-col gap-5 justify-between h-full">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 overflow-y-auto lg:h-[550px]">
                          <h5 className="text-quinary-100 font-bold text-lg sm:text-xl">{tab?.title}</h5>
                          <div className="flex flex-col gap-2 mb-2">
                            <p className="text-tertiary-500 text-sm flex gap-2 items-center">
                              <Location className="w-5 h-5" />
                              {tab?.city}
                            </p>
                            <div className="flex gap-2">
                              <p className="text-tertiary-500 text-sm flex gap-2 items-center">
                                <Clock className="w-5 h-5" /> {tab?.workType}
                              </p>
                              <p className="text-tertiary-500 text-sm flex gap-2 items-center">
                                <Calendar className="w-5 h-5" />
                                {tab?.experience}
                              </p>
                            </div>
                          </div>
                          <div className="ck-content" dangerouslySetInnerHTML={{ __html: tab?.description }} />
                        </div>
                      </div>
                      <div
                        className="flex justify-end"
                        onClick={() => {
                          const section = document.getElementById("joinustoday");

                          if (section) {
                            const yOffset = -190;
                            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

                            window.scrollTo({
                              top: y,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        <button
                          className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                          onClick={() => setApplyNow(tab?._id)}
                        >
                          <span className="relative z-10">Apply Now</span>
                        </button>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Our Core Values section */}
      <div className="relative container mx-auto lg:flex items-center w-fit 2xl:px-8">
        <div className="w-full flex xl:!max-w-[650px] xl:max-h-[500px] md:h-[520px] ">
          <Image
            loading="lazy"
            src={TeamImage}
            alt="Team Photo"
            className="lg:rounded-l-2xl lg:rounded-r-none rounded-t-2xl rounded-b-none !h-full !w-full !object-cover"
          />
        </div>
        <div className="w-full text-white ">
          <div className="sm:!pl-16 xl:p-0 sm:p-8 p-4 space-y-5 sm:space-y-10">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center">Our Core Values</h2>
            <div className="space-y-5 sm:space-y-10">
              <div className="flex gap-6 sm:-ml-24">
                <div className="h-fit sm:bg-gradient-to-l from-secondary-600 via-secondary-600 to-primary-400 w-fit rounded-full sm:p-4">
                  <Innovation />
                </div>
                <div className="space-y-3">
                  <h3 className="sm:text-xl font-semibold">Agile Innovation (Adaptability & Resilience)</h3>
                  <p className="text-sm">
                    Innovation is at the heart of Ratnaafin Capital. We embrace creativity and actively seek new ideas, continuously evolving our financial
                    solutions to meet the unique needs of our clients in a dynamic market.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 sm:-ml-24">
                <div className="h-fit sm:bg-gradient-to-l from-secondary-600 via-secondary-600 to-primary-400 w-fit rounded-full sm:p-4 mt-8">
                  <Partnership />
                </div>
                <div className="space-y-3 border-t pt-6 sm:pt-10">
                  <h3 className="sm:text-xl font-semibold">Empowering Partnership (Humility & Responsibility)</h3>
                  <p className="text-sm">
                    Empowerment is integral to our culture at Ratnaafin Capital. We cultivate a collaborative environment, providing our team and clients with
                    the support and resources they need to thrive and achieve their goals together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-l lg:rounded-none rounded-2xl top-0 from-primary-400 to-secondary-600 lg:min-w-[calc(100%-410px)] xl:min-w-[calc(100%-520px)] 2xl:min-w-[calc(100%-590px)] w-full h-full absolute z-[-1]" />
        </div>
      </div>

      {/* Tab Section */}
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <Box className="flex flex-col">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab}
                onMouseLeave={() => setHoveredTab(null)}
                onChange={(e, newValue) => setSelectedTab(newValue)}
                aria-label="vertical tabs"
                className="xs:min-w-fit overflow-hidden pb-3 sm:pb-0"
                sx={{
                  "& .MuiTabs-scrollButtons": {
                    display: "none",
                  },
                  "& .MuiTabs-scroller": {
                    overflowY: "auto !important",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#ccc",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                  },
                  "& .MuiTabs-list": {
                    rowGap: "0px",
                  },
                  "& .MuiTab-root": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 0,
                    padding: "24px 16px",
                    borderBottom: "1px solid #E5E5E5",
                    color: "#0C1E38",
                    textAlign: "left",
                  },
                  "& .Mui-selected": {
                    color: "#0C1E38 !important",
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                {aboutUsTabs.map((tab, tabIndex) => (
                  <Tab
                    key={tab.key}
                    onMouseEnter={() => setHoveredTab(tabIndex)}
                    label={
                      <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "18px",
                              sm: "22px",
                              md: "26px",
                              lg: "30px",
                            },
                            fontWeight: 700,
                          }}
                        >
                          {tab.label}
                        </Typography>
                        <Box
                          sx={{
                            border: "1px solid #0C1E38",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px",
                          }}
                        >
                          <AccordionIcon
                            className={`${
                              selectedTab === tabIndex || hoveredTab === tabIndex
                                ? "-rotate-45 transform transition-transform duration-300"
                                : "-rotate-90 transform transition-transform duration-300"
                            }`}
                          />
                        </Box>
                      </Box>
                    }
                    {...a11yProps(tabIndex)}
                    sx={{ maxWidth: "100%" }}
                  />
                ))}
              </Tabs>
            </Box>
          </div>
          <div>
            {aboutUsTabs.map((tab, index) => (
              <TabPanel value={selectedTab} index={index} key={tab.key} sx={{ p: 0 }}>
                <div className="flex flex-col gap-4">
                  {tab.content}
                  {/* <button className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10">Read More</span>
                  </button> */}
                </div>
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
      {/* Life at Ratnaafin section */}
      <div className="relative flex flex-col gap-2">
        <div className="container mx-auto flex flex-col gap-2 items-center px-4">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Life at Ratnaafin</h3>
          <p className="text-center xl:w-1/2 w-full text-sm sm:text-base text-tertiary-500">
            A culture of growth, collaboration, and purpose. Discover what makes working at Ratnaafin truly rewarding.
          </p>
        </div>
        <div className="curved-swiper-wrapper">
          <Swiper
            spaceBetween={20}
            centeredSlides={true}
            grabCursor={true}
            breakpoints={{
              350: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            effect={"coverflow"}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,

              pauseOnMouseEnter: true,
            }}
            loop
            // speed={1000}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper !h-fit"
            onSwiper={setSwiper}
          >
            {slidesArray?.map((v, i) => (
              <SwiperSlide key={i}>
                <Image src={v.image} loading="lazy" width={1700} height={500} alt={v.altText} className="!object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="justify-center flex gap-4 z-10">
          <div onClick={() => swiper?.slidePrev()} className="button-prev bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-[#f8f8f8]">
            <AccordionIcon className="w-5 h-5 rotate-[135deg] text-quinary-100  group-hover:rotate-[135deg] transform transition-transform duration-300" />
          </div>
          <div onClick={() => swiper?.slideNext()} className="button-next bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-[#f8f8f8]">
            <AccordionIcon className="w-5 h-5 -rotate-45 text-quinary-100  group-hover:-rotate-45 transform transition-transform duration-300" />
          </div>
        </div>
      </div>
      {/* Apply for Job */}
      <ApplyForJob selectedJob={applyNow} />
    </div>
  );
}

export default memo(Page);
