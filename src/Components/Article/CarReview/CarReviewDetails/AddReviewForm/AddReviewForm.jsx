import "./addReviewForm.scss";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../../../../hooks/http.hook";
import { fetchCars } from "../../../../../actions";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const AddReviewForm = (props) => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.users,
    (state) => state.cars.cars,
    (brands, users, cars) => {
      return { brands, users, cars };
    }
  );
  const car = useSelector(brandsData);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const [price, setPrice] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [design, setDesign] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [reliability, setReliability] = useState(0);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);


  const postReview = (e) => {
    const currentCar = car.cars.filter((item) => item.id === props.id);

    e.preventDefault();
    const review = {
      id: uuidv4(),
      userId: car.users.currentUser[0].id,
      name: car.users.currentUser[0].name,
      date: new Date().getTime(),
      photo: car.users.currentUser[0].photo, 
      rev: text,
      stared: {
        Comfort: comfort,
        Design: design,
        Performance: performance,
        Price: price,
        Reliability: reliability,
      },
    };

    currentCar[0].rating = [...currentCar[0].rating, review];

    request(
      `/cars/${props.id}`,
      "PUT",
      JSON.stringify(currentCar[0])
    ).catch((err) => console.log(err));

    dispatch(fetchCars(request));
    setVisible(false);
    setComfort(0);
    setDesign(0);
    setPerformance(0);
    setPrice(0);
    setReliability(0);
    setText("");
  };

  return (
    <>
      {car.users.login ? (
        <form className="add_review" onSubmit={(e) => postReview(e)}>
          <span className={visible ? "active_span" : "add_review-span"}>
            Add Your Review
          </span>
          <div
            className={
              visible ? "add_review-stars active_stars" : "add_review-stars"
            }
          >
            <div>
              Comfort
              <Rating
                className={visible ? "comfort comfort_active" : "comfort"}
                name="car rating"
                style={{ color: "white" }}
                defaultValue={0}
                value={comfort}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setComfort(newValue);
                }}
                color="grey"
              />
            </div>
            <div>
              Design
              <Rating
                className={visible ? "design design_active" : "design"}
                name="car rating"
                style={{ color: "white" }}
                defaultValue={0}
                value={design}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setDesign(newValue);
                }}
                color="grey"
              />
            </div>
            <div>
              Performance
              <Rating
                name="car rating"
                className={
                  visible ? "performance performance_active" : "performance"
                }
                style={{ color: "white" }}
                defaultValue={0}
                value={performance}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setPerformance(newValue);
                }}
                color="grey"
              />
            </div>
            <div>
              Price
              <Rating
                name="car rating"
                className={visible ? "price price_active" : "price"}
                style={{ color: "white" }}
                defaultValue={0}
                value={price}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setPrice(newValue);
                }}
                color="grey"
              />
            </div>
            <div>
              Reliability
              <Rating
                name="car rating"
                className={
                  visible ? "reliability reliability_active" : "reliability"
                }
                style={{ color: "white" }}
                defaultValue={0}
                value={reliability}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setReliability(newValue);
                }}
                color="grey"
              />
            </div>
          </div>
          <textarea
            cols="30"
            rows="7"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => setVisible(true)}
            placeholder="Leave a message here"
          ></textarea>

          <button
            type="submit"
            className={visible ? "button_active" : ""}
            disabled={visible ? false : true}
          >
            Add Review
          </button>
        </form>
      ) : (
        <h2 className="add_review-user_info">
          Please, login or create account to leave a comment &nbsp;&nbsp;&nbsp;
          <Link to={"/login"}>Login Here!</Link>
        </h2>
      )}
    </>
  );
};
