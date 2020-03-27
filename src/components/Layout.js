import React, { useCallback, useState } from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { useDispatch, useSelector } from "react-redux";

import FilterBar from "./FilterBar/FilterBar";
import Header from "./Header/Header";
import FloatingButton from "./common/FloatingButton";
import Modal from "./common/Modal";
import PostcodeLookup from "./PostcodeLookup/PostcodeLookup";
import AboutContent from "./AboutContent/AboutContent";

import "normalize.css";
import "../styles/global.scss";
import { setPostCodeInfo } from "../store/actions/info";
import Map from "./Map/Map";

const TemplateWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.info);
  const { title, description } = useSiteMetadata();
  const [isOpen, setIsOpen] = useState(true);
  const [aboutIsOpen, setAboutIsOpen] = useState(false);

  const onPostCodeData = useCallback(data => {
    dispatch(
      setPostCodeInfo(data.postcode, data.admin_district, {
        lat: data.latitude,
        lng: data.longitude
      })
    );
    setIsOpen(false);
  }, []);

  const onOpenPostCode = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
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
        <Map coords={info.coords} />
        <FloatingButton className="button" text="Add a spot" />
      </div>

      <Modal
        isOpen={aboutIsOpen}
        type="left"
        onClose={() => setAboutIsOpen(false)}
      >
        <AboutContent onClose={() => setAboutIsOpen(false)} />
      </Modal>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PostcodeLookup onPostcode={onPostCodeData} />
      </Modal>
    </main>
  );
};

export default TemplateWrapper;
