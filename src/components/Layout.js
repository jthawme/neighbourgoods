import React, { useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

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

import {
  setPostCodeInfo,
  setOrganicLocation,
  THREE_MILES
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
  const { title, description } = useSiteMetadata();
  const [isOpen, setIsOpen] = useState(true);
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const { activeFilters, activeDietary, results } = useSelector(
    state => state.filters
  );

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
          getBoundingBox(data.latitude, data.longitude, THREE_MILES)
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
          getBoundingBox(currentCoords.lat, currentCoords.lng, THREE_MILES)
        )
      );
    },
    [dispatch]
  );

  const setMarker = useCallback(
    id => {
      dispatch(setHighlightLocation(id));
    },
    [dispatch]
  );

  const onOpenPostCode = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    dispatch(
      setFilteredResults(
        filterResults(info.results, activeFilters, activeDietary)
      )
    );
  }, [activeFilters, activeDietary, info.results, dispatch]);

  return (
    <ToastProvider components={{ Toast }}>
      <main>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix("/")}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-16x16.png`}
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta
            property="og:image"
            content={`${withPrefix("/")}img/og-image.jpg`}
          />
        </Helmet>
        <div className="left">
          <Header onOpenAbout={() => setAboutIsOpen(true)} />
          <FilterBar
            onRequestLocationChange={onOpenPostCode}
            locationName={info.borough}
          />
          <div className="content">{children}</div>
        </div>
        <div className="right">
          <Map
            coords={info.coords}
            boundingBox={info.boundingBox}
            onMoveSearch={onSearch}
          >
            {results.map(r => {
              return (
                <MyMarker
                  key={r.id}
                  position={r.coords}
                  onClick={() => setMarker(r.id)}
                />
              );
            })}
          </Map>
          <FloatingButton
            className="button"
            text="Add a spot"
            onClick={() => setAddIsOpen(true)}
          />
        </div>

        <FakeModal
          isOpen={aboutIsOpen}
          type="left"
          onClose={() => setAboutIsOpen(false)}
        >
          <AboutContent onClose={() => setAboutIsOpen(false)} />
        </FakeModal>

        <FakeModal
          isOpen={addIsOpen}
          type="right"
          onClose={() => setAddIsOpen(false)}
        >
          <AddForm onClose={() => setAddIsOpen(false)} />
        </FakeModal>

        <Modal
          isOpen={isOpen}
          onClose={!!info.borough ? () => setIsOpen(false) : undefined}
        >
          <PostcodeLookup
            onPostcode={onPostCodeData}
            onClose={!!info.borough ? () => setIsOpen(false) : undefined}
          />
        </Modal>

        <LinksPickup />
      </main>
    </ToastProvider>
  );
};

export default TemplateWrapper;
