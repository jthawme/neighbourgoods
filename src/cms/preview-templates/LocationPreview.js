import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../../components/LocationCard/index";

const LocationPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const image = getAsset(data.image);

  console.log(data, image);

  if (data) {
    return (
      <LocationCard
        name={data.name || "NO NAME"}
        links={(data.links || []).map(item => ({
          ...item,
          label: item.label || "NO LABEL"
        }))}
        image={!!data.image && image.url}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

LocationPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default LocationPreview;
