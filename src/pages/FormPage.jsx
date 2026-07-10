import { Link } from "react-router-dom";
import Form from "../components/Form";
import { useParams } from "react-router-dom";

export const FormPage = () => {

  const params = useParams();

  const formType = () => {
    return params.contactId !== undefined ? "Update contact" : "Add a new contact";
  }

  return (
    <div className="container">
      <h2 className="text-center py-3">{formType()}</h2>
      <Form/>
      <Link to="/">
        <button className="btn btn-primary mt-4">Back home</button>
      </Link>
    </div>
  );
};