import Rating from "@mui/material/Rating";

const CarRating = ({ rating, size }) => {
  const avrRating = () => {
    return rating.reduce((item, acc, _, arr) => acc + item / arr.length);
  };

  return (
      <Rating
        size={size}
        name="car rating"
        readOnly
        style={{ color: "white" }}
        defaultValue={avrRating()}
        max={5}
        precision={0.5}
        color="grey"
      />
  );
};

export default CarRating;
