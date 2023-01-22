import "./productName.scss";

const ProductName = ({ data }) => {
  const carName = `${data[0].brand} ${data[0].model}`;
  return (
    <div className="full-car-name">
      <h1>{carName}</h1>
    </div>
  );
};

export default ProductName;
