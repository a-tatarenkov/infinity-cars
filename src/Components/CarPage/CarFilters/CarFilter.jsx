import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  brandFilter,
  modelFilter,
  yearFilter,
  bodyFilter,
  transmissionFilter,
  fuelFilter,
  driveTrainFilter,
  colorFilter,
  passengersFilter,
  priceFilter,
  onFilterReset,
  onPaginationChange,
  locationFilter,
} from "../../../actions";

import "./carFilter.scss";

const FullCarFilter = () => {
  const filterData = createSelector(
    (state) => state.filters,
    (state) => state.data.data,

    (filters, data) => {
      return {
        filters: filters,
        data,
      };
    }
  );

  const dispatch = useDispatch();
  const { filters, data } = useSelector(filterData);
  console.log(data);

  const brands = Array.from(new Set(data.map((item) => item.brand)));
  const models = data
    .filter((item) => item.brand === filters.brand)
    .map((item) => {
      return item.model;
    });
  const years = Array.from(new Set(data.map((item) => item.year + "")));
  const body = Array.from(new Set(data.map((item) => item.body)));
  const transmission = Array.from(
    new Set(data.map((item) => item.transmission))
  );
  const fuel = Array.from(new Set(data.map((item) => item.engine)));
  const driveTrain = Array.from(new Set(data.map((item) => item.driveUnit)));
  const pax = Array.from(new Set(data.map((item) => item.seats)));
  const color = Array.from(new Set(data.map((item) => item.color)));
  const location = Array.from(new Set(data.map((item) => item.location)));

  return (
    <aside className="filters">
      <h2>Filters</h2>

      <div className="filters-brand">
        <RadioSelect brands={brands} value={filters.brand} label="Brand" />
      </div>
      <div className="filters-model">
        <CheckBoxSelect
          data={models}
          setData={(_, v) => {
            dispatch(modelFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Model"
          action="model"
          filters={filters}
        />
      </div>
      <div className="filters-year">
        <CheckBoxSelect
          data={years}
          setData={(_, v) => {
            dispatch(onPaginationChange(10));
            dispatch(yearFilter(v));
          }}
          label="Year"
          action="year"
          filters={filters}
        />
      </div>
      <div className="filters-bodyType">
        <CheckBoxSelect
          data={body}
          setData={(_, v) => {
            dispatch(bodyFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Body Type"
          action="bodyType"
          filters={filters}
        />
      </div>
      <div className="filters-transmission">
        <CheckBoxSelect
          data={transmission}
          setData={(_, v) => {
            dispatch(transmissionFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Transmission"
          action="transmission"
          filters={filters}
        />
      </div>
      <div className="filters-fuel">
        <CheckBoxSelect
          data={fuel}
          setData={(_, v) => {
            dispatch(fuelFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Fuel Type"
          action="fuelType"
          filters={filters}
        />
      </div>
      <div className="filters-driveTrain">
        <CheckBoxSelect
          data={driveTrain}
          setData={(_, v) => {
            dispatch(driveTrainFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Drivetrain"
          action="driveTrain"
          filters={filters}
        />
      </div>
      <div className="filters-pax">
        <CheckBoxSelect
          data={pax}
          setData={(_, v) => {
            dispatch(passengersFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Passengers"
          action="passengers"
          filters={filters}
        />
      </div>
      <div className="filters-color">
        <CheckBoxSelect
          data={color}
          setData={(_, v) => {
            dispatch(colorFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Color"
          action="color"
          filters={filters}
        />
      </div>
      <div className="filters-color">
        <CheckBoxSelect
          data={location}
          setData={(_, v) => {
            dispatch(locationFilter(v));
            dispatch(onPaginationChange(10));
          }}
          label="Location"
          action="location"
          filters={filters}
        />
      </div>
      <div className="filters-priceRange">
        <PriceRange price={filters.price} />
      </div>

      <button
        onClick={(e) => dispatch(onFilterReset(e))}
        className="filters-reset"
      >
        Reset Filter
      </button>
    </aside>
  );
};

const CheckBoxSelect = ({ data, label, setData, filters, action }) => {
  const diss = data.length === 0 ? true : false;
  const labels = data.map((item) => ({ title: item }));

  const s = !Array.isArray(filters?.[action])
    ? []
    : labels.filter((a) => filters?.[action].some((b) => a.title === b.title));

  return (
    <Autocomplete
      multiple
      disabled={diss}
      value={s}
      id="check-box-select"
      options={labels}
      disableCloseOnSelect
      limitTags={2}
      defaultValue={s}
      onChange={setData}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
};

const RadioSelect = ({ brands, value, label }) => {
  const dispatch = useDispatch();
  return (
    <Autocomplete
      disablePortal
      id="brand-select"
      value={value}
      options={brands}
      onChange={(e, v) => {
        dispatch(brandFilter(v));
        dispatch(modelFilter(""));
        dispatch(onPaginationChange(10));
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

const PriceRange = ({ price }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setPriceRange(price);
    dispatch(onPaginationChange(10));
  }, [price, dispatch]);
  const [priceRange, setPriceRange] = useState(price);

  const handleChangePrice = (_, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box>
      <div>
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
        onMouseUp={() => dispatch(priceFilter(priceRange))}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default FullCarFilter;
