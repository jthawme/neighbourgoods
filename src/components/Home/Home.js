import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationCard from "../LocationCard/LocationCard";
import FilterListener from "../FilterListener/FilterListener";
import scrollIntoView from "scroll-into-view-if-needed";

import styles from "./Home.module.scss";
import { setCoords } from "../../store/actions/info";
import {
  setHighlightLocation,
  setCurrentLinks
} from "../../store/actions/location";
import Emoji from "a11y-react-emoji";

const Home = () => {
  const highlight = useSelector(state => state.location.highlight);
  const { results } = useSelector(state => state.filters);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (highlight) {
      const el = document.getElementById(highlight);
      scrollIntoView(el, {
        behavior: "smooth",
        block: "center"
      });
      // const rect = el.getBoundingClientRect();

      // console.log(rect);
      // const htmlEl = document.querySelector("html");

      // htmlEl.scrollTop = htmlEl.scrollTop + rect.top - 50;
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
