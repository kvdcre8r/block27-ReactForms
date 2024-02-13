import { useState } from "react";
export default function Authenticate(props) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState("");
    const [error, setError] = useState(null);
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.data)
        console.log(result)
        setSuccessMessage(result.message);
        //api not returning username on response, instead showing iat for example
        setLoggedInUser(result.data.iat)
      } catch (error) {
        setError(error.message);
      }
    }
  
    return (
      <div>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {loggedInUser && <p>{loggedInUser}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>Authenticate Token!</button>
      </div>
    );
  }