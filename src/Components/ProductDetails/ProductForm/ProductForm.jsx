import "./productForm.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import { v4 as uuidv4 } from "uuid";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";

const FullCarForm = (props) => {
  const { sellerId, model, brand } = props;

  const users = createSelector(
    (state) => state.users,
    (users) => {
      return {
        users,
      };
    }
  );
  const usersData = useSelector(users);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchUsers(request));
    // eslint-disable-next-line
  }, []);

  const messageTo = () => {
    const userId =
      sellerId === undefined || sellerId === ""
        ? 1
        : usersData.users.users.filter((user) => user.id === sellerId)[0].id;
    return userId;
  };

  const idTo = messageTo();

  const messageFrom = () => {
    const user =
      usersData.users.currentUser === null
        ? { id: 1 }
        : {
            id: usersData.users.currentUser[0].id,
          };
    return user;
  };

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    const messageID = uuidv4();
    const textTo = usersData.users.users.filter((user) => user.id === idTo)[0];

    const messageFromYou = {
      id: messageID,
      name,
      email,
      phone,
      subject,
      open: false,
      text: [{ text, id: usersData.users.currentUser[0].id }],
      car: `${brand}  ${model}`,
      carId: props.id,
      from: messageFrom(),
      to: messageTo(),
    };

    const messageToYou = {
      id: messageID,
      name: textTo.name,
      email,
      phone,
      subject,
      open: true,
      text: [{ text, id: usersData.users.currentUser[0].id }],
      car: `${brand}  ${model}`,
      carId: props.id,
      from: messageFrom(),
      to: messageTo(),
    };

    // message from you to you

    usersData.users.currentUser[0].messages = [
      ...usersData.users.currentUser[0].messages,
      messageToYou,
    ];

    // message from you to user

    textTo.messages = [...textTo.messages, messageFromYou];

    request(
      `/users/${usersData.users.currentUser[0].id}`,
      "PUT",
      JSON.stringify(usersData.users.currentUser[0])
    ).catch((err) => console.log(err));

    request(
      `/users/${idTo}`,
      "PUT",
      JSON.stringify(textTo)
    ).catch((err) => console.log(err));

    dispatch(fetchUsers(request));

    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setText("");
    setOpen(true);
  };

  return (
    <>
      {sellerId &&
      usersData.users.login &&
      usersData.users.currentUser[0].id === sellerId ? null : (
        <div className="full_car_form">
          <h3>Contact</h3>
          <form
            onSubmit={(e) => {
              onSendMessage(e);
            }}
          >
            <div className="form_top">
              <div className="input_box_left">
                <TextField
                  id="for_name"
                  value={name}
                  label="Name"
                  type={"text"}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="for_email"
                  value={email}
                  type={"email"}
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_box_right">
                <TextField
                  id="for_phone"
                  type={"number"}
                  value={phone}
                  label="Phone"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />

                <FormControl fullWidth>
                  <InputLabel id="subject">Subject</InputLabel>
                  <Select
                    sx={{ background: "#152836" }}
                    labelId="subject"
                    id="subject"
                    value={subject}
                    label="Subject"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Price"}>Price discus</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <TextField
              id="for_comment"
              label="Leave a comment here"
              sx={{ background: "#152836", marginTop: 1 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              multiline
              rows={5}
            />
            <input
              type="submit"
              value={sellerId ? "Contact Seller" : "Contact Dealer"}
              className={
                usersData.users.login
                  ? `submit_input`
                  : "submit_input submit_input_fade"
              }
              disabled={usersData.users.login ? false : true}
            />
            <DialogPopup
              open={open}
              link1={"Close"}
              title={"Contact Dealer"}
              message={"Your message sent, await for reply"}
              onClose={() => setOpen(false)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default FullCarForm;
