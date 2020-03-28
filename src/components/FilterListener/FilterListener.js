import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setResults } from "../../store/actions/info";

const FilterListener = () => {
  const dispatch = useDispatch();
  const { activeFilters, activeDietary } = useSelector(state => state.filters);
  const { boundingBox } = useSelector(state => state.info);

  const queryData = useCallback(currentBoundingBox => {
    const str = Object.keys(currentBoundingBox)
      .map(k => {
        return [k, currentBoundingBox[k]].join("=");
      })
      .join("&");

    fetch(`/.netlify/functions/query?${str}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch(setResults(data));
      });
  }, []);

  useEffect(() => {
    if (boundingBox) {
      queryData(boundingBox);
    }
  }, [boundingBox]);

  return null;
};

export default FilterListener;
