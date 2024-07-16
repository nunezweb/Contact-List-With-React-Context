import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/contact.css";
import picProfile from "../../img/picture.jpg";
import { Context } from "../store/AppContext";
import ModalConfirmation from "./Modal";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    actions.deleteContact(id);
  };

  const showModalConfirmation = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    handleDelete(contact.id);
    setShowModal(false);
  };

  return (
    <div className="card m-3 border border-3 rounded p-2 text-dark bg-opacity-10">
      <div className="row">
        <div className="col-12 col-md-3 text-center">
          <img
            src={picProfile}
            className="rounded-circle img-fluid"
            alt="Picture Profile"
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="card-body">
            <h5 className="card-title">
              <span className="border-bottom">{contact.name}</span>
            </h5>
            <p className="card-text">
              <span className="border-bottom">{contact.address}</span>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                <span className="border-bottom">{contact.phone}</span>
              </small>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                <span className="border-bottom">{contact.email}</span>
              </small>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center">
          <button
            className="bookmarkBtn my-2"
            onClick={() => handleEdit(contact.id)}
            title="Edit Contact"
          >
            <span className="text">Edit</span>
          </button>
          <button
            className="bookmarkBtn my-2"
            onClick={showModalConfirmation}
            title="Delete Contact"
          >
            <span className="text">Delete</span>
          </button>
        </div>
      </div>
      <ModalConfirmation show={showModal} onClose={closeModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default ContactCard;
