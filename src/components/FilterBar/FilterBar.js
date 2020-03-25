import React from "react";

import { MapPin, ChevronDown } from "react-feather";

import styles from "./FilterBar.module.scss";

const FilterBar = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <button className={styles.location}>
          <MapPin />
          <span>Islington</span>
        </button>
        <button className={styles.filterToggle}>
          <span>Filter</span> <ChevronDown />
        </button>
      </nav>
    </div>
  );
};

export default FilterBar;
