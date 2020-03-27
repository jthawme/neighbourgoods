import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

import styles from "./Map.module.scss";
import { useSelector } from "react-redux";

const KEY = "AIzaSyBW3v7DCm0curYCYRNHsLK23HYRayTLKYk";

const DEFAULT_COORDS = {
  lat: 51.500152,
  lng: -0.126236
};

const Map = ({ children, coords }) => {
  return (
    <LoadScript id="script-loader" googleMapsApiKey={KEY}>
      <GoogleMap
        id="example-map"
        mapContainerClassName={styles.container}
        zoom={14}
        center={coords || DEFAULT_COORDS}
        options={{
          disableDefaultUI: true
        }}
      >
        {children || null}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
