import "./productForm.scss";

const FullCarForm = () => {
  return (
    <div className="full_car_form">
      <h3>Contact</h3>
      <form>
        <div className="form_top">
          <div className="input_box_left">
            <label htmlFor="full-name">Name</label>
            <input type="text" id="full-name" placeholder="Full Name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="email@email.com" />
          </div>
          <div className="input_box_right">
            <label htmlFor="phone">Phone (Optional)</label>
            <input type="number" id="phone" placeholder="(000) 000-0000" />

            <label htmlFor="select_subject">Subject</label>
            <select name="car-details" id="select_subject">
              <option value="">Subject</option>
              <option value="price">Price discuss</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          placeholder="Leave a message here"
        ></textarea>
        <input type="submit" value="Contact Dealer" className="submit_input" />
      </form>
    </div>
  );
};

export default FullCarForm;
