export const SET_CURRENT_LINKS = "SET_CURRENT_LINKS";
export const REMOVE_CURRENT_LINKS = "REMOVE_CURRENT_LINKS";

export const setCurrentLinks = (name, category, links) => {
  return {
    type: SET_CURRENT_LINKS,
    name,
    category,
    links
  };
};
export const removeCurrentLinks = () => {
  return {
    type: REMOVE_CURRENT_LINKS
  };
};
