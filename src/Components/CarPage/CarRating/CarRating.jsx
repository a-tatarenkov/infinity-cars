import Rating from "@mui/material/Rating";

const CarRating = ({ rating, size }) => {
  const avrRating = () => {
    return rating.length === 0
      ? 0
      : rating
          .map((item) => Object.values(item))
          .flat()
          .reduce((item, acc) => acc + item) /
          rating.map((item) => Object.values(item)).flat().length;
  };

  return (
    <Rating
      size={size}  
      name="car rating"
      readOnly
      style={{ color: "white" }}
      value={avrRating() || 0}
      max={5}
      precision={0.5}
      color="grey"
    />
  );
};

export default CarRating;
