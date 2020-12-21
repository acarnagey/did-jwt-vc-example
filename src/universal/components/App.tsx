import React, { useState } from "react";
import api from "../api";

export default function App() {
  const [vc, setVc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res: any = await api.blockchain.createVCOverEighteen("first last");
    setVc(res.data.verifiableCredential);
  };

  return (
    <div>
      <h1>DID VC Example</h1>
      <form onSubmit={handleSubmit}>
        <legend>Subject is over 18 yo</legend>
        <fieldset>
          <label htmlFor="fname">First name:</label>
          <input type="text" id="fname" name="fname" />
          <br />
          <br />
          <label htmlFor="lname">Last name:</label>
          <input type="text" id="lname" name="lname" />
          <br />
          <br />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      {vc && <span>{JSON.stringify(vc)}</span>}
    </div>
  );
}
