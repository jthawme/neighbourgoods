import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationCard from "../LocationCard/LocationCard";
import FilterListener from "../FilterListener/FilterListener";

import styles from "./Home.module.scss";
import { setOrganicLocation, THREE_MILES } from "../../store/actions/info";
import { getBoundingBox } from "../../utils/location";
import { setHighlightLocation } from "../../store/actions/location";

const Home = () => {
  const highlight = useSelector(state => state.location.highlight);
  const { results } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const onClickLocation = useCallback(
    (coords, id) => {
      dispatch(
        setOrganicLocation(
          coords,
          getBoundingBox(coords.lat, coords.lng, THREE_MILES)
        )
      );

      dispatch(setHighlightLocation(id));
    },
    [dispatch]
  );

  return (
    <>
      <FilterListener />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
        </div>
        <div className={styles.pool}>
          {results.map(d => {
            return (
              <div key={d.slug} className={styles.card}>
                <LocationCard
                  className={styles.cardInner}
                  name={d.name}
                  times={d?.opening_hours}
                  type={d.category}
                  links={d.links}
                  image={d.image}
                  highlight={highlight === d.id}
                  onClick={() => onClickLocation(d.coords, d.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
