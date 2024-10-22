import Form from "react-bootstrap/Form";
import UserButton from "../../Components/Buttons/UserButton";
import "./signup.css";
import axios from "axios";
import { API_URL , emailValidatorRegex } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formFields = [
    {
      name: "firstname",
      type: "text",
      label: "First Name",
      placeholder: "Enter your firstname",
    },
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
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter Password",
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
    if (formData.password.length >= 8) {
      if (formData.password === formData.confirmPassword) {
        debugger
        if (formData.email !== "" && emailValidatorRegex.test(formData.email)) {
          try {
            const responce = await axios.post(`${API_URL}/signup`, {
              formData,
            });
            if (responce.status === 200) {
              navigate("/login");
            }
          } catch (error) {
            setError((prevVal) => (prevVal = error.response.data.message));
            console.log(error);
          }
        } else {
          setError((prevVal) => (prevVal = "Enter valid email address"));
        }
      } else {
        setError(
          (prevVal) =>
            (prevVal = "Password and Confirm Password should be same")
        );
      }
    } else {
      setError((prevVal) => (prevVal = "password should be 8 charcter"));
    }
  };
  return (
    <div className="signupComponent">
      <Form onSubmit={handleSumbit}>
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
      {error ? <p className="errorMessage">{error}</p> : ""}
      <p className="registerPart">
        Already have a account? <a href="/login">Login</a>
      </p>
      <UserButton
        NameOfButton={"Signup"}
        classNameString={"LoginButton"}
        functionTriggered={handleSumbit}
      />
    </div>
  );
};
export default Signup;
