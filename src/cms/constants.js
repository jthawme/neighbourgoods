export const LINK_TYPES = {
  EXTERNAL: "external",
  DELIVEROO: "deliveroo",
  UBER_EATS: "uber_eats",
  DONATION: "donation",
  VOUCHER: "voucher"
};

export const LINK_ICONS = {
  [LINK_TYPES.EXTERNAL]: "🏡",
  [LINK_TYPES.DELIVEROO]: "🏡",
  [LINK_TYPES.UBER_EATS]: "🏡",
  [LINK_TYPES.DONATION]: "❤️",
  [LINK_TYPES.VOUCHER]: "🎉"
};

export const LINK_OPTIONS = [
  {
    label: "External / Other",
    value: LINK_TYPES.EXTERNAL
  },
  {
    label: "Deliveroo",
    value: LINK_TYPES.DELIVEROO
  },
  {
    label: "Uber Eats",
    value: LINK_TYPES.UBER_EATS
  },
  {
    label: "Donation",
    value: LINK_TYPES.DONATION
  },
  {
    label: "Voucher",
    value: LINK_TYPES.VOUCHER
  }
];

export const CATEGORY_TYPES = {
  RESAURANT: "restaurant",
  BAR: "bar",
  CAFE: "cafe",
  PUB: "pub",
  BEER_SHOP: "beer_shop",
  WINE_SHOP: "wine_shop",
  BAKERY: "bakery",
  GROCERS: "grocers",
  BUTCHERS: "butchers",
  FISHMONGERS: "fishmongers"
};

export const CATEGORIES = [
  {
    label: "Restaurant",
    value: CATEGORY_TYPES.RESAURANT
  },
  {
    label: "Bar",
    value: CATEGORY_TYPES.BAR
  },
  {
    label: "Café",
    value: CATEGORY_TYPES.CAFE
  },
  {
    label: "Pub",
    value: CATEGORY_TYPES.PUB
  },
  {
    label: "Beer Shop",
    value: CATEGORY_TYPES.BEER_SHOP
  },
  {
    label: "Wine Shop",
    value: CATEGORY_TYPES.WINE_SHOP
  },
  {
    label: "Bakery",
    value: CATEGORY_TYPES.BAKERY
  },
  {
    label: "Grocers",
    value: CATEGORY_TYPES.GROCERS
  },
  {
    label: "Butchers",
    value: CATEGORY_TYPES.BUTCHERS
  },
  {
    label: "Fishmongers",
    value: CATEGORY_TYPES.FISHMONGERS
  }
];
