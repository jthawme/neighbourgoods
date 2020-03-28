import React, { useCallback, useState, useMemo } from "react";

import { MapPin, ChevronDown } from "react-feather";
import Collapsible from "react-collapsible";

import styles from "./FilterBar.module.scss";
import { CATEGORIES, DIETARY } from "../../cms/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter, toggleDietary } from "../../store/actions/filters";
import Checkbox from "../common/inputs/Checkbox";

const FilterBar = ({ onRequestLocationChange, locationName }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { activeFilters, activeDietary } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const filterLength = useMemo(() => {
    return activeFilters.length + activeDietary.length;
  }, [activeFilters.length, activeDietary.length]);

  const toggleFilterTray = useCallback(
    force => {
      setFilterOpen(typeof force === "boolean" ? force : !filterOpen);
    },
    [filterOpen]
  );

  const toggleFilterItem = useCallback(
    (value, dietary) => {
      if (dietary) {
        dispatch(toggleDietary(value));
      } else {
        dispatch(toggleFilter(value));
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <button className={styles.location} onClick={onRequestLocationChange}>
          <MapPin />
          <span>{locationName || "Search by postcode"}</span>
        </button>
        <button
          className={`${styles.filterToggle} ${filterOpen &&
            styles.filterToggleOpen}`}
          onClick={toggleFilterTray}
        >
          <span className={styles.filterBtn}>
            {filterLength > 0 && <span className={styles.filterActive} />}{" "}
            Filter
          </span>{" "}
          <ChevronDown />
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
            {CATEGORIES.map(category => {
              return (
                <li key={category.value}>
                  <Checkbox
                    checked={activeFilters.includes(category.value)}
                    outerTag="label"
                    label={`${category.label} (0)`}
                    onChange={() => toggleFilterItem(category.value)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.tags}>
          <span className={styles.filterTitle}>Dietary</span>

          <ul>
            {DIETARY.map(category => {
              return (
                <li key={category.value}>
                  <Checkbox
                    checked={activeDietary.includes(category.value)}
                    outerTag="label"
                    label={`${category.label} (0)`}
                    onChange={() => toggleFilterItem(category.value, true)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Collapsible>
    </div>
  );
};

export default FilterBar;
