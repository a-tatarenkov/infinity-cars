import ContactForm from "../Contacts/ContactForm/ContactForm";
import OurContacts from "../Contacts/OurContacts/OurContacts";

const ContactsPage = () => {
  return (
    <>
      <main className="get-in-touch-form">
        <ContactForm />
        <OurContacts />
      </main>
    </>
  );
};

export default ContactsPage;
