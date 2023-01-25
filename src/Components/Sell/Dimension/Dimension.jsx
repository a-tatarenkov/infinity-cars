import TextField from "@mui/material/TextField";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import "./dimension.scss";
import { sellLength, sellWidth, sellHeight, sellCargo } from "../../../actions";

const Dimension = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (brands) => {
      return { brands };
    }
  );

  const { brands } = useSelector(brandsData);
  const dispatch = useDispatch();

  return (
    <div className="dimension">
      <h3>Dimension</h3>

      <TextField
        value={brands.details.Dimension.Length}
        onInput={(e) => dispatch(sellLength(e.target.value))}
        className="length-select"
        required
        type={"number"}
        id="length-select"
        label="Length (mm)"
        variant="outlined"
        sx={{ width: "100%", background: "#152836" }}
      />

      <TextField
        value={brands.details.Dimension.Width}
        onInput={(e) => dispatch(sellWidth(e.target.value))}
        className="width-select"
        required
        id="width-select"
        type={"number"}
        label="Width (mm)"
        variant="outlined"
        sx={{ width: "100%", background: "#152836" }}
      />

      <TextField
        value={brands.details.Dimension.Height}
        onInput={(e) => dispatch(sellHeight(e.target.value))}
        className="height-select"
        required
        label="Height (mm)"
        type={"number"}
        variant="outlined"
        sx={{ width: "100%", background: "#152836" }}
      />

      <TextField
        value={brands.details.Dimension["Cargo Volume"]}
        onInput={(e) => dispatch(sellCargo(e.target.value))}
        className="volume-select"
        required
        type={"number"}
        label="Cargo Volume (l)"
        variant="outlined"
        sx={{ width: "100%", background: "#152836" }}
      />
    </div>
  );
};

export default Dimension;
