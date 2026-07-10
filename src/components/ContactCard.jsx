import { Link } from "react-router-dom";
import Modal from "./Modal";

const ContactCard = ({ contact }) => {
    return (
        <div className="row">
            <div className="col-3 text-center">
                <img src="https://i.pravatar.cc/140?img=16" className="img-fluid rounded-circle" />
            </div>
            <div className="col-7">
                <h5>{contact.name}</h5>
                <div className="my-2 text-secondary">
                    <i className="fa-solid fa-location-dot"></i> {contact.address}
                </div>
                <div className="my-2 text-secondary">
                    <i className="fa-solid fa-phone-flip"></i> {contact.phone}
                </div>
                <div className="my-2 text-secondary">
                    <i className="fa-solid fa-envelope"></i> {contact.email}
                </div>
            </div>
            <div className="col-2 d-flex justify-content-evenly pt-3">
                <div>
                    <Link to={`/update/${contact.id}`}>
                        <i className="fa-solid fa-pencil"></i>
                    </Link>
                </div>
                <div>
                    <button data-bs-toggle="modal"
                        data-bs-target={`#warning-${contact.id}`}
                        className="ms-0"
                        style={{ border: '0', background: 'none', color: 'red' }}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
            <Modal id={contact.id} name={contact.name} />
        </div>
    )
}

export default ContactCard;