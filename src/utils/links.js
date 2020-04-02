import { LINK_CATEGORIES } from "../cms/constants";

export const getSupportLinks = links => {
  return links.filter(link => link.category === LINK_CATEGORIES.SUPPORT);
};

export const getOrderLinks = links => {
  return links.filter(link => link.category === LINK_CATEGORIES.ORDER);
};

export const getCollectionLinks = links => {
  return links.filter(link => link.category === LINK_CATEGORIES.COLLECTION);
};
