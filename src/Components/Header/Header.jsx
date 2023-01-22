import "./header.scss";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conditionFilter, onFilterReset } from "../../actions";
import { createSelector } from "reselect";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Header = () => {
  const filtersData = createSelector(
    (state) => state.filters,
    (filters) => {
      return {
        filters: filters,
      };
    }
  );

  const dispatch = useDispatch();
  const filteredData = useSelector(filtersData);

  const style = {
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: "2",
  };

  return (
    <header
      style={window.location.pathname === "/" || "/compare" ? style : null}
    >
      <nav>
        <ul className="header-links">
          <li>
            <Link
              to="/"
              className="header-logo"
              onClick={() => dispatch(onFilterReset())}
            ></Link>
          </li>
          <li>
            <Link
              style={
                window.location.pathname === "/car_search_results" &&
                filteredData.filters.condition === true
                  ? { color: "#007cc7" }
                  : { color: "inherit" }
              }
              to="/car_search_results"
              onClick={() => dispatch(conditionFilter(true))}
            >
              New Cars
            </Link>
          </li>

          <li>
            <Link
              style={
                window.location.pathname === "/car_search_results" &&
                filteredData.filters.condition === false
                  ? { color: "#007cc7" }
                  : { color: "inherit" }
              }
              to="/car_search_results"
              onClick={() => dispatch(conditionFilter(false))}
            >
              Used Cars
            </Link>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#007cc7" : "inherit",
              })}
              to="/compare"
            >
              Compare
            </NavLink>
          </li>
          <li>
            <Link to="/">Sell</Link>
          </li>
          <li>
            <ArticleSelect />
          </li>
        </ul>
      </nav>
      <ul className="active-header">
        <li>
          <button className="login-button">Sign In</button>
        </li>
        <li className="lang-selection-icon">
          <select name="lang" id="language" className="lang-selection">
            <option value="uk">ENG</option>
            <option value="ua">UA</option>
          </select>
        </li>
      </ul>
    </header>
  );
};

const ArticleSelect = () => {
  const [article, setArticle] = useState("");

  const handleChange = (event) => {
    setArticle(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: 'max-content',
        border: "none",
        fontFamily: "inherit",
        fontWeight: "inherit",
        fontSize: "inherit",
      }}
      size="small"
    >
      <Select
        value={article}
        onChange={handleChange}
        displayEmpty
        sx={{
          border: "none",
          fontFamily: "inherit",
          fontWeight: "inherit",
          fontSize: "inherit",
        }}
        variant="standard"
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem
          value=""
          sx={{
            border: "none",
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
          }}
        >
          <span>Article</span>
        </MenuItem>
        <MenuItem value={"news"}>
          <Link>News</Link>
        </MenuItem>
        <MenuItem value={"reviews"}>
          <Link>Car Review</Link>
        </MenuItem>
        <MenuItem value={"faq"}>
          <Link>FAQ</Link>
        </MenuItem>
        <MenuItem value={"about"}>
          <Link to={'/about_us'}>About Us</Link>
        </MenuItem>
        <MenuItem value={"contacts"}>
          <Link to={"/contacts"}>Contacts</Link>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Header;
