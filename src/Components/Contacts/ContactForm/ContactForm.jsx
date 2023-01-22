import './contactForm.scss';

const ContactForm = () => {
  return (
    <>
      <div className="text-info">Get In Touch</div>
      <div className="form-container">
        <form action="" name="get-in-touch">
          <label htmlFor="fullName">Name</label>
          <input type="text" id="fullName" placeholder="Full Name" />

          <label htmlFor="fullEmail">Email</label>
          <input type="email" id="fullEmail" placeholder="email@email.com" />

          <label htmlFor="fullPhone">Phone</label>
          <input type="number" id="fullPhone" placeholder="000-000-000" />

          <label htmlFor="fullComment">Comment</label>
          <textarea
            name="fullComment"
            id="fullComment"
            cols="30"
            rows="10"
            placeholder="Leave a message here"
          ></textarea>

          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
