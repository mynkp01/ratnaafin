"use client";
import { AccordionIcon } from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { Accordion, AccordionDetails, AccordionSummary, Box, FormGroup } from "@mui/material";
import Image from "next/image";
import { memo, useState } from "react";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Comp = ({ item, index, expanded, handleChange }) => {
  return (
    <Accordion
      key={item._id}
      expanded={expanded === index}
      onChange={handleChange(index)}
      sx={{
        mb: 0,
        mt: expanded === index && index > 0 ? "0 !important" : undefined,
        background: "none",
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        sx={{
          margin: 0,
          borderTop: expanded === index && index > 0 ? "1px solid #D1D1D1" : "none",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-90deg)",
          },
        }}
        expandIcon={<AccordionIcon className="text-black w-4" />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <p className="sm:text-lg font-semibold text-quinary-100">{item.question}</p>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <div className="text-sm sm:text-base text-tertiary-500" dangerouslySetInnerHTML={{ __html: item?.answer }}></div>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      className={`w-full sm:py-0 ${index === 1 ? "" : "h-auto"}`}
    >
      {value === index && <Box className="">{children}</Box>}
    </div>
  );
}

function Faq({ payload }) {
  const currentScreen = useSelector(selectScreen);
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 flex flex-col gap-4">
        <div className="col-span-3 flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Frequently Asked Questions</h3>
            <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
              Find answers to common questions about our products and services. Get the information you need quickly and easily.
            </p>
          </div>
          {!currentScreen?.isLG ? (
            <div className="col-span-2">
              <Image
                loading="lazy"
                src={payload?.image}
                width={500}
                height={500}
                alt={payload?.alt}
                className="rounded-2xl w-full h-full object-cover object-center"
              />
            </div>
          ) : null}
          <div>
            <Box className="flex flex-col">
              <div className="flex w-full flex-col overflow-hidden">
                <TabPanel value={0} index={0}>
                  {payload?.data?.map((item, index) => (
                    <Comp key={index} item={item} index={index} expanded={expanded} handleChange={handleChange} />
                  ))}
                </TabPanel>
              </div>
            </Box>
          </div>
        </div>
        {currentScreen?.isLG ? (
          <div className="col-span-2">
            <Image loading="lazy" src={payload?.image} width={500} height={500} alt={payload?.alt} className="rounded-2xl w-full  object-cover object-center" />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default memo(Faq);
