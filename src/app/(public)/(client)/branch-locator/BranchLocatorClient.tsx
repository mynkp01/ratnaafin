"use client";

import { apiHandler } from "@/api/apiHandler";
import { BranchLocator, Mail, PhoneIcon, Search } from "@/assets";
import { convertMediaUrl } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { Box, FormControl, MenuItem, Select, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

const Location = ({ doc_path, branchName, address, email, phoneNumber }) => {
  return (
    <div className="xs:flex grid gap-4">
      <Image
        loading="lazy"
        src={!isEmpty(doc_path) ? convertMediaUrl(doc_path) : BranchLocator.src}
        width={100}
        height={100}
        alt=""
        className="rounded-2xl !object-cover !object-center !aspect-square"
      />
      <div className="flex flex-col gap-2">
        <p className="font-medium xs:text-lg text-base">{branchName}</p>
        <p className="text-tertiary-500 xs:text-base text-sm">{address}</p>
        <div className="flex flex-col gap-1">
          <p className="text-quinary-100 xs:text-base text-sm flex gap-1 items-center">
            <PhoneIcon className="w-5 h-5" />
            {phoneNumber}
          </p>
          <p className="text-quinary-100 xs:text-base text-sm flex gap-1 items-center">
            <Mail className="w-5 h-5" />
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `branch-locator-tab-${index}`,
    "aria-controls": `branch-locator-${index}`,
    "aria-expanded": "true",
  };
}

function ClientComponent({ initialBranches, initialStates }) {
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [cities, setCities] = useState([]);
  const [filterObj, setFilterObj] = useState({ search: "", state: "", city: "" });
  const [tabsData, setTabsData] = useState(initialBranches || []);

  useEffect(() => {
    fetchBranches();
  }, [filterObj.state, filterObj.city]);

  useEffect(() => {
    if (filterObj.state) {
      fetchCity();
    }
  }, [filterObj.state]);

  const fetchBranches = async () => {
    try {
      const { data, status } = await apiHandler.branchLocator.lookup(
        `stateId=${filterObj?.state?._id || ""}&search=${filterObj?.search}&cityId=${filterObj?.city?._id || ""}`,
      );
      if (status === 200 || status === 201) {
        const formattedData = data?.data;
        setTabsData(formattedData);
        setSelectedBranch(0);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    }
  };

  const fetchCity = async () => {
    try {
      const { data, status } = await apiHandler.branchLocator.cityLookup(`stateId=${filterObj?.state?._id || ""}`);

      if (status === 200 || status === 201) {
        setCities(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    }
  };

  const handleSearchChange = (event) => {
    setFilterObj((prev) => ({ ...prev, search: event.target.value }));
  };

  const [showGradient, setShowGradient] = useState(true);
  const tabScrollerRef = useRef(null);

  useEffect(() => {
    const scroller = tabScrollerRef.current?.querySelector(".MuiTabs-scroller");

    if (!scroller) return;

    const handleScroll = () => {
      const isBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
      setShowGradient(!isBottom);
    };

    scroller.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
      <div className="lg:grid lg:grid-cols-5 flex flex-col gap-4">
        <div className="relative col-span-3 flex flex-col gap-8 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 sm:p-8">
          <div className="flex flex-col gap-4">
            <p className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Branch Locator</p>
            <div className="sm:flex grid gap-3">
              <div className="xs:flex grid gap-3">
                <FormControl
                  sx={{
                    minWidth: 140,
                    borderRadius: "25px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Select
                    labelId="state-label"
                    id="state"
                    displayEmpty
                    value={filterObj?.state?.state || ""}
                    renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Select State"}</span>}
                    sx={{
                      borderRadius: "25px",
                      "& .MuiSelect-select": {
                        padding: "8px 16px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#777",
                      },
                    }}
                  >
                    {initialStates?.map((item) => (
                      <MenuItem
                        key={item?._id}
                        value={item?.state}
                        onClick={() => {
                          setCities([]);
                          setFilterObj((prev) => ({ ...prev, state: item, city: "" }));
                        }}
                      >
                        {item?.state}
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
                  disabled={isEmpty(filterObj?.state)}
                >
                  <Select
                    labelId="city-label"
                    id="city"
                    displayEmpty
                    value={filterObj?.city?.city || ""}
                    renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Select City"}</span>}
                    sx={{
                      borderRadius: "25px",
                      "& .MuiSelect-select": {
                        padding: "8px 16px",
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
                      <MenuItem key={item?._id} value={item?.city} onClick={() => setFilterObj((prev) => ({ ...prev, city: item }))}>
                        {item?.city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 bg-quaternary-200 rounded-full w-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-secondary-600"
                  onChange={handleSearchChange}
                  onBlur={fetchBranches}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      fetchBranches();
                    }
                  }}
                  value={filterObj.search}
                />
              </div>
            </div>
          </div>
          <div>
            <Box className="flex flex-col h-[470px]" ref={tabScrollerRef}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedBranch}
                onChange={(e, newValue) => setSelectedBranch(newValue)}
                aria-label="horizontal tabs example"
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
                {tabsData.map((tab, tabIndex) => (
                  <Tab
                    key={tab?._id}
                    label={
                      <Location branchName={tab?.branchName} address={tab?.address} email={tab.email} doc_path={tab?.doc_path} phoneNumber={tab?.phoneNumber} />
                    }
                    {...a11yProps(tabIndex)}
                    sx={{ maxWidth: "100%" }}
                  />
                ))}
              </Tabs>
            </Box>
          </div>
          {showGradient && (
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-b-2xl from-quaternary-200 via-quaternary-200/80 to-transparent pointer-events-none transition-opacity duration-300" />
          )}
        </div>
        <div className="col-span-2">
          <div className="flex w-full h-full aspect-square flex-col overflow-hidden">
            {tabsData.map((tab, index) => (
              <TabPanel value={selectedBranch} index={index} key={tab._id} className="!h-full aspect-square !w-full">
                <div className="h-full rounded-2xl" dangerouslySetInnerHTML={{ __html: tab?.iframe }} />
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function showToast(type, message) {
  console.error(message);
}

export default memo(ClientComponent);
