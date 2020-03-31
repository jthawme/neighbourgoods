import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationCard from "../LocationCard/LocationCard";
import FilterListener from "../FilterListener/FilterListener";
import scrollIntoView from "scroll-into-view-if-needed";
import Emoji from "a11y-react-emoji";
import { useMediaQuery } from "react-responsive";

import styles from "./Home.module.scss";
import { setCoords, setMapView } from "../../store/actions/info";
import {
  setHighlightLocation,
  setCurrentLinks
} from "../../store/actions/location";

const Home = () => {
  const highlight = useSelector(state => state.location.highlight);
  const { results } = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  });

  const onClickLocation = useCallback(
    (coords, id) => {
      dispatch(setCoords(coords));

      dispatch(setHighlightLocation(id));
    },
    [dispatch]
  );

  const onRequest = useCallback(
    (name, type, links) => {
      dispatch(setCurrentLinks(name, type, links));
    },
    [dispatch]
  );

  const toggleMap = useCallback(() => {
    dispatch(setMapView(true));
  }, [dispatch]);

  useEffect(() => {
    if (highlight) {
      const el = document.getElementById(highlight);
      scrollIntoView(el, {
        behavior: "smooth",
        block: "center"
      });
    }
  }, [highlight]);

  return (
    <>
      <FilterListener />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
        </div>
        <div
          className={`${styles.pool} ${results.length === 0 &&
            styles.poolEmpty}`}
        >
          {results.map(d => {
            return (
              <div key={d.id} className={styles.card}>
                <LocationCard
                  id={d.id}
                  className={styles.cardInner}
                  name={d.name}
                  times={d?.opening_hours}
                  type={d.category}
                  links={d.links}
                  image={d.imageObject}
                  highlight={highlight === d.id}
                  onClick={() => onClickLocation(d.coords, d.id)}
                  doGooder={d.doGooder}
                  onRequest={onRequest}
                />
              </div>
            );
          })}

          {results.length === 0 && (
            <p>
              Please help support small businesses by adding them to the
              community built map. <Emoji symbol="🙏" />
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
