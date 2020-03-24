import React from "react";
import PropTypes from "prop-types";

import "./LocationCard.scss";

const LocationCard = ({ name, links, image }) => {
  return (
    <div className="location-card">
      <div
        class="location-card__image"
        style={image ? { backgroundImage: `url(${image})` } : {}}
      />
      <p>{name}</p>
      {links && (
        <ul>
          {links.map(item => (
            <li key={item.link}>
              <a target="_blank" rel="noreferrer noopener" href={item.link}>
                {item.type} – {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

LocationCard.propTypes = {
  name: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string
    })
  )
};

export default LocationCard;
