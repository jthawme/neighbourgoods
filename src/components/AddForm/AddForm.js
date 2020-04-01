import React, { useReducer, useCallback, useState } from "react";

import styles from "./AddForm.module.scss";
import CloseIcon from "../common/CloseIcon";
import Input from "../common/inputs/Input";
import Spinner from "../common/Spinner";
import Select from "../common/inputs/Select";
import FormRow from "./parts/FormRow";
import { CATEGORIES } from "../../cms/constants";
import Share from "../common/Share";
import Emoji from "a11y-react-emoji";

const formState = {
  name: "",
  borough: "",
  category: "",
  description: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.key]: action.value
      };
    case "reset":
      return {
        ...formState
      };
    default:
      return state;
  }
};

function jsonToEncoded(element, key, list) {
  var list = list || [];
  if (typeof element == "object") {
    for (var idx in element)
      jsonToEncoded(element[idx], key ? key + "[" + idx + "]" : idx, list);
  } else {
    list.push(key + "=" + encodeURIComponent(element));
  }
  return list.join("&");
}

const AddForm = ({ onClose }) => {
  const [state, dispatch] = useReducer(reducer, formState);
  const { name, borough, category, description } = state;
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      setErrorMessage(false);
      setSubmitting(true);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: jsonToEncoded({
          ...state,
          "form-name": "add"
        })
      })
        .then(() => {
          setSuccess(true);
        })
        .catch(error => {
          setErrorMessage(error.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [state]
  );

  const onInternalClose = useCallback(() => {
    onClose();

    setTimeout(() => {
      setSuccess(false);
      dispatch({ type: "reset" });
    }, 500);
  }, [onClose]);

  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <p>
          Firstly, thank you for helping us build the Neighbourgoods map. Please
          note, the Neighbourgoods map was built to help support{" "}
          <u>small businesses across London</u> through the COVID-19 pandemic.
        </p>
      </div>
      <form
        method="post"
        action="/"
        name="add"
        className={`${styles.right} ${success && styles.successContainer}`}
        onSubmit={onSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <CloseIcon onClick={onInternalClose} />
        <div className={styles.success}>
          <div className={styles.submitBtn}>
            <button onClick={onInternalClose} type="button">
              <Emoji symbol="❤️" /> Submitted <Emoji symbol="❤️" />
            </button>

            <p>
              <b>Thank you - we have your submission</b>
              <br />
              We will add it the map as soon as possible
              <br />
              <br />
              Please help us build the map by sharing Neighbourgoods
              with&nbsp;others
            </p>

            <Share />
          </div>
        </div>
        <input type="hidden" name="form-name" value="add" />
        <FormRow title="Who do you want to add?">
          <Input
            label="Name"
            name="name"
            value={name}
            onTextChange={text =>
              dispatch({ type: "update", key: "name", value: text })
            }
            disabled={isSubmitting}
            required
          />
          <Input
            label="Borough"
            name="borough"
            value={borough}
            onTextChange={text =>
              dispatch({ type: "update", key: "borough", value: text })
            }
            disabled={isSubmitting}
            required
          />

          <Select
            label="Category"
            name="category"
            options={CATEGORIES}
            onValueChange={value =>
              dispatch({ type: "update", key: "category", value })
            }
            value={category}
            disabled={isSubmitting}
          />

          <div className={styles.divider} />

          <Input
            label="Additional text (optional)"
            name="description"
            value={description}
            onTextChange={text =>
              dispatch({ type: "update", key: "description", value: text })
            }
            disabled={isSubmitting}
            multiLine
          />
        </FormRow>
        <div className={styles.submitBtn}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit">
            {isSubmitting ? <Spinner /> : "Submit to map"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddForm;
