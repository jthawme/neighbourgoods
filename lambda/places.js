const axios = require("axios");

const endpoint = "https://maps.googleapis.com/maps/api/place/details/json";

const FIELDS = [
  "address_components",
  "geometry",
  "formatted_phone_number",
  "opening_hours",
  "types",
  "place_id"
];

module.exports.handler = async function(event, context) {
  try {
    const { data } = await axios.get(endpoint, {
      params: {
        key: process.env.PLACES_API_KEY,
        place_id: event.queryStringParameters.placeId,
        fields: FIELDS.join(",")
      }
    });

    if (data.error_message) {
      throw new Error(data.error_message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.result)
    };
  } catch (e) {
    return {
      statusCode: 400,
      error: e
    };
  }
};

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
