"use client";
import { AccordionIcon } from "@/assets";
import { Accordion, AccordionDetails, AccordionSummary, Box, FormGroup } from "@mui/material";
import { memo, useState } from "react";

interface FAQ {
  question: string;
  answer: string;
  order: number;
}

interface BlogFAQProps {
  faqs: FAQ[];
}

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

function BlogFAQ({ faqs }: BlogFAQProps) {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  if (!faqs || faqs.length === 0) return null;

  const sortedFaqs = faqs.sort((a, b) => a.order - b.order);
  return (
    <>
      <div className="flex flex-col gap-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Frequently Asked Questions</h3>
        <div>
          <Box className="flex flex-col">
            <div className="flex w-full flex-col overflow-hidden">
              <TabPanel value={0} index={0}>
                {sortedFaqs?.map((item, index) => (
                  <Comp key={index} item={item} index={index} expanded={expanded} handleChange={handleChange} />
                ))}
              </TabPanel>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default memo(BlogFAQ);
