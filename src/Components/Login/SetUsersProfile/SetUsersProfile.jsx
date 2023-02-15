import "./setUsersProfile.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useHttp } from "../../../hooks/http.hook";
import {
  userDataChanged,
  currentUserLogged,
  fetchUsers,
} from "../../../actions";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

const SetUsersProfile = () => {
  const [edit, setEdit] = useState(false);
  const usersData = JSON.parse(localStorage.getItem("user"))[0];

  return (
    <div className="users_profile">
      <h3 className="users_profile-title">Your Profile</h3>

      <div>
        <div
          className={"profile"}
          style={edit ? { display: "none" } : { display: "flex" }}
        >
          <img
            src={usersData.photo}
            alt="usersImage"
            style={{ height: 100, width: 250, objectFit: "contain", borderRadius: '4px' }}
          />
          <span>Name:&nbsp; {usersData.name} </span>
          <span>Phone:&nbsp; {usersData.phone} </span>
          <span>Email:&nbsp; {usersData.email} </span>
          <span>Password:&nbsp; {usersData.password} </span>
          <Button onClick={() => setEdit(true)} className="onSubmitUser">
            Edit profile
          </Button>
        </div>

        {edit ? <EditProfile setEdit={setEdit} user={usersData} /> : null}
      </div>
    </div>
  );
};

const EditProfile = (props) => {
  const users = createSelector(
    (state) => state.users,
    (users) => {
      return {
        users,
      };
    }
  );
  const usersData = useSelector(users);
  const { name, phone, email, password, id, isAdmin, photo } = props.user;
  const [images, setImage] = useState(photo);
  const onSetImages = (img) => {
    setImage(img);
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    onSetImages(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        onSetImages();
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const { request } = useHttp();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPass, setUserPass] = useState(password);
  const [userPhone, setUserPhone] = useState(phone);

  const onSaveChanges = (e) => {
    e.preventDefault();
    const newUser = {
      id: id,
      photo: images,
      name: userName,
      email: userEmail,
      password: userPass,
      likedCars: usersData.users.currentUser[0].likedCars,
      messages: usersData.users.currentUser[0].messages,
      phone: userPhone,
      isAdmin: isAdmin ? true : false,
    };

    request(`/users/${id}`, "PUT", JSON.stringify(newUser))
      .then((res) => console.log(res, "User Changed"))
      .then(
        dispatch(userDataChanged(newUser)),
        localStorage.setItem("user", JSON.stringify([newUser]))
      )
      .catch((err) => console.log(err));
    dispatch(currentUserLogged([newUser]));
    dispatch(fetchUsers(request));

    props.setEdit(false);
  };

  return (
    <div className="change_users_info">
      <form name="profile_edit" onSubmit={(e) => onSaveChanges(e)}>
        Name
        <TextField
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type={"text"}
          id="name_Change"
          variant="outlined"
          sx={{ width: "100%", background: "#152836" }}
        />
        Email
        <TextField
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          type={"text"}
          id="email_Change"
          variant="outlined"
          sx={{ width: "100%", background: "#152836" }}
        />
        Phone
        <TextField
          required
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          type={"text"}
          id="phone_Change"
          variant="outlined"
          sx={{ width: "100%", background: "#152836" }}
        />
        Password
        <TextField
          required
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          type={"text"}
          id="password_Change"
          variant="outlined"
          sx={{ width: "100%", background: "#152836" }}
        />
        <div className="photo_select">
          {images === undefined ? (
            <label>
              <input
                type="file"
                required={images === undefined ? true : false}
                onChange={(e) => {
                  uploadImage(e);
                }}
                className="file_profile_select"
              />
            </label>
          ) : (
            <>
              <img src={images} alt={"users"} />
              <button onClick={() => setImage(undefined)}></button>
            </>
          )}
        </div>
        <ButtonGroup style={{ display: "flex" }} >
          <Button type="submit" className="onSubmitUser">
            Save
          </Button>
          <Button onClick={() => props.setEdit(false)} className="onSubmitUser">
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default SetUsersProfile;
