import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

export const URL_BASE = 'https://playground.4geeks.com/contact';

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const getContacts = async () => {
		try {
			const response = await fetch(`${URL_BASE}/agendas/Luis/contacts`);
			const data = await response.json();
			dispatch({ type: 'add_contacts', payload: data.contacts });
		}
		catch (error) {
			console.log(error);
		}
	}

	const renderContacts = () => {
		if (store.contacts.length === 0) return <h5 className="p-3">No hay contactos</h5>
		return store.contacts.map((contact, index) => {
			return <li key={contact.id} className="list-group-item">
				<ContactCard contact={contact} />
			</li>
		})
	}

	useEffect(() => {
		getContacts();
	}, [])

	return (
		<div className="container">
			<h1 className="text-center py-3">Lista de contactos</h1>
			<div className="card">
				<ul className="list-group list-group-flush">
					{renderContacts()}
				</ul>
			</div>
		</div>
	);
}; 