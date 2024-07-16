import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/AppContext";
import "../../styles/contactform.css";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const id = Number(params.id);
      const existingContact = store.contacts.find(
        (contact) => contact.id === id
      );
      if (existingContact) {
        setContact(existingContact);
      }
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [params.id, store.contacts]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone || !contact.address) {
      setError("All fields are required.");
      return;
    }
    const response = !params.id
      ? await actions.addContact(contact)
      : await actions.editContact(contact, params.id);
    if (response) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="m-5">
        <div>
          <Link className="linkTo" to="/">
            <span className="backTo">Back to Contact List</span>
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <form className="pb-5" onSubmit={handleSubmit}>
              <h1>
                {!params.id ? "Add a new contact" : "Edit contact " + params.id}
              </h1>
              {error && <p className="text-danger">{error}</p>}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={contact.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={contact.address}
                  onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
              </div>
              <button type="submit" className="saveButton">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContact;
