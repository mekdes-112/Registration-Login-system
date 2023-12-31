import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""  
      });
    
      const { name, email, password } = inputs;

      const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = { name, email, password };
            const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        });
        const parseRes = await response.json();

        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        

        } catch (err) {
            console.error(err.message);
        }
    };

  return <Fragment><h1>Register</h1>
  <form  onSubmit={onSubmitForm}>
    <input
    type="text"
    name="name"
    placeholder="Full Name"
    className="form-control my-3"
    value={name}
    onChange={e => onChange(e)}
    />
    <input
    type="email"
    name="email"
    placeholder="enter your email"
    className="form-control my-3"
    value={email}
    onChange={e => onChange(e)}
    />
    <input
    type="password"
    name="password"
    placeholder="password"
    className="form-control my-3"
    value={password}
    onChange={e => onChange(e)}
    />
    <button className="btn btn-primary">Submit</button>
  </form>

  <Link to="/login">login</Link>
  </Fragment>
};

export default Register;

