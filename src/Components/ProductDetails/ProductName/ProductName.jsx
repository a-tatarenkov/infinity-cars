import "./productName.scss";

const ProductName = (props) => {
const carName = `${props.brand} ${props.model}`

  return (
    <div className="full-car-name">
      <h1>{carName}</h1>
    </div>
  );
};

export default ProductName;
