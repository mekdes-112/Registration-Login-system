import React from "react";
import { Fragment , useState} from "react";
import { Link } from "react-router-dom";


const Login = ({ setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""  
      });

      const { email, password } = inputs;

      const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
      };

      const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/auth/login"
            , {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(body)
              });

              const parseRes = await response.json();

              console.log(parseRes);
              if (parseRes.success) { console.log("success");
                localStorage.setItem("token", parseRes.data);
                setAuth(true);
              } else {
                console.log(parseRes.data);
              }

             
              

        } catch (err) {
            console.error(err.message)
        }
    }
  return (
    <Fragment>
      <h1>Login</h1>
    <form onSubmit={onSubmitForm}>
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
      
  <Link to="/register">register</Link>
    </Fragment>
  );
};

export default Login;