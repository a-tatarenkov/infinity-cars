import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { v4 } from "uuid";
import "./carAccordion.scss";

const CarAccordion = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [arrIndex, setArrIndex] = useState(null);
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
  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="compare_accordion">
      {compare.length !== 0 ? (
        <div>
          {keyObj.map((item) => {
            return (
              <Accordion key={v4()} sx={{ background: "#071620" }}>
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
      {compare.length !== 0 ? (
        <Accordion sx={{ background: "#071620" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="accordion_list">
              <span className="tabs_name">Images</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="list_items">
            <div className="compare_images">
              {compare.map((items, index) => (
                <div className="compare_images-images" key={v4()}>
                  {items.src.map((item, i) => {
                    return (
                      <div key={v4()}>
                        <img
                          src={item}
                          width={170}
                          height={170}
                          style={{
                            objectFit: "cover",
                            borderRadius: 3,
                            cursor: "zoom-in",
                          }}
                          alt="cars"
                          onClick={() => {
                            setArrIndex(index);
                            openImageViewer(i);
                          }}
                        />
                        {isViewerOpen && (
                          <ImageViewer
                            src={compare[arrIndex].src}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                            backgroundStyle={{
                              backgroundColor: "rgba(0,0,0,0.9)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
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
            key={v4()}
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
                  <i key={v4()} className={"compared_info"}>
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
