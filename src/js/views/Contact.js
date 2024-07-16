import React, { useContext } from "react";
import { Context } from "../store/AppContext";
import ContactCard from "../component/ContactCard";
import "../../styles/contact.css";

const Contact = () => {
  const { store } = useContext(Context);

  return (
    <div className="container-fluid w-75">
      <div>
        <h1 className="text-center text-secondary m-4">Contact List</h1>
        {store.contacts?.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <div>
            <p className="alert alert-danger">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
