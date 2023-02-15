import "./faqAccordion.scss";
import staticData from "../../../../data/staticData";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQAccordion = () => {
  const [select, setSelect] = useState("Car");

  const objKeys = [];

  for (const key in staticData.faq[select]) {
    objKeys.push(key);
  }

  return (
    <div className="faq_accordion">
      <h2>FREQUENTLY ASKED QUESTION</h2>

      <div className="faq_accordion-wrapper">
        <div className="faq_accordion-wrapper-select">
          {Object.keys(staticData.faq).map((item) => (
            <button
              key={item}
              style={
                select === item
                  ? { color: "#007CC7", borderBottom: "1px solid #007CC7" }
                  : { borderBottom: "1px solid transparent" }
              }
              onClick={() => setSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="faq_accordion-wrapper-accordion">
          {objKeys.map((item, i) => (
            <Accordion key={item} sx={{ background: "#071620", width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header-faq"
              >
                <Typography className="accordion_list_faq">
                  <span className="tabs_name">{item} </span>
                </Typography>
              </AccordionSummary>

              <AccordionDetails className="list_items_faq">
                {staticData.faq[select][objKeys[i]]}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
