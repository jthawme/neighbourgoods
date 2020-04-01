import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Circle } from "@react-google-maps/api";

import styles from "./Map.module.scss";
import { Search } from "react-feather";
import { RADIUS } from "../../store/actions/info";
import {
  DEFAULT_COORDS,
  MIN_ZOOM,
  MAX_ZOOM,
  LONDON_COORDS
} from "../../cms/constants";

const GOOGLE_MAPS_KEY = "AIzaSyBW3v7DCm0curYCYRNHsLK23HYRayTLKYk";

const Map = ({ children, coords, searchCoords, boundingBox, onMoveSearch }) => {
  const mapRef = useRef(null);
  const debounceRef = useRef(0);
  const [currentCenter, setCurrentCenter] = useState(false);

  const onCenterChanged = useCallback(() => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const center = mapRef.current.getCenter();

      const newCoords = {
        lat: center.lat(),
        lng: center.lng()
      };

      if (newCoords.lat !== coords.lat && newCoords.lng !== coords.lng) {
        setCurrentCenter(newCoords);
      }
    }, 500);
  }, [coords]);

  const searchArea = useCallback(() => {
    onMoveSearch(currentCenter);
    setCurrentCenter(false);
  }, [currentCenter, onMoveSearch]);

  return (
    <>
      <button
        className={`${styles.search} ${currentCenter && styles.show}`}
        type="button"
        onClick={searchArea}
      >
        <Search /> Search this area
      </button>
      <LoadScript id="script-loader" googleMapsApiKey={GOOGLE_MAPS_KEY}>
        <GoogleMap
          onLoad={map => (mapRef.current = map)}
          id="example-map"
          mapContainerClassName={styles.container}
          zoom={14}
          center={coords || DEFAULT_COORDS}
          onDragEnd={onCenterChanged}
          options={{
            disableDefaultUI: true,
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM,
            restriction: {
              latLngBounds: LONDON_COORDS,
              strictBounds: false
            }
          }}
        >
          {children || null}

          <Circle
            center={searchCoords || DEFAULT_COORDS}
            radius={RADIUS * 1.4}
            options={{
              fillColor: "transparent",
              strokeColor: "rgba(85, 40, 245, 0.1)",
              strokeWidth: 0.1
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
