import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import "./engineDetails.scss";
import {
  sellFuel,
  sellDriveTrain,
  sellMilage,
  sellEngineCapacity,
  sellTransmission,
  sellEnginePower,
} from "../../../actions";

const EngineDetails = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.data,
    (brands, brandDataInfo) => {
      return { brands, brandDataInfo };
    }
  );
  const { brands, brandDataInfo } = useSelector(brandsData);
  const dispatch = useDispatch();

  return (
    <div className="engine_details">
      <h3>Engine Details</h3>

      <Autocomplete
        className="fuel-select"
        value={brands.engine}
        onChange={(e, v) => dispatch(sellFuel(v))}
        disablePortal
        id="fuel-select"
        options={brandDataInfo.brands.fuelType}
        sx={{ width: "100%", background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Fuel Type" required={true} />
        )}
      />

      <Autocomplete
        className="drive-select"
        value={brands.driveUnit}
        disablePortal
        onChange={(e, v) => dispatch(sellDriveTrain(v))}
        id="drive-select"
        options={brandDataInfo.brands.drive}
        sx={{ width: "100%", background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Drive Train" required={true} />
        )}
      />

      <TextField
        value={brands.details.Engine.Mileage.slice(0,-3)}
        onChange={(e) => dispatch(sellMilage(e.target.value))}
        sx={{ background: "#152836" }}
        id="milage-select"
        label="Mileage (km)"
        type={"number"}
        variant="outlined"
        required
        className="milage-select"
      />

      <TextField
        sx={{ background: "#152836" }}
        value={brands.details.Engine["Engine Capacity"].slice(0,-3)}
        onChange={(e) => dispatch(sellEngineCapacity(e.target.value))}
        className="engine-select"
        id="engine-select"
        type={"number"}
        required
        label="Engine Capacity (cc)"
        variant="outlined"
      />

      <Autocomplete
        className="transmission-select"
        value={brands.details.Engine.Transmission}
        onChange={(e, v) => dispatch(sellTransmission(v))}
        disablePortal
        id="transmission-select"
        options={brandDataInfo.brands.transmission}
        sx={{ width: "100%", background: "#152836" }}
        renderInput={(params) => (
          <TextField {...params} label="Transmission" required={true} />
        )}
      />

      <TextField
        sx={{ background: "#152836" }}
        value={brands.details.Engine.Power.slice(0,-3)}
        onChange={(e) => dispatch(sellEnginePower(e.target.value)) || ""}
        className="power-select"
        id="power-select"
        type={"number"}
        label="Power (hp)"
        variant="outlined"
        required
      />
    </div>
  );
};

export default EngineDetails;
