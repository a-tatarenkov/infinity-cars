import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import "./carAccordion.scss";

const CarAccordion = () => {
  const compareCars = createSelector(
    (state) => state.data.compare,
    (compare) => {
      return {
        compare,
      };
    }
  );

  const { compare } = useSelector(compareCars);
  const keyObj = [];

  if (compare[0]) {
    for (const key in compare[0].details) {
      keyObj.push(key);
    }
  }

  return (
    <>
      {compare.length !== 0 ? (
        <div className="compare_accordion">
          {keyObj.map((item) => {
            return (
              <Accordion key={item} sx={{ background: "#071620" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordion_list">
                    <span className="tabs_name">{item}</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="list_items">
                  <ListOfData data={item} compare={compare} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

const ListOfData = (props) => {
  const { data, compare } = props;
  const keysArr = [];
  if (compare[0]) {
    for (const key in compare[0].details[data]) {
      keysArr.push(key);
    }
  }
  return (
    <>
      {keysArr.map((el, i) => {
        return (
          <Typography
            key={i * 0.33}
            component={"span"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="element_name">{el}</span>
            <span className="compared_items">
              {compare.map((item, i) => {
                return (
                  <i
                    key={compare.map((item) => item.id * i)}
                    className={"compared_info"}
                  >
                    {item.details[data][el] === true
                      ? "yes"
                      : item.details[data][el] === false
                      ? "no"
                      : item.details[data][el]}
                  </i>
                );
              })}
            </span>
          </Typography>
        );
      })}
    </>
  );
};

export default CarAccordion;
