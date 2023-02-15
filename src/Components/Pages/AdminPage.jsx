import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import AdminPanel from "../Login/AdminPanel/AdminPanel";
import UserPanel from "../Login/UserPanel/UserPanel";

const AdminPage = () => {
  const users = createSelector(
    (state) => state.users,
    (users) => {
      return {
        users: users.currentUser,
      };
    }
  );
  const usersData = useSelector(users);
  console.log(usersData);

  return (
    <>
      {usersData.users[0] && usersData.users[0].isAdmin ? <AdminPanel /> : <UserPanel />}
    </>
  );
};

export default AdminPage;
