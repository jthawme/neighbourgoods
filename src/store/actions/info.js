export const SET_POSTCODE_INFO = "SET_POSTCODE_INFO";

export const setPostCodeInfo = (postCode, borough, coords) => {
  return {
    type: SET_POSTCODE_INFO,
    postCode,
    borough,
    coords
  };
};
