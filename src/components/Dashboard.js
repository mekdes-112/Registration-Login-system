import React from "react";
import { Fragment, useState, useEffect} from "react";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            
            
            setName(parseRes.data.user_name);

        } catch (err) {
          
            console.error(err.message)
        }
    }

    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth(false);
    }


    useEffect(() => { 
      
        getName()
      },[]);


  return (
    <Fragment>
      <h1>dashboard {name}</h1>
      <button className="btn-btn-primary" onClick={e => logout(e)}>Log out</button>
      
      
    </Fragment>
  );
};

export default Dashboard;

