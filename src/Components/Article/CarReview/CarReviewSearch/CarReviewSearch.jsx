import "./carReviewSearch.scss";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { termFilter, fetchFilteredCars } from "../../../../actions";
import { useHttp } from "../../../../hooks/http.hook";
import { useEffect, useState } from "react";
import CardGrid from "../../../CarPage/CarGrid/CarGrid";
import PaginationBox from "../../../CarPage/Pagination/Pagination";

export const CarReviewSearch = () => {
  const term = createSelector(
    (state) => state.filters,
    (state) => state.cars.cars,
    (filters, cars) => {
      return { filters: filters, cars };
    }
  );

  const dispatch = useDispatch();
  const { request } = useHttp();
  const filter = useSelector(term);
  const [list, setList] = useState(2);

  useEffect(() => {
    dispatch(fetchFilteredCars(request, filter.filters));
    // eslint-disable-next-line
  }, [filter.filters]);

  const renderCarList = (arr) => {
    return (
      <>
        {arr
          .slice(filter.filters.pagination - 10, filter.filters.pagination)
          .map((item) => {
            return (
              <CardGrid
                to={`/car_review_details/${item.id}`}
                {...item}
                id={item.id}
                key={item.id}
              />
            );
          })}
      </>
    );
  };

  return (
    <div className="review_search">
      <input
        type="text"
        value={filter.filters.term}
        onChange={(e) => dispatch(termFilter(e))}
        placeholder="Search a Car"
      />

      <div className="our_reviews_slider">
        <h3 className="our_reviews_slider-title">Our Reviews</h3>
        <ul className="our_reviews_slider-list">
          {filter.cars.length !== 0
            ? filter.cars
                .filter((item) => item.review)
                .slice(0, list)
                .map((item, i) => (  
                  <CardGrid
                    {...item}
                    to={`/our_review_details/${item.id}`}
                    key={i}
                    style={{ width: "max-content" }}
                  />
                ))
            : null}
        </ul>
        <button
          className="show_more_list"
          onClick={() =>
            setList(
              list === 2 ? filter.cars.filter((item) => item.review).length : 2
            )
          }
        >
          {list === 2 ? "Show More" : "Show Less"}
        </button>
      </div>

      <div className="review_search-list">
        <h3 className="review_h3">Customer Reviews</h3>
        <div className="review_search-list-items">
          <ul className="review_search-list-items-cards">
            {renderCarList(filter.cars)}
          </ul>
        </div>
        <PaginationBox style={{ margin: "0 auto" }} />
      </div>
    </div>
  );
};
