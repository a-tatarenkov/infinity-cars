import "./customerService.scss";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { fetchComments } from "../../../actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import Tooltip from "@mui/material/Tooltip";

const CustomerService = () => {
  const users = createSelector(
    (state) => state.users,
    (users) => {
      return { users };
    }
  );

  const userData = useSelector(users);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onPostMessage = (e) => {
    e.preventDefault();
    const messageToPost = {
      text,
      name: userData.users.currentUser[0].name,
      id: v4(),
      photo: userData.users.currentUser[0].photo,
    };

    request(
      "/reviews",
      "POST",
      JSON.stringify(messageToPost)
    )
      .then((res) => console.log(res, "Review Created"))
      .catch((err) => console.log(err));
    dispatch(fetchComments(request));
    setText("");
    setOpen(true);
  };

  return (
    <main className="customer_service">
      <h2 className="customer_service-info">
        If you have had experience buying or selling a car with us, <br /> Leave
        a message about us.
      </h2>

      <form onSubmit={(e) => onPostMessage(e)}>
        <TextField
          id="outlined-multiline-static"
          label="Your Comment"
          multiline
          rows={6}
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        {userData.users.login ? (
          <Button
            variant="outlined"
            type="submit"
          >
            Send
          </Button>
        ) : (
          <Tooltip title="Login to leave a comment" arrow>
            <Button variant="outlined">Send</Button>
          </Tooltip>
        )}
      </form>
      <DialogPopup
        title={"Message"}
        message={"Thank you for your time"}
        link1={"Close"}
        link2={"Main Page"}
        link1To={"/comment_about_us"}
        link2To={"/"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </main>
  );
};

export default CustomerService;
