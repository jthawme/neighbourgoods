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
  ALCOHOL: "alcohol",
  CAFE: "cafe",
  BAKERY: "bakery",
  GROCERS: "grocers",
  BUTCHERS: "butchers",
  FISHMONGERS: "fishmongers",
  DESSERT: "dessert"
};

export const CATEGORIES = [
  {
    label: "Restaurant",
    value: CATEGORY_TYPES.RESAURANT
  },
  {
    label: "Drinks / Alcohol",
    value: CATEGORY_TYPES.ALCOHOL
  },
  {
    label: "Café",
    value: CATEGORY_TYPES.CAFE
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
  },
  {
    label: "Dessert",
    value: CATEGORY_TYPES.DESSERT
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
