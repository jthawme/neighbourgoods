import React, { useReducer, useCallback, useState } from "react";

import isUrl from "is-url";
import { Plus, X } from "react-feather";

import styles from "./AddForm.module.scss";
import CloseIcon from "../common/CloseIcon";
import Input from "../common/inputs/Input";
import Spinner from "../common/Spinner";
import Select from "../common/inputs/Select";
import FormRow from "./parts/FormRow";
import CheckboxGroup from "../common/inputs/CheckboxGroup";
import { DIETARY, CATEGORIES } from "../../cms/constants";
import LinkGroup from "./parts/LinkGroup";
import LinkGroupTitle from "./parts/LinkGroupTitle";
import { useToasts } from "react-toast-notifications";

const formState = {
  name: "",
  postCode: "",
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
    default:
      return state;
  }
};

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const AddForm = ({ onClose }) => {
  const { addToast } = useToasts();
  const [state, dispatch] = useReducer(reducer, formState);
  const { name, postCode, category, dietary, links, support } = state;
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      setErrorMessage(false);
      setSubmitting(true);

      const { links, support, ...rest } = state;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "add",
          links: encode(links),
          support: support.join(" - "),
          ...rest
        })
      })
        .then(() => {
          addToast("Submitted spot, thanks!", {
            appearance: "success"
            // autoDismiss: true,
            // autoDismissTimeout: 10000
          });
          onClose();
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
        className={styles.right}
        onSubmit={onSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="add" />
        <CloseIcon onClick={onClose} />

        <FormRow title="Who are they?*" number="1">
          <Input
            label="Name"
            value={name}
            onTextChange={text =>
              dispatch({ type: "update", key: "name", value: text })
            }
            disabled={isSubmitting}
            required
          />
          <Input
            label="Post code"
            value={postCode}
            onTextChange={text =>
              dispatch({ type: "update", key: "postCode", value: text })
            }
            disabled={isSubmitting}
            required
          />
        </FormRow>

        <FormRow title="What do they do?*" number="2">
          <Select
            label="Category"
            options={CATEGORIES}
            onValueChange={value =>
              dispatch({ type: "update", key: "category", value })
            }
            value={category}
            disabled={isSubmitting}
          />

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
          >
            <Input
              leftSlot={<LinkGroupTitle title="Deliveroo" />}
              hide
              placeholder="Insert URL"
              value={links.deliveroo}
              onTextChange={value =>
                dispatch({ type: "update_link", key: "deliveroo", value })
              }
              validate
              validateFunc={value => isUrl(value)}
              disabled={isSubmitting}
            />
            <Input
              leftSlot={<LinkGroupTitle title="Uber Eats" />}
              hide
              placeholder="Insert URL"
              value={links.uber_eats}
              onTextChange={value =>
                dispatch({ type: "update_link", key: "uber_eats", value })
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
