import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setResults, setLoading } from "../../store/actions/info";

const FilterListener = () => {
  const dispatch = useDispatch();
  const { boundingBox } = useSelector(state => state.info);

  const queryData = useCallback(
    currentBoundingBox => {
      const str = Object.keys(currentBoundingBox)
        .map(k => {
          return [k, currentBoundingBox[k]].join("=");
        })
        .join("&");

      dispatch(setLoading(true));

      fetch(`/.netlify/functions/query?${str}`)
        .then(resp => resp.json())
        .then(data => {
          dispatch(setResults(data));

          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (boundingBox) {
      queryData(boundingBox);
    }
  }, [boundingBox, queryData]);

  return null;
};

export default FilterListener;
