import React, { useReducer, useCallback, useState } from "react";

import isUrl from "is-url";
import { Plus, X } from "react-feather";
import { useMediaQuery } from "react-responsive";

import styles from "./AddForm.module.scss";
import CloseIcon from "../common/CloseIcon";
import Input from "../common/inputs/Input";
import Spinner from "../common/Spinner";
import Select from "../common/inputs/Select";
import FormRow from "./parts/FormRow";
import CheckboxGroup from "../common/inputs/CheckboxGroup";
import { DIETARY, CATEGORIES, LINK_TYPES } from "../../cms/constants";
import LinkGroup from "./parts/LinkGroup";
import LinkGroupTitle from "./parts/LinkGroupTitle";
import Share from "../common/Share";
import Emoji from "a11y-react-emoji";

const formState = {
  name: "",
  postcode: "",
  category: "restaurant",
  dietary: [],
  links: {},
  support: [""]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.key]: action.value
      };
    case "update_link":
      return {
        ...state,
        links: {
          ...state.links,
          [action.key]: action.value
        }
      };
    case "update_support": {
      const support = state.support.slice();
      support[action.index] = action.value;
      return {
        ...state,
        support
      };
    }
    case "add_support": {
      const support = state.support.slice();
      support.push("");
      return {
        ...state,
        support
      };
    }
    case "delete_support": {
      const support = state.support.slice();
      support.splice(action.index, 1);
      return {
        ...state,
        support
      };
    }
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
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  });
  const [state, dispatch] = useReducer(reducer, formState);
  const { name, postcode, category, dietary, links, support } = state;
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      setErrorMessage(false);
      setSubmitting(true);

      const linksRed = Object.keys(state.links).reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: state.links[curr]
        };
      }, {});

      const { dietary, support, links, ...rest } = state;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: jsonToEncoded({
          ...rest,
          ...linksRed,
          dietary: dietary.join(" - "),
          support: state.support.join(" - "),
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
          Firstly, thank you for helping us build the neighbourgoods map and
          raise support for your local favourites. If you are adding your own
          business or for someone else, be sure to include any helpful URLs that
          you can find.
        </p>
        <p>
          Our mission is to build a community map that supports small
          independent bars, eateries and businesses in London. Please note, all
          submissions are reviewed before being added to the map to check their
          criteria fits our mission. Thank you.
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
              <b>Thank you</b>
              <br />
              Please help us continue to build the support map by sharing with
              others
            </p>

            <Share />
          </div>
        </div>

        <input type="hidden" name="form-name" value="add" />
        {isTablet ? (
          <>
            <FormRow title="Who are they?*" number="1">
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
                label="Post code"
                name="postcode"
                value={postcode}
                onTextChange={text =>
                  dispatch({ type: "update", key: "postcode", value: text })
                }
                disabled={isSubmitting}
                required
              />
            </FormRow>

            <FormRow title="What do they do?*" number="2">
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

              <input type="hidden" name="dietary" />

              <CheckboxGroup
                label="Dietary Requirements"
                value={dietary}
                options={DIETARY}
                onChange={value =>
                  dispatch({ type: "update", key: "dietary", value })
                }
                disabled={isSubmitting}
              />
            </FormRow>

            <FormRow
              title="How can people support them?*"
              subtitle={
                <span>
                  Include all <u>URLs</u> that will help support them!
                </span>
              }
              number="3"
            >
              <LinkGroup
                icon="🏡"
                title="Order delivery"
                subtitle="e.g. Deliveroo, Just Eat, UberEats, Website"
                className={styles.stacked}
              >
                <Input
                  leftSlot={<LinkGroupTitle title="Deliveroo" />}
                  hide
                  placeholder="Insert URL"
                  value={links[LINK_TYPES.DELIVEROO] || ""}
                  name="deliveroo"
                  onTextChange={value =>
                    dispatch({
                      type: "update_link",
                      key: LINK_TYPES.DELIVEROO,
                      value
                    })
                  }
                  validate
                  validateFunc={value => isUrl(value)}
                  disabled={isSubmitting}
                />
                <Input
                  leftSlot={<LinkGroupTitle title="Uber Eats" />}
                  hide
                  placeholder="Insert URL"
                  value={links[LINK_TYPES.UBER_EATS] || ""}
                  onTextChange={value =>
                    dispatch({
                      type: "update_link",
                      key: LINK_TYPES.UBER_EATS,
                      value
                    })
                  }
                  validate
                  validateFunc={value => isUrl(value)}
                  disabled={isSubmitting}
                />
                <Input
                  leftSlot={<LinkGroupTitle title="Just Eat" />}
                  hide
                  placeholder="Insert URL"
                  value={links[LINK_TYPES.JUST_EAT] || ""}
                  onTextChange={value =>
                    dispatch({
                      type: "update_link",
                      key: LINK_TYPES.JUST_EAT,
                      value
                    })
                  }
                  validate
                  validateFunc={value => isUrl(value)}
                  disabled={isSubmitting}
                />
                <Input
                  leftSlot={<LinkGroupTitle title="Website / Other" />}
                  hide
                  placeholder="Insert URL"
                  value={links[LINK_TYPES.EXTERNAL] || ""}
                  onTextChange={value =>
                    dispatch({
                      type: "update_link",
                      key: LINK_TYPES.EXTERNAL,
                      value
                    })
                  }
                  validate
                  validateFunc={value => isUrl(value)}
                  disabled={isSubmitting}
                />
              </LinkGroup>

              <LinkGroup
                icon="❤️"
                title="Offer Support"
                subtitle="e.g. Spending vouchers, Fundraisers, Cookbooks"
              >
                {support.map((infoValue, index) => {
                  return (
                    <Input
                      key={index}
                      hide
                      placeholder="Insert URL / Contact info"
                      value={infoValue}
                      onTextChange={value =>
                        dispatch({ type: "update_support", index, value })
                      }
                      rightSlot={
                        index > 0 ? (
                          <button
                            type="button"
                            className={styles.remove}
                            onClick={() =>
                              dispatch({ type: "delete_support", index })
                            }
                          >
                            <X />
                          </button>
                        ) : (
                          undefined
                        )
                      }
                      disabled={isSubmitting}
                    />
                  );
                })}
                <div className={styles.add}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "add_support" })}
                    disabled={isSubmitting}
                  >
                    <Plus />
                    Add a row
                  </button>
                </div>
              </LinkGroup>
            </FormRow>
          </>
        ) : (
          <>
            <FormRow title="Who do you want to add?">
              <Input
                label="Name"
                value={name}
                name="name"
                onTextChange={text =>
                  dispatch({ type: "update", key: "name", value: text })
                }
                disabled={isSubmitting}
                required
              />
              <Input
                label="Post code"
                value={postcode}
                name="postcode"
                onTextChange={text =>
                  dispatch({ type: "update", key: "postcode", value: text })
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
            </FormRow>
            <input type="hidden" name="support" />
            <input type="hidden" name={LINK_TYPES.DELIVEROO} />
            <input type="hidden" name={LINK_TYPES.UBER_EATS} />
            <input type="hidden" name={LINK_TYPES.JUST_EAT} />
            <input type="hidden" name={LINK_TYPES.EXTERNAL} />
          </>
        )}
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
