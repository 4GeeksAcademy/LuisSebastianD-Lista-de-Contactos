export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_contacts':
      return {
        ...store,
        contacts: action.payload
      };
    case 'delete_contacts':
      return {
        contacts: store.contacts.filter((contact, index) => contact.id !== action.payload)
      };
    case 'new_contact':
      return {
        ...store,
        contacts: [action.payload]
      }
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map((contact, index) => contact.id === action.payload.id ? action.payload : contact)
      }
    default:
      throw Error('Unknown action.');
  }
}
