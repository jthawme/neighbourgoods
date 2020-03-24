import React, { useCallback } from "react";
import Places from "google-places-web";
import styled from "styled-components";

Places.apiKey = "AIzaSyAhqTnFJVg21Hx5HOulNjaaF5wL2v8q-80";

const LabelTitle = styled.span`
  display: block;
`;

const PlacesInfoHelper = ({ value = {}, onChange }) => {
  const onSubmit = useCallback(e => {
    e.preventDefault();
    const form = e.target;
    const placeid = new FormData(form).get("placeid");

    Places.details({ placeid })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <LabelTitle>Google maps place id</LabelTitle>
          <input
            name="placeid"
            type="text"
            placeholder="Google maps place id"
          />
        </label>
        <button type="submit">Search (dont search too many times)</button>
      </form>
    </div>
  );
};

export default PlacesInfoHelper;
