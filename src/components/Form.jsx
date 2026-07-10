import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { URL_BASE } from "../pages/Home";
import { Link, useParams } from "react-router-dom";

const Form = () => {

    const { store, dispatch } = useGlobalReducer();
    const params = useParams();
    const [contactData, setContactData] = useState({});

    const thereIsFullData = () => {
        if (Object.keys(contactData).length >= 4) {
            return Object.values(contactData).every((value) => value !== "")
        }
        return false;
    }

    const newContact = async () => {
        if (thereIsFullData()) {
            try {
                const response = await fetch(`${URL_BASE}/agendas/Luis/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                });
                const data = await response.json();
                dispatch({ type: 'new_contact', payload: data });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const updateContact = async () => {
        try {
            const response = await fetch(`${URL_BASE}/agendas/Luis/contacts/${params.contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            const data = await response.json();
            dispatch({ type: 'update_contact', payload: data });
        } catch (error) {
            console.log(error)
        }
    }

    const formType = () => {
        if (params.contactId !== undefined) return updateContact();
        return newContact();
    }

    const buttonType = () => {
        if (thereIsFullData()) {
            return <Link to="/">
                <button className="btn btn-primary w-100" type="button" onClick={() => formType()}>
                    Save
                </button>
            </Link>
        }
        return <button className="btn btn-primary w-100" type="submit" onClick={() => formType()}>
            Save
        </button>
    }

    useEffect(() => {
        if (params.contactId !== undefined) {
            setContactData(store.contacts.find(contact => contact.id === parseInt(params.contactId)));
        }
    }, []);

    return (
        <form>
            <div className="my-3">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input className="form-control" type="text" id="fullName"
                    placeholder="Enter full name" value={contactData?.name || ""} required
                    onChange={(event) => setContactData({ ...contactData, name: event.target.value })} />
            </div>
            <div className="my-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email"
                    placeholder="Enter email" value={contactData?.email || ""} required
                    onChange={(event) => setContactData({ ...contactData, email: event.target.value })} />
            </div>
            <div className="my-3">
                <label className="form-label" htmlFor="phone">Phone</label>
                <input className="form-control" type="number" id="phone"
                    placeholder="Enter phone" value={contactData?.phone || ""} required
                    onChange={(event) => setContactData({ ...contactData, phone: event.target.value })} />
            </div>
            <div className="my-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input className="form-control" type="text" id="address"
                    placeholder="Enter address" value={contactData?.address || ""} required
                    onChange={(event) => setContactData({ ...contactData, address: event.target.value })} />
            </div>
            <div className="my-4 text-center">
                {buttonType()}
            </div>
        </form>
    )
}

export default Form;