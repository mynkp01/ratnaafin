"use client";
import { apiHandler } from "@/api/apiHandler";
import { ArrowIcon, DisclosuresBanner, DisclosuresBannerMobile, DownArrow, Download, Eye, Pdf } from "@/assets";
import { selectScreen, setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl, LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { ClearIcon } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDownloader from "react-use-downloader";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});
const NoData = dynamic(() => import("@/components/NoData"), {
  ssr: false,
});

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);

  const tableContainerRef = useRef(null);

  const [step, setStep] = useState(0);
  const [language, setLanguage] = React.useState([]);
  const [filter, setFilter] = React.useState({
    languageId: "",
    date: null,
    categoryId: "",
  });
  const [categoryData, setCategoryData] = useState([]);
  const [disclosure, setDisclosure] = useState([]);
  const { download } = useDownloader();
  const [showGradient, setShowGradient] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.value.lookup(`value=${LOOKUP_VALUES.DISCLOSURE}&sort_type=sort_order&sort=1`);
      if (status === 200 || status === 201) {
        setCategoryData(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchLanguage = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.value.lookup(`value=${LOOKUP_VALUES.LANGUAGE}`);
      if (status === 200 || status === 201) {
        setLanguage(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchDisclosure = async () => {
    try {
      let startDate = "",
        endDate = "";
      if (filter?.date) {
        startDate = dayjs(filter.date).startOf("month").toISOString();
        endDate = dayjs(filter.date).endOf("month").toISOString();
      }
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.disclosure.lookup(
        // `languageId=${filter.languageId}&startDate=${startDate}&endDate=${endDate}&subCategoryId=${selectedSubCategory?._id}&categoryId=${filter.categoryId}`
        `languageId=${filter.languageId}&subCategoryId=${selectedSubCategory?._id}&categoryId=${filter.categoryId}`,
      );
      if (status === 200 || status === 201) {
        setDisclosure(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleTabChange = (value: number, item: unknown) => {
    setStep(value);
    setOpenDropdownIndex((prev) => (prev === value ? null : value));
    setFilter((prev) => ({ ...prev, categoryId: item?._id }));
    setSelectedSubCategory("");
  };

  useEffect(() => {
    const container = tableContainerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      setShowGradient(!isBottom);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchCategory();
    fetchLanguage();
  }, []);

  useEffect(() => {
    fetchDisclosure();
  }, [filter.languageId, filter.date, selectedSubCategory, filter.categoryId]);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        {currentScreen?.isXS ? (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={DisclosuresBannerMobile}
            alt="Disclosures Ratnaafin"
            className="!object-cover !w-full"
          />
        ) : (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={DisclosuresBanner}
            alt="Disclosures Ratnaafin"
            className=" !object-cover object-right w-full"
          />
        )}
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 md:gap-8 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl sm:rounded-tr-[55px] md:rounded-tr-[70px] lg:rounded-tr-[90px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-1 md:gap-3">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold">Disclosures</h2>
              <h1 className="text-white lg:w-5/6">Transparent Dealings, Trusted Insights</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="lg:flex grid gap-4">
          <div className="flex flex-col lg:w-[600px] h-fit bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl gap-4">
            <p className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Disclosures</p>
            <div className="overflow-y-auto max-h-[530px] pr-2">
              {categoryData.map((item, tabIndex) => (
                <Box key={item._id}>
                  <Box
                    onClick={() => {
                      handleTabChange(tabIndex, item);
                    }}
                    sx={{
                      cursor: "pointer",
                      px: 2,
                      py: 2,
                      backgroundColor: "#f8f8f8",
                      border: openDropdownIndex === tabIndex ? "1px solid #1EB259" : "1px solid #f8f8f8",
                      borderRadius: "10px",
                      color: "#000000",
                      textTransform: "capitalize",
                      mb: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item?.name}
                    {item?.subCategory?.length > 0 && (
                      <ArrowIcon
                        className={`w-3 h-3 transform transition-transform duration-300
                        ${openDropdownIndex === tabIndex ? "-rotate-180" : "rotate-0"}
                        group-hover:rotate-90
                      `}
                      />
                    )}
                  </Box>
                  {item?.subCategory?.length > 0 ? (
                    <Collapse in={openDropdownIndex === tabIndex} timeout="auto" unmountOnExit>
                      <Box sx={{ py: 1, mb: 1, backgroundColor: "#f8f8f8", borderRadius: "10px" }}>
                        {item?.subCategory.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            onClick={() => setSelectedSubCategory(opt)}
                            className={`cursor-pointer py-2 px-4 rounded hover:text-secondary-600 ${
                              selectedSubCategory?._id === opt?._id ? "text-secondary-600" : ""
                            }`}
                          >
                            {opt?.name}
                          </div>
                        ))}
                      </Box>
                    </Collapse>
                  ) : null}
                </Box>
              ))}
            </div>
          </div>
          <div className="relative flex w-full flex-col bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] p-5 sm:overflow-hidden overflow-auto rounded-2xl gap-4">
            <div className="lg:flex grid gap-3 lg:justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-wrap text-center text-quinary-100">{categoryData?.[step]?.name}</p>
                <p className="text-base lg:text-left text-wrap text-center text-quinary-100">{selectedSubCategory?.name}</p>
              </div>
              <div className="xs:flex lg:justify-start justify-center grid gap-2">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        InputProps: {
                          endAdornment: filter?.date ? (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setFilter((prev) => ({ ...prev, date: null }))} size="small">
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                        },
                      },
                    }}
                    sx={{
                      "& .MuiPickersInputBase-root": {
                        borderRadius: "9999px",
                        backgroundColor: "#f8f8f8",
                        "& .MuiPickersOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        fontSize: "14px",
                        height: "40px",
                        border: "1px solid #e1e1e1",
                        "& .MuiSelect-select": {
                          padding: 0,
                        },
                        "& .MuiInputBase-input": {
                          padding: 0,
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "2px 16px",
                        },
                      },
                    }}
                    views={["month", "year"]}
                    value={filter?.date}
                    maxDate={dayjs()}
                    onChange={(newValue) => {
                      setFilter((prev) => ({ ...prev, date: newValue }));
                    }}
                  />
                </LocalizationProvider> */}
                <Box>
                  <FormControl fullWidth>
                    <Select
                      value={filter.languageId}
                      onChange={(e) => {
                        setFilter((prev) => ({ ...prev, languageId: e.target.value }));
                      }}
                      displayEmpty
                      input={
                        <OutlinedInput
                          notched={false}
                          endAdornment={
                            filter.languageId ? (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFilter((prev) => ({ ...prev, languageId: "" }));
                                  }}
                                >
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ) : null
                          }
                        />
                      }
                      sx={{
                        borderRadius: "9999px",
                        backgroundColor: "#f8f8f8",
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        fontSize: "14px",
                        height: "40px",
                        border: "1px solid #e1e1e1",
                        "& .MuiSelect-select": {
                          padding: 0,
                          ...(filter.languageId && { paddingRight: "0px !important" }),
                        },
                        "& .MuiInputBase-input": {
                          padding: 0,
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "2px 16px",
                          ...(filter.languageId && { paddingRight: "0px !important" }),
                        },
                        "& .MuiSelect-icon": {
                          top: "50%",
                          transform: "translateY(-50%)",
                          right: "12px",
                        },
                      }}
                      IconComponent={filter.languageId ? () => null : DownArrow}
                    >
                      <MenuItem disabled value="">
                        Language
                      </MenuItem>
                      {language.map((item) => (
                        <MenuItem key={item?._id} value={item?._id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <TableContainer
              ref={tableContainerRef}
              component={Paper}
              elevation={0}
              sx={{
                boxShadow: "none",
                maxHeight: "530px",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  height: 5,
                  width: 0,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: 4,
                },
              }}
            >
              <Table
                stickyHeader
                aria-label="simple table"
                sx={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                }}
              >
                <TableBody>
                  {!isEmpty(disclosure.filter((element) => element?.categoryValueCode === categoryData[step]?.value_code)) ? (
                    disclosure
                      .filter((element) => element?.categoryValueCode === categoryData[step]?.value_code)
                      .map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: "#F8F8F8",
                            borderRadius: 10,
                            "& td, & th": { border: 0, padding: "8px 2px" },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: "50px",
                              padding: "8px 16px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Pdf className="sm:size-16" />
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 16px",
                              whiteSpace: "nowrap",
                              marginRight: "10px",
                            }}
                            // className="!flex !flex-col sm:!flex-row justify-between sm:!items-center gap-1 sm:gap-2"
                          >
                            <div>
                              <Typography variant="subtitle1" className="!font-semibold text-wrap">
                                {item?.title}
                              </Typography>
                              {/* <Typography variant="caption" className="text-[#525252]">
                                {moment(item?.createdAt).format("MMM, YYYY")}
                              </Typography> */}
                            </div>
                            {!currentScreen?.isLG ? (
                              <div>
                                <Button
                                  variant="contained"
                                  startIcon={<Download className="sm:w-auto sm:h-auto w-4 h-4" />}
                                  onClick={async () => {
                                    if (item?.doc_path) {
                                      dispatch(setIsLoading(true));
                                      await download(convertMediaUrl(item?.doc_path), item?.doc_path.split("/")[item?.doc_path.split("/")?.length - 1]);
                                      dispatch(setIsLoading(false));
                                    }
                                  }}
                                  sx={{
                                    marginRight: 1,
                                    background: "#046EB6",
                                    borderRadius: "20px",
                                    fontSize: !currentScreen?.isLG ? "10px" : "14px",
                                    minWidth: !currentScreen?.isLG ? "auto" : "100px",
                                    whiteSpace: "nowrap",
                                    boxShadow: "none",
                                    "&:hover": {
                                      boxShadow: "none",
                                    },
                                  }}
                                  className="!px-[6px] !py-[2px] sm:!px-4 sm:!py-2"
                                  size="small"
                                >
                                  Download
                                </Button>
                                <Button
                                  variant="outlined"
                                  startIcon={<Eye className="sm:w-auto sm:h-auto  w-4 h-4" />}
                                  sx={{
                                    marginRight: 1,
                                    color: "#ffffff",
                                    background: "#1EB259",
                                    borderRadius: "20px",
                                    fontSize: !currentScreen?.isLG ? "10px" : "14px",
                                    minWidth: !currentScreen?.isLG ? "auto" : "100px",
                                    whiteSpace: "nowrap",
                                    boxShadow: "none",
                                    "&:hover": {
                                      boxShadow: "none",
                                    },
                                  }}
                                  className="!px-[6px] !py-[2px] sm:!px-4 sm:!py-2"
                                  size="small"
                                  onClick={() => {
                                    if (item?.doc_path) {
                                      window.open(convertMediaUrl(item?.doc_path), "_blank");
                                    }
                                  }}
                                >
                                  View
                                </Button>
                              </div>
                            ) : null}
                          </TableCell>
                          {!!currentScreen?.isLG ? (
                            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                              <Button
                                variant="contained"
                                startIcon={<Download />}
                                onClick={async () => {
                                  if (item?.doc_path) {
                                    dispatch(setIsLoading(true));
                                    await download(convertMediaUrl(item?.doc_path), item?.doc_path.split("/")[item?.doc_path.split("/")?.length - 1]);
                                    dispatch(setIsLoading(false));
                                  }
                                }}
                                sx={{
                                  marginRight: 1,
                                  background: "#046EB6",
                                  borderRadius: "20px",
                                  padding: !currentScreen?.isLG ? "4px 10px" : "8px 18px",
                                  fontSize: !currentScreen?.isLG ? "12px" : "14px",
                                  minWidth: !currentScreen?.isLG ? "auto" : "100px",
                                  whiteSpace: "nowrap",
                                  boxShadow: "none",
                                  "&:hover": {
                                    boxShadow: "none",
                                  },
                                }}
                                size="small"
                              >
                                Download
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<Eye />}
                                sx={{
                                  marginRight: 1,
                                  color: "#ffffff",
                                  background: "#1EB259",
                                  borderRadius: "20px",
                                  padding: !currentScreen?.isLG ? "4px 10px" : "8px 18px",
                                  fontSize: !currentScreen?.isLG ? "12px" : "14px",
                                  minWidth: !currentScreen?.isLG ? "auto" : "100px",
                                  border: "none",
                                  whiteSpace: "nowrap",
                                }}
                                size="small"
                                onClick={() => {
                                  if (item?.doc_path) {
                                    window.open(convertMediaUrl(item?.doc_path), "_blank");
                                  }
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          ) : null}
                        </TableRow>
                      ))
                  ) : (
                    <NoData text={"No Disclosures Available"} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {showGradient && (
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-b-2xl from-quaternary-200 via-quaternary-200/80 to-transparent pointer-events-none transition-opacity duration-300" />
            )}
          </div>
        </div>
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
