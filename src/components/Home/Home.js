import React from "react";
import { LINK_TYPES, CATEGORY_TYPES } from "../../cms/constants";
import LocationCard from "../LocationCard/LocationCard";

import styles from "./Home.module.scss";

const DEBUG_NAME = "TEST name";
const DEBUG_LINKS = [
  {
    link: "https://twitter.com",
    type: LINK_TYPES.VOUCHER,
    label: "Voucher"
  },
  {
    link: "https://twitter.com",
    type: LINK_TYPES.DELIVEROO,
    label: "Delivery"
  }
];
const DEBUG_TYPE = CATEGORY_TYPES.BAR;
const DEBUG_TIMES = [
  {
    close: {
      day: 0,
      time: "2300"
    },
    open: {
      day: 0,
      time: "1200"
    }
  },
  {
    close: {
      day: 1,
      time: "2330"
    },
    open: {
      day: 1,
      time: "1200"
    }
  },
  {
    close: {
      day: 2,
      time: "2330"
    },
    open: {
      day: 2,
      time: "1200"
    }
  },
  {
    close: {
      day: 3,
      time: "2330"
    },
    open: {
      day: 3,
      time: "1200"
    }
  },
  {
    close: {
      day: 4,
      time: "2330"
    },
    open: {
      day: 4,
      time: "1200"
    }
  },
  {
    close: {
      day: 6,
      time: "0000"
    },
    open: {
      day: 5,
      time: "1200"
    }
  },
  {
    close: {
      day: 0,
      time: "0000"
    },
    open: {
      day: 6,
      time: "1200"
    }
  }
];

const test = {
  name: DEBUG_NAME,
  links: DEBUG_LINKS,
  type: DEBUG_TYPE,
  times: DEBUG_TIMES
};

const Home = ({ data }) => {
  return (
    <div className={styles.content}>
      <div className={styles.meta}>
        <span>
          {data.length} {data.length === 1 ? "result" : "results"}
        </span>
      </div>
      <div className={styles.pool}>
        {data.map(d => {
          return (
            <div key={d.slug} className={styles.card}>
              <LocationCard
                className={styles.cardInner}
                name={d.name}
                times={d?.location?.opening_hours.periods}
                type={d.category}
                links={d.links}
                image={d.image.childImageSharp.fluid.src}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
