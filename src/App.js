import axios from "axios";
import React from "react";
import "./App.css";

function App() {
  let cancelToken;
  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;

    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    try {
      const results = await axios.get(
        `http://localhost:4000/animals?q=${searchTerm}`,
        { cancelToken: cancelToken.token } //Pass the cancel token to the current request
      );
      console.log("Results for " + searchTerm + ": ", results.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "3em", textAlign: "center" }}>
      <input
        style={{ width: "60%", height: "1.5rem" }}
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default App;
