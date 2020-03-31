import React, { useState, useCallback } from "react";

import { useMediaQuery } from "react-responsive";
import Collapsible from "react-collapsible";
import { useSelector } from "react-redux";
import Input from "../common/inputs/Input";
import Spinner from "../common/Spinner";
import CloseIcon from "../common/CloseIcon";

import Arrow from "../../svg/arrow.svg";
import Logo from "../../svg/logo.svg";
import LogoText from "../../svg/logo-text.svg";

import styles from "./PostcodeLookup.module.scss";

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
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  });

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
    [postcode, onPostcode]
  );

  return (
    <div className={styles.outer}>
      {onClose && <CloseIcon alt className={styles.close} onClick={onClose} />}
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
          <LogoText />
        </div>

        <div className={styles.inputForm}>
          <p>
            Find and support your local restaurants, cafés and independent
            merchants through COVID-19
          </p>
          <form onSubmit={onSubmit} disabled={loading}>
            <Input
              label="Post Code"
              value={postcode}
              onTextChange={text => setPostcode(text)}
              disabled={loading}
              rightSlot={
                <button className={styles.button} disabled={loading}>
                  {loading ? <Spinner /> : <Arrow />}
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
      </div>
    </div>
  );
};

export default PostcodeLookup;
