import Rating from "@mui/material/Rating";



export const CarReviewRating = (props) => {
    const {size, value} = props


    return (
        <Rating
        size={size}
        name="car rating"
        readOnly
        style={{ color: "white" }}
        value={value || ''}
        max={5}
        precision={0.1}
        color="grey"
        />
    )
}