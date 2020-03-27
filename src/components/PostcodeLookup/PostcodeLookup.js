import React, { useState, useCallback } from "react";

import { ArrowRight } from "react-feather";
import Input from "../common/Input";

import styles from "./PostcodeLookup.module.scss";
import Spinner from "../common/Spinner";
import Collapsible from "react-collapsible";
import { useSelector } from "react-redux";

const getPostcode = postCode => {
  return fetch(`https://api.postcodes.io/postcodes/${postCode}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    });
};

const PostcodeLookup = ({ onPostcode, onClose }) => {
  const storedPostCode = useSelector(state => state.info.postCode);
  const [postcode, setPostcode] = useState(storedPostCode || "");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setShowError(false);
      setLoading(true);

      getPostcode(postcode)
        .then(data => {
          if (data.result.region !== "London") {
            setError("Sorry, this map only has results for London");
            setShowError(true);
          } else {
            onPostcode(data.result);
          }
        })
        .catch(err => {
          setError(err.message);
          setShowError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [postcode]
  );

  return (
    <div className={styles.container}>
      <p>
        Support your local independent bars, eateries and grocers through
        COVID-19
      </p>
      <form onSubmit={onSubmit} disabled={loading}>
        <Input
          label="Post Code"
          value={postcode}
          onTextChange={text => setPostcode(text)}
          disabled={loading}
          rightSlot={
            <button className={styles.button} disabled={loading}>
              {loading ? <Spinner /> : <ArrowRight />}
            </button>
          }
        />
      </form>
      <Collapsible
        easing="ease-in-out"
        open={showError}
        contentInnerClassName={styles.errorBox}
      >
        <p className={styles.error}>{error}</p>
      </Collapsible>
    </div>
  );
};

export default PostcodeLookup;
