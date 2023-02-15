import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormLabel from "@mui/material/FormLabel";

import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import {
  sellBrand,
  sellModel,
  sellBody,
  sellTitle,
  sellYear,
  sellPax,
  sellColor,
  sellCondition,
  sellDescription,
} from "../../../actions";
import "./carDetails.scss";

const CarDetails = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.data,
    (brands, brandDataInfo) => {
      return { brands, brandDataInfo };
    }
  );

  const { brands, brandDataInfo } = useSelector(brandsData);
  const dispatch = useDispatch();

  const brandsList = Object.keys(brandDataInfo.brands.brands);

  return (
    <div className="car_details">
      <h3>Car Details</h3>

      <TextField
        className="title-text"
        required
        id="outlined-basic"
        label="Title (limit is 10 characters)"
        value={brands.label}
        onChange={(e) => dispatch(sellTitle(e.target.value))}
        variant="outlined"
        sx={{ width: "100%", background: "#152836", height: 55 }}
      />

      <Autocomplete
        className="body-select"
        disablePortal
        value={brands.body}
        onChange={(e, v) => {
          dispatch(sellBody(v));
        }}
        id="sell-body"
        options={brandDataInfo.brands.bodyType}
        sx={{ width: "100%", height: 55, background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Body Type" required={true} />
        )}
      />
      <Autocomplete
        disablePortal
        className="brand-select"
        value={brands.brand}
        id="sell-brand"
        onChange={(e, v) => {
          dispatch(sellBrand(v));
          dispatch(sellModel(null));
        }}
        options={brandsList}
        sx={{ width: "100%", height: 55, background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Brand" required={true} />
        )}
      />
      <Autocomplete
        disablePortal
        className="year-select"
        value={brands.details["Car Details"].Year}
        id="sell-year"
        onChange={(e, v) => {
          dispatch(sellYear(v));
        }}
        options={brandDataInfo.brands.year.sort((a, b) => a - b)}
        sx={{ width: "100%", height: 55, background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Year" required={true} />
        )}
      />
      <TextField
        className="pass-select"
        id="outlined-basic"
        label="Passenger Capacity"
        required
        value={brands.seats.slice(0, -7)}
        onChange={(e) => dispatch(sellPax(e.target.value))}
        variant="outlined"
        type={"number"}
        sx={{ width: "100%", height: 55, background: "#152836" }}
      />

      <div className="condition-select">
        <FormLabel id="condition">Condition</FormLabel>
        <RadioGroup
          value={brands.condition}
          onChange={(e) => {
            e.target.value === "true"
              ? dispatch(sellCondition(true))
              : dispatch(sellCondition(false));
          }}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="New" />
          <FormControlLabel value={false} control={<Radio />} label="Used" />
        </RadioGroup>
      </div>

      <Autocomplete
        className="model-select"
        disablePortal
        id="sell-model"
        disabled={brands.brand === null ? true : false}
        value={brands.model}
        onChange={(e, v) => {
          dispatch(sellModel(v));
        }}
        options={brandDataInfo.brands.brands[brands.brand] || []}
        sx={{ width: "100%", height: 55, background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Model" required={true} />
        )}
      />
      <Autocomplete
        disablePortal
        className="color-select"
        id="sell-color"
        value={brands.color}
        onChange={(e, v) => dispatch(sellColor(v))}
        options={brandDataInfo.brands.colors.sort()}
        sx={{ width: "100%", height: 55, background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Exterior Color" required={true} />
        )}
      />

      <textarea
        value={brands.description}
        required
        className="description-select"
        onChange={(e) => dispatch(sellDescription(e.target.value))}
        cols="30"
        rows="8"
        placeholder="Write description about your car"
      ></textarea>
    </div>
  );
};

export default CarDetails;
