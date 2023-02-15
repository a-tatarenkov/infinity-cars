import "./page404.scss";
import page404Image from "../../assets/404.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
const Page404 = () => {
  return (
    <main className="page404">
      <div className="page404-inner">
        <span className="first">4</span>
        <img src={page404Image} alt="" />
        <span className="second">4</span>
      </div>
      <div className="page404-links">
        Something went wrong
        <Button variant="outlined">
        <HomeIcon />  <Link to={"/"}>Main Page</Link>
        </Button>
      </div>
    </main>
  );
};

export default Page404;
