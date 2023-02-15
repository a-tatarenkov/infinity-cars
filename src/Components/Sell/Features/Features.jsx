import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import "./features.scss";
import { useEffect } from "react";

import {
  sellFutures,
  sellLocation,
  sellSetPrice,
  sellCity,
} from "../../../actions";

const Features = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.data,
    (brands, brandDataInfo) => {
      return { brands, brandDataInfo };
    }
  );
  const { brands, brandDataInfo } = useSelector(brandsData);
  const dispatch = useDispatch();

  const [features, setFeatures] = useState(brands.details.Futures);
  const onStateChange = (e) => {
    setFeatures((prevState) => ({
      ...prevState,
      [e.target.value]: e.target.checked,
    }));
  };
  useEffect(() => {
    dispatch(sellFutures(features));
  }, [features, dispatch]);

  return (
    <div className="features">
      <h3>Features</h3>
      <ul className="features-list">
        {Object.keys(brands.details.Futures).map((item) => (
          <li key={item} className="features-list-item">
            <FormControlLabel
              value={item}
              control={
                <Checkbox
                  checked={brands.details.Futures[item]}
                  onChange={(e) => {
                    onStateChange(e);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={item}
              labelPlacement="end"
            />
          </li>
        ))}
      </ul>

      <div className="features-locations">
        <Autocomplete
          disablePortal
          id="car-location"
          value={brands.location}
          options={Object.keys(brandDataInfo.brands.locations)}
          onChange={(e, v) => dispatch(sellLocation(v))}
          sx={{ width: "49%" }}
          renderInput={(params) => (
            <TextField {...params} label="Location" required={true} />
          )}
        />
        <Autocomplete
          disablePortal
          id="car-city"
          disabled={brands.location === null ? true : false}
          value={brands.city}
          options={
            brands.location
              ? Object.values(brandDataInfo.brands.locations[brands.location])
                  .map((item) => Object.keys(item) || {})
                  .flat()
              : []
          }
          onChange={(e, v) => dispatch(sellCity(v))}
          sx={{ width: "49%" }}
          renderInput={(params) => (
            <TextField {...params} label="City" required={true} />
          )}
        />
      </div>

      <TextField
        value={brands.price}
        onChange={(e) => dispatch(sellSetPrice(e.target.value))}
        id="car-price"
        required
        label="Price ($)"
        variant="outlined"
        sx={{ width: "100%" }}
      />
    </div>
  );
};

export default Features;
