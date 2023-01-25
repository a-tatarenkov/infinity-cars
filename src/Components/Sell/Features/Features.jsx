import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import "./features.scss";
import { useEffect } from "react";

import { sellFutures, sellLocation, sellSetPrice } from "../../../actions";

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

  const [features, setFeatures] = useState(brandDataInfo.brands.features);

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
        {Object.keys(brandDataInfo.brands.features).map((item) => (
          <li key={item} className="features-list-item">
            <FormControlLabel
              value={item}
              control={
                <Checkbox
                  onClick={(e) => {
                    onStateChange(e);
                  }}
                />
              }
              label={item}
              labelPlacement="end"
            />
          </li>
        ))}
      </ul>

      <Autocomplete
        disablePortal
        id="car-location"
        value={brands.location}
        options={brandDataInfo.brands.locations}
        onChange={(e, v) => dispatch(sellLocation(v))}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Location" required={true} />}
      />
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
