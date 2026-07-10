import useGlobalReducer from "../hooks/useGlobalReducer";
import { URL_BASE } from "../pages/Home";

const Modal = (props) => {

    const { store, dispatch } = useGlobalReducer();

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${URL_BASE}/agendas/Luis/contacts/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'delete_contacts', payload: id });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal fade" tabIndex={-1} id={`warning-${props.id}`} aria-labelledby="modalTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitle">Advertencia</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Seguro que desea eliminar el contacto: {props.name}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteContact(props.id)}>Aceptar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;