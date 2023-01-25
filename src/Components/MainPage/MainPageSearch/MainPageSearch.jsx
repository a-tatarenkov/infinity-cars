import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  fetchCars,
  conditionFilter,
  brandFilter,
  modelFilter,
  priceFilter,
  locationFilter,
  termFilter,
  fetchBrandsData
} from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import "./mainPageSearch.scss";

const MainPageSearch = () => {
  const filteredBransLocationSelector = createSelector(
    (state) => state.cars.cars,
    (state) => state.filters,
    (cars, filters) => {
      return {
        cars,
        brand: cars.map((item) => item.brand),
        location: cars.map((item) => item.location),
        filters: filters,
      };
    }
  );

  const filteredData = useSelector(filteredBransLocationSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchCars(request));
    dispatch(fetchBrandsData(request));

    // eslint-disable-next-line
  }, []);

  const brands = Array.from(new Set(filteredData.brand));
  const locations = Array.from(new Set(filteredData.location));
  const models = filteredData.cars
    .filter((item) => item.brand === filteredData.filters.brand)
    .map((item) => {
      return item.model;
    });

  const [priceRange, setPriceRange] = useState([0, 300000]);

  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
    dispatch(priceFilter(newValue));
  };

  const navigate = useNavigate();
  const goTo = (e) => {
    e.preventDefault();
    navigate("/car_search_results");
  };

  return (
    <div className="main_search_panel">
      <div className="main_search_panel-radio">
        <label
          htmlFor="all"
          className={
            filteredData.filters.condition === "" ? `active-label` : ""
          }
        >
          All
        </label>
        <input
          type="radio"
          id="all"
          name="condition"
          value=""
          defaultChecked
          onClick={() => dispatch(conditionFilter(""))}
        />
        <label
          htmlFor="new"
          className={
            filteredData.filters.condition === true ? `active-label` : ""
          }
        >
          New
        </label>
        <input
          type="radio"
          id="new"
          name="condition"
          onClick={() => dispatch(conditionFilter(true))}
        />
        <label
          htmlFor="used"
          className={
            filteredData.filters.condition === false ? `active-label` : ""
          }
        >
          Used
        </label>
        <input
          type="radio"
          id="used"
          name="condition"
          onClick={() => dispatch(conditionFilter(false))}
        />
      </div>
      <div className="main_search_panel-brand">
        <Autocomplete
          className="main_search_panel-brand-inner"
          disablePortal
          id="brand-select"
          value={filteredData.filters.brand}
          options={brands}
          onChange={(e, v) => {
            dispatch(brandFilter(v));
          }}
          renderInput={(params) => <TextField {...params} label={"Brands"} />}
        />
      </div>
      <div className="main_search_panel-model">
        <SelectDataForms
          data={models}
          label={"Model"}
          clazz="main_search_panel-model-inner"
          setData={(e, v) => dispatch(modelFilter(v))}
        />
      </div>
      <div className="main_search_panel-search">
        <Paper
          className="main_search_panel-search-inner"
          component="form"
          onSubmit={(e) => goTo(e)}
          sx={{
            color: "white",
            backgroundColor: "#152836",
          }}
        >
          <SearchIcon />
          <InputBase
            onChange={(e) => dispatch(termFilter(e))}
            value={filteredData.filters.term}
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search"
            type="search"
          />
        </Paper>
      </div>
      <div className="main_search_panel-location">
        <SelectDataForms
          data={locations}
          label={"Location"}
          clazz="main_search_panel-location-inner"
          setData={(e, v) => dispatch(locationFilter(v))}
        />
      </div>
      <div className="main_search_panel-range">
        <Box className="main_search_panel-range-inner">
          <div className="main_search_panel-range-inner-price">
            <span>Price Range</span>
            <div>
              <span>${priceRange[0]}</span>-<span>${priceRange[1]}</span>
            </div>
          </div>
          <Slider
            value={priceRange}
            min={0}
            max={300000}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
      <div className="main_search_panel-button">
        <Link to={"/car_search_results"}>Search</Link>
      </div>
    </div>
  );
};

const SelectDataForms = ({ data, label, setData, clazz }) => {
  const diss = data.length === 0 ? true : false;

  return (
    <Autocomplete
      className={clazz}
      multiple
      disabled={diss}
      id="check-box-select"
      options={data.map((item) => ({ title: item }))}
      disableCloseOnSelect
      onChange={setData}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option.title}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default MainPageSearch;
