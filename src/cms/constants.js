export const LINK_TYPES = {
  EXTERNAL: "external",
  DELIVEROO: "deliveroo",
  UBER_EATS: "uber_eats",
  JUST_EAT: "just_eat",
  DONATION: "donation",
  VOUCHER: "voucher",
  EMAIL: "email",
  PHONE: "phone"
};

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

export const DIETARY_TYPES = {
  VEGETARIAN: "vegetarian",
  VEGAN: "vegan",
  HALAL: "halal",
  GLUTEN_FREE: "gluten_free",
  HEALTHY: "healthy"
};

export const DIETARY = [
  {
    label: "Vegetarian",
    value: DIETARY_TYPES.VEGETARIAN
  },
  {
    label: "Vegan",
    value: DIETARY_TYPES.VEGAN
  },
  {
    label: "Halal",
    value: DIETARY_TYPES.HALAL
  },
  {
    label: "Gluten Free",
    value: DIETARY_TYPES.GLUTEN_FREE
  },
  {
    label: "Healthy",
    value: DIETARY_TYPES.HEALTHY
  }
];

export const LINK_CATEGORIES = {
  SUPPORT: "support",
  ORDER: "order"
};

export const LINK_CATEGORY_ICONS = {
  [LINK_CATEGORIES.ORDER]: "🏡",
  [LINK_CATEGORIES.SUPPORT]: "❤️"
};
