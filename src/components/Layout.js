import React, { useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { useMediaQuery } from "react-responsive";

import FilterBar from "./FilterBar/FilterBar";
import Header from "./Header/Header";
import FloatingButton from "./common/FloatingButton";
import Modal from "./common/Modal";
import FakeModal from "./common/FakeModal";
import PostcodeLookup from "./PostcodeLookup/PostcodeLookup";
import AboutContent from "./AboutContent/AboutContent";
import AddForm from "./AddForm/AddForm";
import Map from "./Map/Map";
import LinksPickup from "./LinksPickup/LinksPickup";
import Toast from "./common/Toast";
import MyMarker from "./Marker/Marker";
import Spinner from "./common/Spinner";
import MobileMapList from "./MobileMapList/MobileMapList";

import List from "../svg/list.svg";
import MapIcon from "../svg/map.svg";

import {
  setPostCodeInfo,
  setOrganicLocation,
  RADIUS,
  setCoords,
  setMapView
} from "../store/actions/info";
import { setHighlightLocation } from "../store/actions/location";
import { setFilteredResults } from "../store/actions/filters";
import { getBoundingBox } from "../utils/location";
import { filterResults } from "../utils/filter";

import "normalize.css";
import "../styles/global.scss";

const TemplateWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.info);
  const { highlight } = useSelector(state => state.location);
  const { title, description } = useSiteMetadata();
  const [isOpen, setIsOpen] = useState(true);
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const { activeFilters, activeDietary, results } = useSelector(
    state => state.filters
  );

  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  });

  const onPostCodeData = useCallback(
    data => {
      const currentCoords = {
        lat: data.latitude,
        lng: data.longitude
      };

      dispatch(
        setPostCodeInfo(
          data.postcode,
          data.admin_district,
          currentCoords,
          getBoundingBox(data.latitude, data.longitude, RADIUS)
        )
      );
      setIsOpen(false);
    },
    [dispatch]
  );

  const onSearch = useCallback(
    currentCoords => {
      dispatch(
        setOrganicLocation(
          currentCoords,
          getBoundingBox(currentCoords.lat, currentCoords.lng, RADIUS)
        )
      );
    },
    [dispatch]
  );

  const setMarker = useCallback(
    (id, coords) => {
      dispatch(setHighlightLocation(id));

      if (!isTablet && info.mapView) {
        dispatch(
          setCoords({
            lat: coords.lat - 0.002,
            lng: coords.lng
          })
        );
      } else {
        dispatch(setCoords(coords));
      }
    },
    [dispatch, isTablet, info.mapView]
  );

  const onOpenPostCode = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggleMap = useCallback(() => {
    dispatch(setMapView(!info.mapView));
  }, [info.mapView]);

  useEffect(() => {
    dispatch(
      setFilteredResults(
        filterResults(info.results, activeFilters, activeDietary)
      )
    );
  }, [activeFilters, activeDietary, info.results, dispatch]);

  useEffect(() => {
    dispatch(setHighlightLocation(false));
  }, [activeFilters, activeDietary, dispatch]);

  return (
    <ToastProvider components={{ Toast }}>
      <main className={`${info.mapView && "mapOpen"}`}>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`https://neighbourgoods.london/meta/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`https://neighbourgoods.london/meta/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`https://neighbourgoods.london/meta/favicon-16x16.png`}
            sizes="16x16"
          />
          <meta name="theme-color" content="#123b42" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content="/" />
          <meta
            property="og:image"
            content={`https://neighbourgoods.london/og-image.png`}
          />
          <meta
            property="twitter:image"
            content={`https://neighbourgoods.london/og-image.png`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:site" content="/" />
          <meta
            name="twitter:image"
            content={`https://neighbourgoods.london/og-image.png`}
          />
        </Helmet>
        <div className="left">
          <Header onOpenAbout={() => setAboutIsOpen(true)} />
          <FilterBar
            onRequestLocationChange={onOpenPostCode}
            locationName={info.borough}
          />
        </div>
        <div className="content">{children}</div>
        <div className="right">
          <Map
            coords={info.centerCoords}
            searchCoords={info.coords}
            boundingBox={info.boundingBox}
            onMoveSearch={onSearch}
          >
            {results.map(r => {
              return (
                <MyMarker
                  key={r.id}
                  position={r.coords}
                  onClick={() => setMarker(r.id, r.coords)}
                />
              );
            })}
          </Map>

          {!isTablet && info.mapView && (
            <MobileMapList
              onHighlight={setMarker}
              results={results}
              highlight={highlight}
            />
          )}
        </div>

        {info.loading && (
          <div className="loading-global">
            <Spinner />
          </div>
        )}

        {(!isTablet && !info.mapView) || isTablet ? (
          <FloatingButton
            className="floating"
            text="Submit a place"
            onClick={() => setAddIsOpen(true)}
          />
        ) : null}

        {!isTablet && (
          <button className="map-toggle" onClick={onToggleMap}>
            {info.mapView ? <List /> : <MapIcon />}
          </button>
        )}

        <FakeModal
          isOpen={aboutIsOpen}
          type="left"
          onClose={() => setAboutIsOpen(false)}
        >
          <AboutContent
            open={aboutIsOpen}
            onClose={() => setAboutIsOpen(false)}
          />
        </FakeModal>

        <FakeModal
          isOpen={addIsOpen}
          type="right"
          onClose={() => setAddIsOpen(false)}
          aboveAll={!isTablet}
        >
          <AddForm onClose={() => setAddIsOpen(false)} />
        </FakeModal>

        <Modal
          isOpen={isOpen}
          onClose={!!info.borough ? () => setIsOpen(false) : undefined}
        >
          <PostcodeLookup
            onPostcode={onPostCodeData}
            onClose={
              !!info.borough || !!info.coords
                ? () => setIsOpen(false)
                : undefined
            }
          />
        </Modal>

        <LinksPickup />
      </main>
    </ToastProvider>
  );
};

export default TemplateWrapper;
