import React, { useCallback, useEffect, useState, useMemo } from "react";

import { useDispatch } from "react-redux";
import LocationCard from "../LocationCard/LocationCard";
import useWindowSize from "./windowSize";
import { setCurrentLinks } from "../../store/actions/location";
import { useSwipeable } from "react-swipeable";

import styles from "./MobileMapList.module.scss";

const MobileMapList = ({ results, highlight, onHighlight }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const cardWidth = useMemo(() => {
    return windowSize.width - 48;
  }, [windowSize.width]);

  const onRequest = useCallback(
    (name, type, links) => {
      dispatch(setCurrentLinks(name, type, links));
    },
    [dispatch]
  );

  useEffect(() => {
    setIndex(0);
  }, [results.length]);

  useEffect(() => {
    const highlightIndex = results.findIndex((i) => i.id === highlight);

    if (highlightIndex >= 0 && index !== highlightIndex) {
      setIndex(highlightIndex);
    }
  }, [results, index, highlight]);

  const swipeLeft = useCallback(() => {
    if (index < results.length - 1) {
      onHighlight(results[index + 1].id, results[index + 1].coords);
    }
  }, [results, index, onHighlight]);

  const swipeRight = useCallback(() => {
    if (index > 0) {
      onHighlight(results[index - 1].id, results[index - 1].coords);
    }
  }, [results, index, onHighlight]);

  const handlers = useSwipeable({
    onSwipedLeft: swipeLeft,
    onSwipedRight: swipeRight,
  });

  return (
    <div className={styles.list} {...handlers}>
      <div
        className={styles.track}
        style={{ transform: `translate3d(-${index * cardWidth}px, 0, 0)` }}
      >
        {results.map((d) => {
          return (
            <div key={d.id} className={styles.card}>
              <LocationCard
                id={d.id}
                name={d.name}
                times={d?.opening_hours}
                type={d.category}
                links={d.links}
                image={d.imageObject}
                onRequest={onRequest}
                slim
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMapList;
