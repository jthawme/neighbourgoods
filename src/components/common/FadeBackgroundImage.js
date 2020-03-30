import React, { useEffect, useState, useRef } from "react";

import classNames from "classnames";
import styles from "./FadeBackgroundImage.module.scss";

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
};

const isDataSaver = () => {
  if ("connection" in navigator) {
    return navigator.connection.saveData;
  } else {
    return false;
  }
};

const FadeBackgroundImage = ({
  className,
  image,
  largeImage,
  backgroundColor = "var(--color-text-light)"
}) => {
  const refTrack = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [internalImage, setInternalImage] = useState(false);
  const [dataSaving] = useState(isDataSaver());

  useEffect(() => {
    const currentRef = refTrack.current;
    setLoaded(false);

    loadImage(image).then(() => {
      if (refTrack.current !== currentRef) {
        return;
      }

      setInternalImage(image);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLoaded(true);
        });
      });

      if (!dataSaving && largeImage) {
        loadImage(largeImage).then(() => {
          if (refTrack.current !== currentRef) {
            return;
          }

          setInternalImage(largeImage);
        });
      }
    });

    return () => {
      refTrack.current += 1;
    };
  }, [image, largeImage, dataSaving]);

  const cls = classNames(styles.wrapper, className, {
    [styles.loaded]: loaded
  });

  return (
    <div className={cls} style={{ backgroundColor }}>
      <div
        style={{
          backgroundImage: internalImage ? `url(${internalImage})` : "none"
        }}
      />
    </div>
  );
};

export default FadeBackgroundImage;
