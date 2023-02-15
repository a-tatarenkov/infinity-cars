import * as React from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import "./dialogWindow.scss";

export const DialogPopup = (props) => {

  const { title, message } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box className={"modal_box"}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>
            <div className="buttons_group">
              <Button
                variant="outlined"
                onClick={props.onClose}
                sx={{ background: "#007cc7" }}
              >
                <Link to={props.link1To}>{props.link1}</Link>
              </Button>
              {props.link2 ? (
                <Button
                  variant="outlined"
                  onClick={props.onClose}
                  sx={{ background: "#007cc7" }}
                >
                  <Link to={props.link2To}>{props.link2}</Link>
                </Button>
              ) : null}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
