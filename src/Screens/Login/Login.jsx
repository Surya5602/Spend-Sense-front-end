import { useState } from "react";
import UserButton from "../../Components/Buttons/UserButton";
import "./Login.css";
import Form from "react-bootstrap/Form";
import { API_URL } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formFields = [
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your Password",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSumbit = async () => {
    try {
      const responce = await axios.post(`${API_URL}/login`, { formData });
      if (responce.status === 200) {
        localStorage.setItem("token" , responce.data.data.token)
        navigate("/overview");
      }
    } catch (error) {
      setError((prevVal) => (prevVal = error.response.data.message));
      console.log(error)
    }
  };

  return (
    <div className="loginComponent">
      <Form>
        {formFields.map((field, index) => (
          <Form.Group
            className="mb-3"
            controlId={`formControl${index}`}
            key={index}
          >
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
      </Form>
      {error ? (<p className="errorMessage">{error}</p>) : ""}
      <p className="registerPart">
        Don't Have a Account? <a href="/signup">Register</a>
      </p>
      <UserButton
        NameOfButton={"Login"}
        classNameString={"LoginButton"}
        functionTriggered={handleSumbit}
      />
    </div>
  );
};

export default Login;
