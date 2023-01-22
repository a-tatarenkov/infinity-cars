import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { onPaginationChange } from "../../../actions";
import "./pagination.scss";

const PaginationBox = () => {
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
  const { cars, filters } = useSelector(filterData);
  return (
    <div className="pagination">
      <Stack spacing={2} className="pagination-inner">
        <Pagination
          page={Math.ceil(filters.pagination / 10)}
          size="large"
          onChange={(event, value) => dispatch(onPaginationChange(value * 10))}
          count={Math.ceil(cars.length / 10)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PaginationBox;
