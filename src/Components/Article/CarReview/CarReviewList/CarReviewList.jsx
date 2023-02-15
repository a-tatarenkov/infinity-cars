import "./carReviewList.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchCars } from "../../../../actions";
import { useState } from "react";
import { CarReviewRating } from "../CarReviewRating/CarReviewRating";
import deleteImg from "../../../../assets/delete.png";
import { v4 as uuidv4 } from "uuid";

export const CarReviewList = (props) => {
  const reviewsData = createSelector(
    (state) => state.users,
    (state) => state.cars.cars,
    (users, cars) => {
      return { users, cars };
    }
  );

  const reviews = useSelector(reviewsData);

  const { rating } = props;
  const [filter, setFilter] = useState("newest");
  const { request } = useHttp();
  const dispatch = useDispatch();

  const avrUserRating = (arr) => {
    const ratings = Object.values(arr.stared);
    return (
      ratings.reduce((acc, el) => (acc += el)) /
      Object.values(arr.stared).length
    );
  };

  const numToDate = (num) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ];

    const date = new Date(num);
    return `${
      months[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()} `;
  };

  const optionData = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "hi-rating", label: "Hight rating" },
    { value: "lo-rating", label: "Low rating" },
  ];

  const onSortReviews = (arr, filter) => {
    switch (filter) {
      case "oldest":
        return arr.sort((a, b) => a.date - b.date);
      case "newest":
        return arr.sort((a, b) => b.date - a.date);
      case "hi-rating":
        return arr.sort((a, b) => avrUserRating(b) - avrUserRating(a));
      case "lo-rating":
        return arr.sort((a, b) => avrUserRating(a) - avrUserRating(b));

      default:
        return arr;
    }
  };

  console.log(reviews);
  const reviewsToMap = onSortReviews(rating, filter);

  const onPostDelete = (id) => {
    const currentCar = reviews.cars.filter(
      (item) => item.id === +props.carId
    )[0];

    const currentPost = currentCar.rating.filter((item) => item.id === id)[0];
    const postsToReturn = currentCar.rating.filter(
      (item) => item !== currentPost
    );

    console.log(currentPost);
    console.log(postsToReturn);

    currentCar.rating = postsToReturn;
    console.log(reviews);

    request(
      `/cars/${props.carId}`,
      "PUT",
      JSON.stringify(currentCar)
    ).catch((err) => console.log(err));
    dispatch(fetchCars(request));
  };

  return (
    <div className="reviews">
      <div className="reviews-sort">
        <FormControl sx={{ width: "100%", background: "#152836" }}>
          <InputLabel id="sort-by">Sort By</InputLabel>
          <Select
            labelId="sort-reviews"
            id="sort-reviews"
            value={filter}
            label="Sort By"
            onChange={(e) => setFilter(e.target.value)}
          >
            {optionData.map((item) => {
              return (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <ul className="reviews_list">
        {reviewsToMap.map((item) => (
          <li key={uuidv4()} className="single_review">
            <div className="single_review-image">
              <img src={item.photo} alt="user" />
            </div>
            <div className="single_review-review_items">
              <span className="rev_date"> {numToDate(item.date)} </span>
              <span className="rev_name">{item.name}</span>
              <p className="rev_text">{item.rev}</p>

              <CarReviewRating
                value={avrUserRating(item)}
                className="rev_rating"
              />
              {reviews.users.login &&
              reviews.users.currentUser[0].id === item.userId ? (
                <button
                  onClick={() => onPostDelete(item.id)}
                  className="delete_post"
                >
                  <span>Delete</span>
                  <img src={deleteImg} alt="delete" />
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
