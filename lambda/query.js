const axios = require("axios");

const siteUrl = process.env.SITE_URL;

exports.handler = async event => {
  const { north, south, east, west } = event.queryStringParameters;
  try {
    const data = await axios.get(`${siteUrl}/data.json`);

    return {
      statusCode: 200,
      body: JSON.stringify(
        data.data.filter(item => {
          return (
            item.coords.lat < parseFloat(north) &&
            item.coords.lat > parseFloat(south) &&
            item.coords.lng > parseFloat(west) &&
            item.coords.lng < parseFloat(east)
          );
        })
      )
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e
    };
  }
};
