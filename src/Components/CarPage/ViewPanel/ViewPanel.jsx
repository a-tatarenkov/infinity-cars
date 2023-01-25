import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { onViewFilterState, onSortFilter, termFilter } from "../../../actions";
import "./viewPanel.scss";

const ViewPanel = () => {
  const filterData = createSelector(
    (state) => state.cars.cars,
    (state) => state.filters,
    (cars, filters) => {
      return {
        cars,
        filters: filters,
      };
    }
  );

  const dispatch = useDispatch();
  const { filters, cars } = useSelector(filterData);
console.log(filters);
  const buttonsData = [
    { name: "grid", clazz: "grid-button" },
    { name: "flex", clazz: "flex-button" },
  ];

  const optionData = [
    { name: "yearHight", value: "yearHight", label: "Year ↓" },
    { name: "yearLow", value: "yearLow", label: "Year ↑" },
    { name: "priceHight", value: "priceHight", label: "Price ↓" },
    { name: "priceLow", value: "priceLow", label: "Price ↑" },
  ];

  const buttons = buttonsData.map(({ name, clazz }) => {
    const active =
      filters.onViewChange === name ? `active-btn ${clazz}` : clazz;
    return (
      <button
        className={active}
        key={name}
        onClick={() => dispatch(onViewFilterState(name))}
      ></button>
    );
  });

  return (
    <div className="tiny_panel_view">
      <Paper
        className="tiny_panel_view-search"
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          color: "white",
          backgroundColor: "#071620",
        }}
      >
        <SearchIcon />
        <InputBase
          onChange={(e) => dispatch(termFilter(e))}
          value={filters.term}
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="Search"
          type="search"
        />
      </Paper>
      <div className="tiny_panel_view-results">
        {cars.length > 1 ? `${cars.length} Results` : `${cars.length} Result`}
      </div>
      <FormControl className="tiny_panel_view-select">
        <InputLabel id="sort-by">Sort By</InputLabel>
        <Select
          labelId="sort-by"
          id="sort-by"
          value={filters.onSortChange}
          label="Sort By"
          onChange={(e) => dispatch(onSortFilter(e))}
        >
          {optionData.map((item) => {
            return (
              <MenuItem key={item.name} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="tiny_panel_view-buttons">{buttons}</div>
    </div>
  );
};

export default ViewPanel;
