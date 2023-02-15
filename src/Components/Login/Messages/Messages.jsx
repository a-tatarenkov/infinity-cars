import { useEffect, useState } from "react";
import "./messages.scss";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";

const Messages = (props) => {
  const users = createSelector(
    (state) => state.users,
    (state) => state.data,
    (users, data) => {
      return {
        users,
        data: data.data,
      };
    }
  );

  const dispatch = useDispatch();
  const usersData = useSelector(users);

  const [fullMessage, setFullMessage] = useState(null);
  const [messageID, setMessageID] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const { request } = useHttp();
  const { messages } = props;

  const onSendMessage = () => {
    const currentMessage = messages.filter((item) => item.id === messageID);

    const userTo = usersData.users.users.filter(
      (user) => user.id === currentMessage[0].from.id
    );

    const userFrom = usersData.users.users.filter(
      (user) => user.id === currentMessage[0].to
    );

    const messageTO =
      usersData.users.currentUser[0].id === currentMessage[0].from.id
        ? userFrom
        : userTo;

    const messageFromYou = {
      text: textMessage,
      id: usersData.users.currentUser[0].id,
    };

    const msIndexCurrent = usersData.users.currentUser[0].messages.indexOf(
      currentMessage[0]
    );

    usersData.users.currentUser[0].messages[msIndexCurrent].text = [
      ...usersData.users.currentUser[0].messages[msIndexCurrent].text,
      messageFromYou,
    ];

    messageTO[0].messages[msIndexCurrent].open = false;
    messageTO[0].messages[msIndexCurrent].text = [
      ...messageTO[0].messages[msIndexCurrent].text,
      messageFromYou,
    ];

    request(
      `/users/${messageTO[0].id}`,
      "PUT",
      JSON.stringify(messageTO[0])
    ).catch((err) => console.log(err));

    // message to you from you
    request(
      `/users/${usersData.users.currentUser[0].id}`,
      "PUT",
      JSON.stringify(usersData.users.currentUser[0])
    ).catch((err) => console.log(err));
    localStorage.setItem(
      "user",
      JSON.stringify(usersData.users.currentUser[0])
    );
    // message to user from you

    dispatch(fetchUsers(request));
    setTextMessage("");
  };

  const onSetOpenMessage = (id) => {
    const currentMessage = messages.filter((item) => item.id === id)[0];
    if (currentMessage.open === false) {
      currentMessage.open = true;
      request(
        `/users/${usersData.users.currentUser[0].id}`,
        "PUT",
        JSON.stringify(usersData.users.currentUser[0])
      ).catch((err) => console.log(err));
      dispatch(fetchUsers(request));
    } else {
      return;
    }
  };

  return (
    <>
      {messages.length === 0 ? (
        <span className="admin_panel-info_items-list-no_car">
          You have no messages
        </span>
      ) : (
        <div className="messages_box">
          <div className="messages_box-left">
            {messages.length === 0
              ? "You have no messages"
              : messages.map((message, i) => {
                  const { name, open } = message;
                  return (
                    <div
                      key={uuidv4()}
                      className={
                        fullMessage === i
                          ? "messages_box-from expanded"
                          : "messages_box-from"
                      }
                      onClick={() => {
                        setMessageID(message.id);
                        setFullMessage(i);
                        onSetOpenMessage(message.id);
                      }}
                    >
                      {!open ? <span className="new_message"> </span> : null}

                      <span> {name}</span>
                    </div>
                  );
                })}
          </div>

          <div className="messages_box-right">
            {messages.length === 0
              ? "You have no messages"
              : messages.map((message, i) => {
                  const { name, subject, car, carId } = message;
                  return (
                    <div
                      key={uuidv4()}
                      className={
                        fullMessage === i
                          ? "user_messages_wrapper open"
                          : "user_messages_wrapper"
                      }
                    >
                      {fullMessage === i ? (
                        <div
                          className={
                            fullMessage === i
                              ? "user_messages active_message"
                              : "user_messages"
                          }
                        >
                          <div className="user_messages-title">
                            <span>{subject}</span>
                            <span>{car}</span>
                            <CarImage carId={carId} cars={usersData.data} />
                          </div>

                          <div
                            className="user_messages-message"
                            style={{ overflow: "scroll" }}
                          >
                            {messages[i].text.map((item) => {
                              return item.id ===
                                usersData.users.currentUser[0].id ? (
                                <span key={uuidv4()} className="message_to">
                                  {item.text}
                                </span>
                              ) : (
                                <span key={uuidv4()} className="message_from">
                                  {name}: {item.text}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
            <div
              className="send_message"
              style={fullMessage !== null ? { opacity: 1 } : { opacity: 0 }}
            >
              <input
                type="text"
                required
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSendMessage();
                  }
                  return;
                }}
              />
              <button
                onClick={() => {
                  onSendMessage();
                }}
              >
                <SendIcon fontSize="large" color="primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CarImage = (props) => {
  const { carId, cars } = props;

  const currentCar = () => {
    const currentCar = cars.filter((item) => item.id === carId)[0];
    return currentCar.src[0];
  };
  const car = currentCar();

  return <img src={car} alt="car" />;
};

export default Messages;
