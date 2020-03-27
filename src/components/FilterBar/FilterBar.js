import React, { useCallback, useState } from "react";

import { MapPin, ChevronDown } from "react-feather";
import Collapsible from "react-collapsible";

import styles from "./FilterBar.module.scss";
import { FilterItem } from "./FilterItem";

const FilterBar = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = useCallback(
    force => {
      setFilterOpen(typeof force === "boolean" ? force : !filterOpen);
    },
    [filterOpen]
  );

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <button className={styles.location}>
          <MapPin />
          <span>Islington</span>
        </button>
        <button className={styles.filterToggle} onClick={toggleFilter}>
          <span>Filter</span> <ChevronDown />
        </button>
      </nav>
      <Collapsible
        contentInnerClassName={styles.filterPool}
        transitionTime={250}
        easing="ease-in-out"
        open={filterOpen}
      >
        <div className={styles.tags}>
          <span className={styles.filterTitle}>Categories</span>

          <ul>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Bar" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
          </ul>
        </div>
        <div className={styles.tags}>
          <span className={styles.filterTitle}>Dietary</span>

          <ul>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem selected label="Bar" />
            </li>
            <li>
              <FilterItem selected label="Restaurant" />
            </li>
            <li>
              <FilterItem label="Restaurant" />
            </li>
          </ul>
        </div>
      </Collapsible>
    </div>
  );
};

export default FilterBar;
