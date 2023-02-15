import "./credit.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export const Credit = (props) => {
  const price = props.data;
  const [month, setMonth] = useState(12);
  const [rate, setRate] = useState(2);
  const [pay, setPay] = useState(10000);
  const months = [12, 18, 24, 30, 36, 42, 48, 54, 60];
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const computeLoan = () => {
    const interest = ((price - pay) * (rate * 0.01)) / month;
    const payment = ((price - pay) / month + interest)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return  payment;
  };

  const monthlyPayment = computeLoan();

  return (
    <div className="credit_simulation">
      <div className="credit_simulation-left">
        <TextField
          id="price-read-only-input"
          label="Price"
          sx={{ width: "48%" }}
          defaultValue={
            price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
          }
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: "48%" }}
          id="rate-read-only-input"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          label="Interest Rate (%)"
          type={"number"}
        />
        <FormControl fullWidth sx={{ width: "48%" }}>
          <InputLabel id="Period in Months">Period in Months</InputLabel>
          <Select
            labelId="Period in Months"
            id="Period in Months"
            value={month}
            label="Period in Months"
            onChange={handleChange}
            defaultValue={12}
          >
            {months.map((item) => (
              <MenuItem key={item} value={item}>
                {item} Months
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "48%" }}
          id="payment-read-only-input"
          label="Down Payment"
          type="number"
          value={pay}
          onChange={(e) => setPay(e.target.value)}
        />
      </div>
      <div className="credit_simulation-right">
        <h4>Monthly Payment</h4>
        <span>$ &nbsp;&nbsp;{monthlyPayment} </span>
      </div>
    </div>
  );
};
